// Основное приложение KeyMaster
class KeyMasterApp {
    constructor() {
        this.currentMode = 'menu';
        this.currentCategory = null;
        this.currentLevel = null; // easy, medium, hard
        this.currentShortcuts = [];
        this.currentQuestionIndex = 0;
        this.pressedKeys = new Set();
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = 0;
        this.startTime = null;
        this.questionStartTime = null;
        this.questionTimes = [];
        this.currentStreak = 0;
        this.bestStreak = 0;
        this.isWaitingForRelease = false;
        this.keyPressTimeout = null;
        this.nextQuestionTimeout = null;
        this.questionTimerInterval = null;

        // Визуальная клавиатура
        this.visualKeyboard = null;

        // Звуковые эффекты
        this.sounds = new SoundEffects();

        // Настройки приложения
        this.settings = this.loadSettings();

        // Статистика (сохраняется в localStorage)
        this.stats = this.loadStats();

        // Избранные команды
        this.favorites = this.loadFavorites();

        // История тренировок
        this.history = this.loadHistory();

        // Прогресс по категориям
        this.categoryProgress = this.loadCategoryProgress();

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTheme();
        this.showMainMenu();
    }

    setupEventListeners() {
        // Главное меню
        document.querySelectorAll('.menu-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.handleMenuSelection(mode);
            });
        });

        // Кнопки навигации
        document.getElementById('backToMenu')?.addEventListener('click', () => this.showMainMenu());
        document.getElementById('backToCategories')?.addEventListener('click', () => this.showLevelSelection());
        document.getElementById('backToCategories2')?.addEventListener('click', () => this.showCategorySelection());
        document.getElementById('backFromReference')?.addEventListener('click', () => this.showMainMenu());
        document.getElementById('backFromStats')?.addEventListener('click', () => this.showMainMenu());

        // Кнопки выбора уровня
        document.querySelectorAll('.level-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const level = e.currentTarget.dataset.level;
                this.selectLevel(level);
            });
        });

        // Кнопки тренировки
        document.getElementById('skipButton')?.addEventListener('click', () => this.skipQuestion());
        document.getElementById('hintButton')?.addEventListener('click', () => this.showHint());
        document.getElementById('checkButton')?.addEventListener('click', () => this.checkAnswerManually());
        document.getElementById('clearButton')?.addEventListener('click', () => this.clearSelection());
        document.getElementById('favoriteButton')?.addEventListener('click', () => this.toggleFavorite());

        // Настройки
        document.getElementById('settingsButton')?.addEventListener('click', () => this.showSettings());
        document.getElementById('closeSettings')?.addEventListener('click', () => this.closeSettings());

        // Обработчики настроек
        document.querySelectorAll('input[name="questionCount"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.settings.questionCount = e.target.value;
                this.saveSettings();
            });
        });

        document.querySelectorAll('input[name="autoAdvanceTime"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.settings.autoAdvanceTime = parseFloat(e.target.value);
                this.saveSettings();
            });
        });

        document.getElementById('autoAdvanceToggle')?.addEventListener('change', (e) => {
            this.settings.autoAdvance = e.target.checked;
            this.saveSettings();
        });

        document.getElementById('soundToggle')?.addEventListener('change', (e) => {
            this.settings.soundEnabled = e.target.checked;
            this.sounds.setEnabled(e.target.checked);
            this.saveSettings();
        });

        // Переключатель темы
        document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());

        // Поиск в справочнике
        document.getElementById('searchInput')?.addEventListener('input', (e) => this.filterShortcuts(e.target.value));
        document.getElementById('categoryFilter')?.addEventListener('change', (e) => this.filterByCategory(e.target.value));

        // Модальное окно результатов
        document.getElementById('backToMenuFromResults')?.addEventListener('click', () => {
            this.hideModal();
            this.showMainMenu();
        });
        document.getElementById('tryAgain')?.addEventListener('click', () => {
            this.hideModal();
            this.startTraining(this.currentCategory);
        });

        // Глобальные события клавиатуры
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleMenuSelection(mode) {
        switch (mode) {
            case 'learn':
            case 'practice':
                this.currentMode = mode;
                this.showCategorySelection();
                break;
            case 'exam':
                console.log('📋 Выбран режим Экзамен из меню');
                this.currentMode = 'exam';
                console.log('✅ currentMode установлен в:', this.currentMode);
                this.showLevelSelection();
                break;
            case 'favorites':
                this.startFavorites();
                break;
            case 'reference':
                this.showReference();
                break;
            case 'stats':
                this.showStats();
                break;
        }
    }

    showMainMenu() {
        this.hideAllScreens();
        document.getElementById('mainMenu').classList.remove('hidden');
        this.currentMode = 'menu';
    }

    showCategorySelection() {
        this.hideAllScreens();
        document.getElementById('categorySelection').classList.remove('hidden');
        this.renderCategories();
    }

    showLevelSelection() {
        this.hideAllScreens();
        document.getElementById('levelSelection').classList.remove('hidden');
    }

    selectLevel(level) {
        this.currentLevel = level;

        // Начать тренировку/практику/экзамен в зависимости от режима
        if (this.currentMode === 'exam') {
            this.startExam(level);
        } else if (this.currentMode === 'practice') {
            this.startPractice(this.currentCategory, level);
        } else {
            this.startTraining(this.currentCategory, level);
        }
    }

    renderCategories() {
        const grid = document.getElementById('categoriesGrid');
        grid.innerHTML = '';

        const categories = getAllCategories();

        categories.forEach(category => {
            const card = document.createElement('button');
            card.className = 'category-card';
            card.innerHTML = `
                <div class="category-icon" style="background-color: ${category.color}20; color: ${category.color}">
                    ${category.icon}
                </div>
                <h3>${category.name}</h3>
                <p>${category.shortcuts.length} команд</p>
            `;
            card.addEventListener('click', () => {
                this.currentCategory = category.id;
                this.showLevelSelection();
            });
            grid.appendChild(card);
        });
    }

    startTraining(categoryId, level = 'medium') {
        this.currentCategory = categoryId;
        this.currentLevel = level;

        // Получить все команды для категории
        let shortcuts = getShortcutsForCategory(categoryId);

        // Фильтровать по уровню сложности
        if (level === 'easy') {
            shortcuts = shortcuts.filter(s => s.difficulty === 'easy');
        } else if (level === 'medium') {
            shortcuts = shortcuts.filter(s => s.difficulty === 'easy' || s.difficulty === 'medium');
        }
        // Для hard - все команды

        this.currentShortcuts = shortcuts;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = this.currentShortcuts.length;
        this.questionTimes = [];
        this.currentStreak = 0;
        this.startTime = Date.now();

        this.hideAllScreens();
        document.getElementById('trainingScreen').classList.remove('hidden');

        // Инициализация визуальной клавиатуры
        if (!this.visualKeyboard) {
            this.visualKeyboard = new VisualKeyboard('visualKeyboard');
            // Устанавливаем callback для кликов мышкой
            this.visualKeyboard.setClickCallback((clickedKeys) => {
                this.handleMouseKeyClick(clickedKeys);
            });
        }

        this.showQuestion();
    }

    startPractice(categoryId, level = 'medium') {
        this.currentCategory = categoryId;
        this.currentLevel = level;

        // Получить случайные команды для категории
        let shortcuts = getRandomShortcuts(10, categoryId);

        // Фильтровать по уровню сложности
        if (level === 'easy') {
            shortcuts = shortcuts.filter(s => s.difficulty === 'easy');
        } else if (level === 'medium') {
            shortcuts = shortcuts.filter(s => s.difficulty === 'easy' || s.difficulty === 'medium');
        }
        // Для hard - все команды

        // Если после фильтрации осталось мало команд, получить больше
        if (shortcuts.length < 10) {
            let allShortcuts = getShortcutsForCategory(categoryId);
            if (level === 'easy') {
                allShortcuts = allShortcuts.filter(s => s.difficulty === 'easy');
            } else if (level === 'medium') {
                allShortcuts = allShortcuts.filter(s => s.difficulty === 'easy' || s.difficulty === 'medium');
            }

            // Перемешать и взять 10
            shortcuts = allShortcuts.sort(() => Math.random() - 0.5).slice(0, 10);
        }

        this.currentShortcuts = shortcuts;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = this.currentShortcuts.length;
        this.questionTimes = [];
        this.currentStreak = 0;
        this.startTime = Date.now();

        this.hideAllScreens();
        document.getElementById('trainingScreen').classList.remove('hidden');

        if (!this.visualKeyboard) {
            this.visualKeyboard = new VisualKeyboard('visualKeyboard');
            this.visualKeyboard.setClickCallback((clickedKeys) => {
                this.handleMouseKeyClick(clickedKeys);
            });
        }

        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.currentShortcuts.length) {
            this.showResults();
            return;
        }

        // Очистить таймер автоперехода если он есть
        if (this.nextQuestionTimeout) {
            clearTimeout(this.nextQuestionTimeout);
            this.nextQuestionTimeout = null;
        }

        const shortcut = this.currentShortcuts[this.currentQuestionIndex];

        // Обновить UI
        document.getElementById('currentCategory').textContent = keyboardData.categories[this.currentCategory].name;
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('totalQuestions').textContent = this.totalQuestions;
        document.getElementById('commandDescription').textContent = shortcut.description;

        // Показать ожидаемые клавиши
        const expectedKeysContainer = document.getElementById('expectedKeys');

        // Отладка: вывести текущий режим
        console.log('📌 Текущий режим:', this.currentMode);

        // В режиме практики и экзамена скрываем ожидаемые клавиши (показываем только по подсказке)
        if (this.currentMode === 'practice' || this.currentMode === 'exam' || this.currentMode === 'favorites') {
            expectedKeysContainer.innerHTML = '<span class="key hint-placeholder">❓ Нажми "Подсказка"</span>';
            expectedKeysContainer.classList.add('hidden-keys');
            console.log('🔒 Клавиши скрыты (режим:', this.currentMode + ')');
        } else {
            // В режиме обучения показываем
            expectedKeysContainer.innerHTML = shortcut.keys.map(key =>
                `<span class="key">${key}</span>`
            ).join(' + ');
            expectedKeysContainer.classList.remove('hidden-keys');
            console.log('👁️ Клавиши показаны (режим:', this.currentMode + ')');
        }

        // Очистить нажатые клавиши и демонстрацию
        document.getElementById('pressedKeys').innerHTML = '';
        document.getElementById('feedback').innerHTML = '';
        document.getElementById('feedback').className = 'feedback';
        document.getElementById('commandDemo').classList.remove('show');

        // В режиме обучения подсвечиваем клавиши, в остальных режимах - нет
        if (this.visualKeyboard) {
            if (this.currentMode === 'practice' || this.currentMode === 'exam' || this.currentMode === 'favorites') {
                this.visualKeyboard.clearAllHighlights();
                console.log('⌨️ Подсветка клавиатуры выключена');
            } else {
                this.visualKeyboard.highlightExpectedKeys(shortcut.keys);
                console.log('⌨️ Клавиши подсвечены:', shortcut.keys);
            }
        }

        // Сбросить нажатые клавиши
        this.pressedKeys.clear();
        this.isWaitingForRelease = false;

        // Очистить клики мышкой
        if (this.visualKeyboard) {
            this.visualKeyboard.clearClicks();
        }

        // Запустить таймер вопроса
        this.questionStartTime = Date.now();
        this.startQuestionTimer();

        // Обновить статистику
        this.updateTrainingStats();
    }

    startQuestionTimer() {
        // Очистить предыдущий таймер если есть
        if (this.questionTimerInterval) {
            clearInterval(this.questionTimerInterval);
        }

        const timerElement = document.getElementById('timerValue');
        if (!timerElement) return;

        this.questionTimerInterval = setInterval(() => {
            const elapsed = (Date.now() - this.questionStartTime) / 1000;
            timerElement.textContent = elapsed.toFixed(1) + 's';

            // Цветовая индикация скорости
            timerElement.classList.remove('fast', 'slow');
            if (elapsed < 3) {
                timerElement.classList.add('fast');
            } else if (elapsed > 7) {
                timerElement.classList.add('slow');
            }
        }, 100);
    }

    stopQuestionTimer() {
        if (this.questionTimerInterval) {
            clearInterval(this.questionTimerInterval);
            this.questionTimerInterval = null;
        }
    }

    handleKeyDown(e) {
        // Игнорировать, если не в режиме тренировки
        if (this.currentMode === 'menu' || this.currentMode === 'reference' || this.currentMode === 'stats') {
            return;
        }

        // ВСЕГДА предотвращать действия по умолчанию в режиме тренировки
        e.preventDefault();
        e.stopPropagation();

        // Игнорировать, если ждём отпускания клавиш
        if (this.isWaitingForRelease) {
            return;
        }

        // Добавить клавишу в набор нажатых
        const key = this.normalizeKey(e);
        this.pressedKeys.add(key);

        // Подсветить клавишу
        if (this.visualKeyboard) {
            this.visualKeyboard.highlightKey(e.key, 'pressed');
        }

        // Обновить отображение нажатых клавиш
        this.updatePressedKeysDisplay();

        // Очистить предыдущий таймаут
        if (this.keyPressTimeout) {
            clearTimeout(this.keyPressTimeout);
        }

        // Установить новый таймаут для проверки
        this.keyPressTimeout = setTimeout(() => {
            this.checkAnswer();
        }, 300);
    }

    handleKeyUp(e) {
        if (this.currentMode === 'menu' || this.currentMode === 'reference' || this.currentMode === 'stats') {
            return;
        }

        // Предотвращать действия по умолчанию в режиме тренировки
        e.preventDefault();
        e.stopPropagation();

        const key = this.normalizeKey(e);

        // Убрать подсветку
        if (this.visualKeyboard) {
            this.visualKeyboard.onKeyUp(e);
        }

        // Если ждём отпускания, проверяем
        if (this.isWaitingForRelease) {
            this.pressedKeys.delete(key);

            // Если все клавиши отпущены, переход к следующему вопросу
            if (this.pressedKeys.size === 0) {
                this.isWaitingForRelease = false;
                setTimeout(() => {
                    this.nextQuestion();
                }, 500);
            }
        }
    }

    normalizeKey(event) {
        const key = event.key;
        const code = event.code;

        // Сначала проверяем, является ли это сама клавиша модификатор
        if (key === 'Control' || code.includes('Control')) return 'Ctrl';
        if (key === 'Alt' || code.includes('Alt')) return 'Alt';
        if (key === 'Shift' || code.includes('Shift')) return 'Shift';
        if (key === 'Meta' || code.includes('Meta') || key === 'OS') return 'Win';

        // Специальные клавиши
        const specialKeys = {
            'ArrowUp': '↑',
            'ArrowDown': '↓',
            'ArrowLeft': '←',
            'ArrowRight': '→',
            'Escape': 'Esc',
            'Delete': 'Delete',
            'Backspace': 'Backspace',
            'Enter': 'Enter',
            ' ': 'Space',
            'PageUp': 'Page Up',
            'PageDown': 'Page Down',
            'Home': 'Home',
            'End': 'End',
            'Tab': 'Tab',
            '`': '`',
            '-': '-',
            '=': '+',
            '+': '+'
        };

        if (specialKeys[key]) return specialKeys[key];

        // F-клавиши
        if (key.startsWith('F') && key.length <= 3) {
            return key;
        }

        // Обычные клавиши - всегда в верхнем регистре
        if (key.length === 1) {
            return key.toUpperCase();
        }

        return key;
    }

    updatePressedKeysDisplay() {
        const container = document.getElementById('pressedKeys');
        const keys = Array.from(this.pressedKeys);

        container.innerHTML = keys.length > 0
            ? keys.map(key => `<span class="key pressed">${key}</span>`).join(' + ')
            : '';
    }

    checkAnswer() {
        const shortcut = this.currentShortcuts[this.currentQuestionIndex];
        const expected = shortcut.keys.map(k => k.toUpperCase());
        const pressed = Array.from(this.pressedKeys).map(k => k.toUpperCase());

        const isCorrect = this.arraysEqual(expected.sort(), pressed.sort());

        // Остановить таймер
        this.stopQuestionTimer();

        // Записать время ответа
        const timeSpent = Date.now() - this.questionStartTime;
        this.questionTimes.push(timeSpent);

        // Показать результат
        this.showFeedback(isCorrect);

        // Обновить статистику
        if (isCorrect) {
            this.correctAnswers++;
            this.score += this.calculatePoints(timeSpent, shortcut.difficulty);

            const oldStreak = this.currentStreak;
            this.currentStreak++;

            if (this.currentStreak > this.bestStreak) {
                this.bestStreak = this.currentStreak;
            }

            // Воспроизвести звук
            this.sounds.playCorrect();

            // Анимация милестоунов серии
            if (this.currentStreak === 5 || this.currentStreak === 10 || this.currentStreak === 20) {
                this.sounds.playMilestone();
                this.showStreakMilestone(this.currentStreak);
            }

            // Сохранить в общую статистику
            this.stats.totalAttempts++;
            this.stats.correctAttempts++;
            if (this.currentStreak > this.stats.bestStreak) {
                this.stats.bestStreak = this.currentStreak;
            }

            // Обновить прогресс категории
            this.updateCategoryProgress(this.currentCategory);
        } else {
            this.currentStreak = 0;
            this.stats.totalAttempts++;

            // Воспроизвести звук ошибки
            this.sounds.playWrong();
        }

        this.saveStats();
        this.updateTrainingStats();

        // Показать результат на клавиатуре
        if (this.visualKeyboard) {
            this.visualKeyboard.showResult(pressed, expected, isCorrect);
        }

        // Если ответ правильный - автоматический переход
        if (isCorrect && this.settings.autoAdvance) {
            this.isWaitingForRelease = true;

            // Очистить предыдущий таймер, если есть
            if (this.nextQuestionTimeout) {
                clearTimeout(this.nextQuestionTimeout);
            }

            // Установить таймер на автопереход (используем настройки)
            const delay = this.settings.autoAdvanceTime * 1000;
            this.nextQuestionTimeout = setTimeout(() => {
                this.isWaitingForRelease = false;
                this.pressedKeys.clear();
                this.nextQuestion();
            }, delay);
        } else if (!isCorrect) {
            // При неправильном ответе - мгновенный сброс через 1 секунду
            this.isWaitingForRelease = true;

            // Очистить предыдущий таймер, если есть
            if (this.nextQuestionTimeout) {
                clearTimeout(this.nextQuestionTimeout);
            }

            // Мгновенный сброс и повтор того же вопроса
            this.nextQuestionTimeout = setTimeout(() => {
                this.isWaitingForRelease = false;
                this.pressedKeys.clear();
                // Показать тот же вопрос снова (не увеличиваем индекс)
                this.showQuestion();
            }, 1000);
        } else if (isCorrect && !this.settings.autoAdvance) {
            // Автопереход отключен - просто ждем
            this.isWaitingForRelease = false;
        }
    }

    showFeedback(isCorrect) {
        const feedbackElement = document.getElementById('feedback');

        if (isCorrect) {
            feedbackElement.innerHTML = '<div class="feedback-correct">✅ Правильно!</div>';
            feedbackElement.className = 'feedback correct';

            // Показать демонстрацию команды
            this.showCommandDemo();
        } else {
            feedbackElement.innerHTML = '<div class="feedback-wrong">❌ Неправильно</div>';
            feedbackElement.className = 'feedback wrong';

            // Скрыть демонстрацию при неправильном ответе
            document.getElementById('commandDemo').classList.remove('show');
        }
    }

    showCommandDemo() {
        const shortcut = this.currentShortcuts[this.currentQuestionIndex];
        const demoElement = document.getElementById('commandDemo');

        // Определяем демонстрацию на основе описания команды
        const demoContent = this.getCommandDemoContent(shortcut);

        demoElement.innerHTML = `
            <div class="command-demo-content">
                <div class="command-demo-icon">${demoContent.icon}</div>
                <div class="command-demo-text">${demoContent.text}</div>
            </div>
        `;
        demoElement.classList.add('show');
    }

    getCommandDemoContent(shortcut) {
        const description = shortcut.description.toLowerCase();

        // Определяем тип команды и возвращаем соответствующую демонстрацию
        if (description.includes('копировать') || description.includes('скопировать')) {
            return { icon: '📋', text: '✨ Текст скопирован в буфер обмена' };
        } else if (description.includes('вставить')) {
            return { icon: '📄', text: '✨ Текст вставлен из буфера' };
        } else if (description.includes('вырезать')) {
            return { icon: '✂️', text: '✨ Текст вырезан в буфер обмена' };
        } else if (description.includes('отменить')) {
            return { icon: '↩️', text: '✨ Последнее действие отменено' };
        } else if (description.includes('повторить')) {
            return { icon: '↪️', text: '✨ Действие повторено' };
        } else if (description.includes('выделить')) {
            return { icon: '🔲', text: '✨ Содержимое выделено' };
        } else if (description.includes('сохранить')) {
            return { icon: '💾', text: '✨ Документ сохранён' };
        } else if (description.includes('найти') || description.includes('поиск')) {
            return { icon: '🔍', text: '✨ Открыто окно поиска' };
        } else if (description.includes('печать')) {
            return { icon: '🖨️', text: '✨ Открыто окно печати' };
        } else if (description.includes('закрыть')) {
            return { icon: '❌', text: '✨ Окно/вкладка закрыта' };
        } else if (description.includes('открыть')) {
            return { icon: '📂', text: '✨ Открыто новое окно' };
        } else if (description.includes('переключ')) {
            return { icon: '🔄', text: '✨ Выполнено переключение' };
        } else if (description.includes('скриншот') || description.includes('снимок')) {
            return { icon: '📸', text: '✨ Скриншот создан' };
        } else if (description.includes('полужирный') || description.includes('жирный')) {
            return { icon: '🅱️', text: '✨ Текст стал полужирным' };
        } else if (description.includes('курсив')) {
            return { icon: '🆎', text: '✨ Текст стал курсивом' };
        } else if (description.includes('подчёрк')) {
            return { icon: 'U̲', text: '✨ Текст подчёркнут' };
        } else if (description.includes('увеличить')) {
            return { icon: '🔍➕', text: '✨ Масштаб увеличен' };
        } else if (description.includes('уменьшить')) {
            return { icon: '🔍➖', text: '✨ Масштаб уменьшен' };
        } else if (description.includes('форматиров')) {
            return { icon: '✨', text: '✨ Код отформатирован' };
        } else {
            return { icon: '⚡', text: `✨ ${shortcut.description}` };
        }
    }

    calculatePoints(timeMs, difficulty) {
        let basePoints = 100;

        // Бонус за сложность
        const difficultyBonus = {
            'easy': 1,
            'medium': 1.5,
            'hard': 2
        };

        basePoints *= (difficultyBonus[difficulty] || 1);

        // Бонус за скорость
        if (timeMs < 2000) {
            basePoints *= 1.5;
        } else if (timeMs < 5000) {
            basePoints *= 1.2;
        }

        // Бонус за серию
        basePoints += this.currentStreak * 10;

        return Math.round(basePoints);
    }

    arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    updateTrainingStats() {
        const accuracy = this.totalQuestions > 0
            ? Math.round((this.correctAnswers / (this.currentQuestionIndex + 1)) * 100)
            : 100;

        document.getElementById('accuracy').textContent = accuracy + '%';
        document.getElementById('score').textContent = this.score;
        document.getElementById('streakValue').textContent = this.currentStreak + ' 🔥';
    }

    showStreakMilestone(streak) {
        const streakStat = document.getElementById('streakStat');
        if (!streakStat) return;

        streakStat.classList.add('milestone');

        setTimeout(() => {
            streakStat.classList.remove('milestone');
        }, 600);
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.showQuestion();
    }

    skipQuestion() {
        this.stats.totalAttempts++;
        this.saveStats();
        this.currentStreak = 0;
        this.nextQuestion();
    }

    showHint() {
        const shortcut = this.currentShortcuts[this.currentQuestionIndex];

        // Показать комбинацию клавиш
        const expectedKeysContainer = document.getElementById('expectedKeys');
        expectedKeysContainer.innerHTML = shortcut.keys.map(key =>
            `<span class="key">${key}</span>`
        ).join(' + ');
        expectedKeysContainer.classList.remove('hidden-keys');

        // Подсветить на визуальной клавиатуре
        if (this.visualKeyboard) {
            this.visualKeyboard.highlightExpectedKeys(shortcut.keys);
        }
    }

    // Обработка кликов мышкой по клавишам
    handleMouseKeyClick(clickedKeys) {
        // Синхронизируем с набором нажатых клавиш
        this.pressedKeys = new Set(clickedKeys);
        this.updatePressedKeysDisplay();
    }

    // Проверка ответа вручную (по кнопке "Проверить")
    checkAnswerManually() {
        if (this.isWaitingForRelease) {
            return; // Уже проверяем или ждем
        }

        if (this.pressedKeys.size === 0 && this.visualKeyboard) {
            // Используем клавиши из визуальной клавиатуры
            const clickedKeys = this.visualKeyboard.getClickedKeys();
            if (clickedKeys.length === 0) {
                return; // Ничего не выбрано
            }
            this.pressedKeys = new Set(clickedKeys);
        }

        // Проверяем ответ
        this.checkAnswer();
    }

    // Очистить выбор клавиш
    clearSelection() {
        this.pressedKeys.clear();
        if (this.visualKeyboard) {
            this.visualKeyboard.clearClicks();
        }
        this.updatePressedKeysDisplay();
    }

    showResults() {
        const avgTime = this.questionTimes.length > 0
            ? Math.round(this.questionTimes.reduce((a, b) => a + b, 0) / this.questionTimes.length / 1000)
            : 0;

        const accuracy = Math.round((this.correctAnswers / this.totalQuestions) * 100);

        document.getElementById('finalAccuracy').textContent = accuracy + '%';
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalCorrect').textContent = `${this.correctAnswers}/${this.totalQuestions}`;
        document.getElementById('avgTime').textContent = avgTime + 's';
        document.getElementById('finalStreak').textContent = this.bestStreak + ' 🔥';

        // Воспроизвести звук завершения
        this.sounds.playComplete();

        // Сохранить в историю
        this.saveToHistory({
            date: new Date().toISOString(),
            mode: this.currentMode,
            category: this.currentCategory,
            level: this.currentLevel,
            accuracy: accuracy,
            score: this.score,
            correctAnswers: this.correctAnswers,
            totalQuestions: this.totalQuestions,
            avgTime: avgTime,
            bestStreak: this.bestStreak
        });

        document.getElementById('resultsModal').classList.remove('hidden');
    }

    hideModal() {
        document.getElementById('resultsModal').classList.add('hidden');
    }

    showReference() {
        this.hideAllScreens();
        document.getElementById('referenceScreen').classList.remove('hidden');
        this.currentMode = 'reference';

        // Заполнить фильтр категорий
        const categoryFilter = document.getElementById('categoryFilter');
        categoryFilter.innerHTML = '<option value="all">Все категории</option>';

        getAllCategories().forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = cat.name;
            categoryFilter.appendChild(option);
        });

        this.renderShortcutsList();
    }

    renderShortcutsList(filter = '', category = 'all') {
        const container = document.getElementById('shortcutsList');
        container.innerHTML = '';

        const categories = category === 'all'
            ? getAllCategories()
            : [getAllCategories().find(c => c.id === category)];

        categories.forEach(cat => {
            if (!cat) return;

            let shortcuts = cat.shortcuts;

            // Фильтрация по поисковому запросу
            if (filter) {
                shortcuts = shortcuts.filter(s =>
                    s.description.toLowerCase().includes(filter.toLowerCase()) ||
                    s.keys.join(' ').toLowerCase().includes(filter.toLowerCase())
                );
            }

            if (shortcuts.length === 0) return;

            const section = document.createElement('div');
            section.className = 'shortcuts-section';

            const header = document.createElement('h3');
            header.className = 'shortcuts-section-header';
            header.innerHTML = `${cat.icon} ${cat.name}`;
            section.appendChild(header);

            shortcuts.forEach(shortcut => {
                const item = document.createElement('div');
                item.className = 'shortcut-item';

                const keys = document.createElement('div');
                keys.className = 'shortcut-keys';
                keys.innerHTML = shortcut.keys.map(k => `<span class="key">${k}</span>`).join(' + ');

                const desc = document.createElement('div');
                desc.className = 'shortcut-description';
                desc.textContent = shortcut.description;

                item.appendChild(keys);
                item.appendChild(desc);
                section.appendChild(item);
            });

            container.appendChild(section);
        });

        if (container.children.length === 0) {
            container.innerHTML = '<div class="no-results">Ничего не найдено</div>';
        }
    }

    filterShortcuts(query) {
        const category = document.getElementById('categoryFilter').value;
        this.renderShortcutsList(query, category);
    }

    filterByCategory(category) {
        const query = document.getElementById('searchInput').value;
        this.renderShortcutsList(query, category);
    }

    showStats() {
        this.hideAllScreens();
        document.getElementById('statsScreen').classList.remove('hidden');
        this.currentMode = 'stats';

        // Обновить статистику
        document.getElementById('totalAttempts').textContent = this.stats.totalAttempts;
        document.getElementById('correctAttempts').textContent = this.stats.correctAttempts;

        const avgAccuracy = this.stats.totalAttempts > 0
            ? Math.round((this.stats.correctAttempts / this.stats.totalAttempts) * 100)
            : 0;
        document.getElementById('averageAccuracy').textContent = avgAccuracy + '%';
        document.getElementById('bestStreak').textContent = this.stats.bestStreak;

        // Достижения
        this.renderAchievements();

        // История тренировок
        this.renderHistory();

        // Прогресс по категориям
        this.renderCategoryProgress();
    }

    renderAchievements() {
        const container = document.getElementById('achievementsGrid');
        container.innerHTML = '';

        const achievements = [
            { icon: '🎯', name: 'Новичок', description: 'Завершить первую тренировку', unlocked: this.stats.totalAttempts >= 10 },
            { icon: '📚', name: 'Ученик', description: '50 правильных ответов', unlocked: this.stats.correctAttempts >= 50 },
            { icon: '🏆', name: 'Мастер', description: '100 правильных ответов', unlocked: this.stats.correctAttempts >= 100 },
            { icon: '⚡', name: 'Молния', description: 'Серия из 10 правильных ответов', unlocked: this.stats.bestStreak >= 10 },
            { icon: '🔥', name: 'В огне', description: 'Серия из 20 правильных ответов', unlocked: this.stats.bestStreak >= 20 },
            { icon: '💎', name: 'Совершенство', description: '95% точность', unlocked: (this.stats.correctAttempts / this.stats.totalAttempts) >= 0.95 }
        ];

        achievements.forEach(achievement => {
            const card = document.createElement('div');
            card.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            card.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-description">${achievement.description}</div>
            `;
            container.appendChild(card);
        });
    }

    hideAllScreens() {
        document.getElementById('mainMenu').classList.add('hidden');
        document.getElementById('categorySelection').classList.add('hidden');
        document.getElementById('levelSelection').classList.add('hidden');
        document.getElementById('trainingScreen').classList.add('hidden');
        document.getElementById('referenceScreen').classList.add('hidden');
        document.getElementById('statsScreen').classList.add('hidden');
    }

    // Тема
    toggleTheme() {
        const body = document.body;
        const isDark = body.classList.contains('dark-theme');

        if (isDark) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            document.querySelector('.theme-icon').textContent = '🌙';
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            document.querySelector('.theme-icon').textContent = '☀️';
        }
    }

    loadTheme() {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            document.querySelector('.theme-icon').textContent = '☀️';
        }
    }

    // Статистика
    loadStats() {
        const defaultStats = {
            totalAttempts: 0,
            correctAttempts: 0,
            bestStreak: 0
        };

        const saved = localStorage.getItem('keymaster-stats');
        return saved ? JSON.parse(saved) : defaultStats;
    }

    saveStats() {
        localStorage.setItem('keymaster-stats', JSON.stringify(this.stats));
    }

    // Настройки
    loadSettings() {
        const defaultSettings = {
            questionCount: '10',
            autoAdvance: true,
            autoAdvanceTime: 3.5,
            soundEnabled: true
        };

        const saved = localStorage.getItem('keymaster-settings');
        return saved ? JSON.parse(saved) : defaultSettings;
    }

    saveSettings() {
        localStorage.setItem('keymaster-settings', JSON.stringify(this.settings));
    }

    showSettings() {
        document.getElementById('settingsModal').classList.remove('hidden');

        // Установить текущие значения
        document.querySelectorAll('input[name="questionCount"]').forEach(radio => {
            radio.checked = radio.value === this.settings.questionCount;
        });

        document.querySelectorAll('input[name="autoAdvanceTime"]').forEach(radio => {
            radio.checked = parseFloat(radio.value) === this.settings.autoAdvanceTime;
        });

        document.getElementById('autoAdvanceToggle').checked = this.settings.autoAdvance;
        document.getElementById('soundToggle').checked = this.settings.soundEnabled;
    }

    closeSettings() {
        document.getElementById('settingsModal').classList.add('hidden');
    }

    // Избранное
    loadFavorites() {
        const saved = localStorage.getItem('keymaster-favorites');
        return saved ? JSON.parse(saved) : [];
    }

    saveFavorites() {
        localStorage.setItem('keymaster-favorites', JSON.stringify(this.favorites));
    }

    toggleFavorite() {
        const shortcut = this.currentShortcuts[this.currentQuestionIndex];
        const favoriteKey = `${this.currentCategory}:${shortcut.keys.join('+')}`;

        const index = this.favorites.findIndex(f => f.key === favoriteKey);
        const button = document.getElementById('favoriteButton');

        if (index >= 0) {
            // Удалить из избранного
            this.favorites.splice(index, 1);
            button.textContent = '⭐ В избранное';
        } else {
            // Добавить в избранное
            this.favorites.push({
                key: favoriteKey,
                category: this.currentCategory,
                shortcut: shortcut
            });
            button.textContent = '★ В избранном';
        }

        this.saveFavorites();
    }

    startFavorites() {
        if (this.favorites.length === 0) {
            alert('У вас пока нет избранных команд. Добавьте их во время тренировки!');
            return;
        }

        this.currentMode = 'favorites';
        this.currentCategory = 'favorites';
        this.currentShortcuts = this.favorites.map(f => f.shortcut);
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = this.currentShortcuts.length;
        this.questionTimes = [];
        this.currentStreak = 0;
        this.startTime = Date.now();

        this.hideAllScreens();
        document.getElementById('trainingScreen').classList.remove('hidden');

        if (!this.visualKeyboard) {
            this.visualKeyboard = new VisualKeyboard('visualKeyboard');
            this.visualKeyboard.setClickCallback((clickedKeys) => {
                this.handleMouseKeyClick(clickedKeys);
            });
        }

        this.showQuestion();
    }

    // История тренировок
    loadHistory() {
        const saved = localStorage.getItem('keymaster-history');
        return saved ? JSON.parse(saved) : [];
    }

    saveToHistory(session) {
        this.history.unshift(session);

        // Хранить только последние 20 сессий
        if (this.history.length > 20) {
            this.history = this.history.slice(0, 20);
        }

        localStorage.setItem('keymaster-history', JSON.stringify(this.history));
    }

    renderHistory() {
        const container = document.getElementById('historyList');
        if (!container) return;

        container.innerHTML = '';

        if (this.history.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Пока нет истории тренировок</p>';
            return;
        }

        // Показать последние 10 тренировок
        this.history.slice(0, 10).forEach(session => {
            const date = new Date(session.date);
            const dateStr = date.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const categoryName = session.category === 'favorites'
                ? 'Избранное'
                : keyboardData.categories[session.category]?.name || session.category;

            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div>
                    <div class="history-item-date">${dateStr}</div>
                    <div style="font-weight: 600; margin-top: 0.25rem;">${categoryName} (${session.level || 'medium'})</div>
                </div>
                <div class="history-item-stats">
                    <div class="history-item-stat">
                        <div class="history-item-stat-value">${session.accuracy}%</div>
                        <div class="history-item-stat-label">Точность</div>
                    </div>
                    <div class="history-item-stat">
                        <div class="history-item-stat-value">${session.score}</div>
                        <div class="history-item-stat-label">Очки</div>
                    </div>
                    <div class="history-item-stat">
                        <div class="history-item-stat-value">${session.bestStreak} 🔥</div>
                        <div class="history-item-stat-label">Серия</div>
                    </div>
                </div>
            `;
            container.appendChild(item);
        });
    }

    // Прогресс по категориям
    loadCategoryProgress() {
        const saved = localStorage.getItem('keymaster-category-progress');
        return saved ? JSON.parse(saved) : {};
    }

    updateCategoryProgress(categoryId) {
        if (!categoryId || categoryId === 'favorites') return;

        if (!this.categoryProgress[categoryId]) {
            this.categoryProgress[categoryId] = {
                learned: new Set(),
                total: 0
            };
        }

        const shortcut = this.currentShortcuts[this.currentQuestionIndex];
        const key = shortcut.keys.join('+');

        if (!this.categoryProgress[categoryId].learned) {
            this.categoryProgress[categoryId].learned = new Set();
        } else if (Array.isArray(this.categoryProgress[categoryId].learned)) {
            this.categoryProgress[categoryId].learned = new Set(this.categoryProgress[categoryId].learned);
        }

        this.categoryProgress[categoryId].learned.add(key);
        this.categoryProgress[categoryId].total = getShortcutsForCategory(categoryId).length;

        // Сохранить (преобразовать Set в Array)
        const toSave = {};
        for (const cat in this.categoryProgress) {
            toSave[cat] = {
                learned: Array.from(this.categoryProgress[cat].learned || []),
                total: this.categoryProgress[cat].total
            };
        }
        localStorage.setItem('keymaster-category-progress', JSON.stringify(toSave));
    }

    renderCategoryProgress() {
        const container = document.getElementById('categoryProgress');
        if (!container) return;

        container.innerHTML = '';

        const categories = getAllCategories();

        categories.forEach(cat => {
            const progress = this.categoryProgress[cat.id];
            const learned = progress ? (progress.learned?.size || progress.learned?.length || 0) : 0;
            const total = cat.shortcuts.length;
            const percentage = total > 0 ? Math.round((learned / total) * 100) : 0;

            const item = document.createElement('div');
            item.className = 'category-progress-item';
            item.innerHTML = `
                <div class="category-progress-header">
                    <div class="category-progress-name">
                        <span>${cat.icon}</span>
                        <span>${cat.name}</span>
                    </div>
                    <div class="category-progress-percentage">${percentage}%</div>
                </div>
                <div class="category-progress-bar">
                    <div class="category-progress-fill" style="width: ${percentage}%">
                        ${learned}/${total}
                    </div>
                </div>
            `;
            container.appendChild(item);
        });
    }

    // Режим экзамена
    startExam(level) {
        console.log('🎓 Запуск режима ЭКЗАМЕН, уровень:', level);
        this.currentMode = 'exam';
        this.currentCategory = 'exam';
        this.currentLevel = level;
        console.log('✅ currentMode установлен в:', this.currentMode);

        // Получить случайные команды из ВСЕХ категорий
        const allCategories = getAllCategories();
        let allShortcuts = [];

        allCategories.forEach(cat => {
            let shortcuts = cat.shortcuts;

            // Фильтровать по уровню сложности
            if (level === 'easy') {
                shortcuts = shortcuts.filter(s => s.difficulty === 'easy');
            } else if (level === 'medium') {
                shortcuts = shortcuts.filter(s => s.difficulty === 'easy' || s.difficulty === 'medium');
            }

            allShortcuts = allShortcuts.concat(shortcuts);
        });

        // Получить количество вопросов из настроек
        let count = 10;
        if (this.settings.questionCount === 'all') {
            count = allShortcuts.length;
        } else {
            count = parseInt(this.settings.questionCount);
        }

        // Перемешать и выбрать случайные
        this.currentShortcuts = allShortcuts
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.min(count, allShortcuts.length));

        this.currentQuestionIndex = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.totalQuestions = this.currentShortcuts.length;
        this.questionTimes = [];
        this.currentStreak = 0;
        this.startTime = Date.now();

        this.hideAllScreens();
        document.getElementById('trainingScreen').classList.remove('hidden');

        if (!this.visualKeyboard) {
            this.visualKeyboard = new VisualKeyboard('visualKeyboard');
            this.visualKeyboard.setClickCallback((clickedKeys) => {
                this.handleMouseKeyClick(clickedKeys);
            });
        }

        this.showQuestion();
    }
}

// Запуск приложения
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new KeyMasterApp();
});
