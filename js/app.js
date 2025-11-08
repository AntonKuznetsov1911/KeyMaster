// Основное приложение KeyMaster
class KeyMasterApp {
    constructor() {
        this.currentMode = 'menu';
        this.currentCategory = null;
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

        // Визуальная клавиатура
        this.visualKeyboard = null;

        // Статистика (сохраняется в localStorage)
        this.stats = this.loadStats();

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
        document.getElementById('backToCategories')?.addEventListener('click', () => this.showCategorySelection());
        document.getElementById('backFromReference')?.addEventListener('click', () => this.showMainMenu());
        document.getElementById('backFromStats')?.addEventListener('click', () => this.showMainMenu());

        // Кнопки тренировки
        document.getElementById('skipButton')?.addEventListener('click', () => this.skipQuestion());
        document.getElementById('hintButton')?.addEventListener('click', () => this.showHint());

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
                if (this.currentMode === 'practice') {
                    this.startPractice(category.id);
                } else {
                    this.startTraining(category.id);
                }
            });
            grid.appendChild(card);
        });
    }

    startTraining(categoryId) {
        this.currentCategory = categoryId;
        this.currentShortcuts = getShortcutsForCategory(categoryId);
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
        }

        this.showQuestion();
    }

    startPractice(categoryId) {
        this.currentCategory = categoryId;
        this.currentShortcuts = getRandomShortcuts(10, categoryId);
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
        }

        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.currentShortcuts.length) {
            this.showResults();
            return;
        }

        const shortcut = this.currentShortcuts[this.currentQuestionIndex];

        // Обновить UI
        document.getElementById('currentCategory').textContent = keyboardData.categories[this.currentCategory].name;
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('totalQuestions').textContent = this.totalQuestions;
        document.getElementById('commandDescription').textContent = shortcut.description;

        // Показать ожидаемые клавиши
        const expectedKeysContainer = document.getElementById('expectedKeys');
        expectedKeysContainer.innerHTML = shortcut.keys.map(key =>
            `<span class="key">${key}</span>`
        ).join(' + ');

        // Очистить нажатые клавиши
        document.getElementById('pressedKeys').innerHTML = '';
        document.getElementById('feedback').innerHTML = '';
        document.getElementById('feedback').className = 'feedback';

        // Подсветить ожидаемые клавиши на визуальной клавиатуре
        if (this.visualKeyboard) {
            this.visualKeyboard.highlightExpectedKeys(shortcut.keys);
        }

        // Сбросить нажатые клавиши
        this.pressedKeys.clear();
        this.isWaitingForRelease = false;

        // Запустить таймер вопроса
        this.questionStartTime = Date.now();

        // Обновить статистику
        this.updateTrainingStats();
    }

    handleKeyDown(e) {
        // Игнорировать, если не в режиме тренировки
        if (this.currentMode === 'menu' || this.currentMode === 'reference' || this.currentMode === 'stats') {
            return;
        }

        // Игнорировать, если ждём отпускания клавиш
        if (this.isWaitingForRelease) {
            e.preventDefault();
            return;
        }

        // Предотвратить действия по умолчанию
        e.preventDefault();

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

        // Модификаторы
        if (event.ctrlKey && (key === 'Control' || code.includes('Control'))) return 'Ctrl';
        if (event.altKey && (key === 'Alt' || code.includes('Alt'))) return 'Alt';
        if (event.shiftKey && (key === 'Shift' || code.includes('Shift'))) return 'Shift';
        if (event.metaKey && (key === 'Meta' || code.includes('Meta'))) return 'Win';

        // Специальные клавиши
        const specialKeys = {
            'ArrowUp': '↑',
            'ArrowDown': '↓',
            'ArrowLeft': '←',
            'ArrowRight': '→'
        };

        if (specialKeys[key]) return specialKeys[key];

        // Обычные клавиши
        return key.length === 1 ? key.toUpperCase() : key;
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

        // Записать время ответа
        const timeSpent = Date.now() - this.questionStartTime;
        this.questionTimes.push(timeSpent);

        // Показать результат
        this.showFeedback(isCorrect);

        // Обновить статистику
        if (isCorrect) {
            this.correctAnswers++;
            this.score += this.calculatePoints(timeSpent, shortcut.difficulty);
            this.currentStreak++;
            if (this.currentStreak > this.bestStreak) {
                this.bestStreak = this.currentStreak;
            }

            // Сохранить в общую статистику
            this.stats.totalAttempts++;
            this.stats.correctAttempts++;
            if (this.currentStreak > this.stats.bestStreak) {
                this.stats.bestStreak = this.currentStreak;
            }
        } else {
            this.currentStreak = 0;
            this.stats.totalAttempts++;
        }

        this.saveStats();
        this.updateTrainingStats();

        // Показать результат на клавиатуре
        if (this.visualKeyboard) {
            this.visualKeyboard.showResult(pressed, expected, isCorrect);
        }

        // Установить флаг ожидания отпускания
        this.isWaitingForRelease = true;
    }

    showFeedback(isCorrect) {
        const feedbackElement = document.getElementById('feedback');

        if (isCorrect) {
            feedbackElement.innerHTML = '<div class="feedback-correct">✅ Правильно!</div>';
            feedbackElement.className = 'feedback correct';
        } else {
            feedbackElement.innerHTML = '<div class="feedback-wrong">❌ Неправильно</div>';
            feedbackElement.className = 'feedback wrong';
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
        if (this.visualKeyboard) {
            this.visualKeyboard.highlightExpectedKeys(shortcut.keys);
        }
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
}

// Запуск приложения
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new KeyMasterApp();
});
