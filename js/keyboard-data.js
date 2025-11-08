// База данных клавиатурных сочетаний
const keyboardData = {
    categories: {
        windows: {
            name: "Windows",
            icon: "🪟",
            color: "#0078D4",
            shortcuts: [
                { keys: ["Ctrl", "C"], description: "Скопировать выделенный текст или объект", difficulty: "easy" },
                { keys: ["Ctrl", "V"], description: "Вставить скопированный текст или объект", difficulty: "easy" },
                { keys: ["Ctrl", "X"], description: "Вырезать выделенный текст или объект", difficulty: "easy" },
                { keys: ["Ctrl", "Z"], description: "Отменить последнее действие", difficulty: "easy" },
                { keys: ["Ctrl", "Y"], description: "Повторить отменённое действие", difficulty: "easy" },
                { keys: ["Ctrl", "A"], description: "Выделить всё", difficulty: "easy" },
                { keys: ["Ctrl", "S"], description: "Сохранить документ", difficulty: "easy" },
                { keys: ["Ctrl", "F"], description: "Найти текст в документе", difficulty: "easy" },
                { keys: ["Ctrl", "P"], description: "Печать документа", difficulty: "easy" },
                { keys: ["Alt", "Tab"], description: "Переключение между открытыми окнами", difficulty: "medium" },
                { keys: ["Alt", "F4"], description: "Закрыть активное окно", difficulty: "medium" },
                { keys: ["Win", "D"], description: "Показать/скрыть рабочий стол", difficulty: "medium" },
                { keys: ["Win", "E"], description: "Открыть проводник", difficulty: "medium" },
                { keys: ["Win", "L"], description: "Заблокировать компьютер", difficulty: "medium" },
                { keys: ["Win", "R"], description: "Открыть окно 'Выполнить'", difficulty: "medium" },
                { keys: ["Win", "Tab"], description: "Открыть представление задач", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "Esc"], description: "Открыть диспетчер задач", difficulty: "hard" },
                { keys: ["Win", "Shift", "S"], description: "Сделать скриншот области экрана", difficulty: "hard" },
                { keys: ["Win", "+"], description: "Увеличить масштаб (лупа)", difficulty: "hard" },
                { keys: ["Ctrl", "Shift", "N"], description: "Создать новую папку", difficulty: "hard" }
            ]
        },
        macos: {
            name: "macOS",
            icon: "🍎",
            color: "#000000",
            shortcuts: [
                { keys: ["Cmd", "C"], description: "Скопировать выделенный текст", difficulty: "easy" },
                { keys: ["Cmd", "V"], description: "Вставить скопированный текст", difficulty: "easy" },
                { keys: ["Cmd", "X"], description: "Вырезать выделенный текст", difficulty: "easy" },
                { keys: ["Cmd", "Z"], description: "Отменить последнее действие", difficulty: "easy" },
                { keys: ["Cmd", "A"], description: "Выделить всё", difficulty: "easy" },
                { keys: ["Cmd", "S"], description: "Сохранить документ", difficulty: "easy" },
                { keys: ["Cmd", "F"], description: "Найти текст", difficulty: "easy" },
                { keys: ["Cmd", "P"], description: "Печать", difficulty: "easy" },
                { keys: ["Cmd", "Q"], description: "Выйти из приложения", difficulty: "medium" },
                { keys: ["Cmd", "W"], description: "Закрыть окно", difficulty: "medium" },
                { keys: ["Cmd", "Tab"], description: "Переключение между приложениями", difficulty: "medium" },
                { keys: ["Cmd", "Space"], description: "Открыть Spotlight", difficulty: "medium" },
                { keys: ["Cmd", "Shift", "3"], description: "Сделать скриншот всего экрана", difficulty: "hard" },
                { keys: ["Cmd", "Shift", "4"], description: "Сделать скриншот выбранной области", difficulty: "hard" },
                { keys: ["Cmd", "Option", "Esc"], description: "Принудительно завершить приложение", difficulty: "hard" }
            ]
        },
        vscode: {
            name: "VS Code",
            icon: "💻",
            color: "#007ACC",
            shortcuts: [
                { keys: ["Ctrl", "P"], description: "Быстрый переход к файлу", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "P"], description: "Открыть палитру команд", difficulty: "easy" },
                { keys: ["Ctrl", "B"], description: "Показать/скрыть боковую панель", difficulty: "easy" },
                { keys: ["Ctrl", "/"], description: "Закомментировать/раскомментировать строку", difficulty: "easy" },
                { keys: ["Alt", "↑"], description: "Переместить строку вверх", difficulty: "medium" },
                { keys: ["Alt", "↓"], description: "Переместить строку вниз", difficulty: "medium" },
                { keys: ["Ctrl", "D"], description: "Выделить следующее вхождение", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "K"], description: "Удалить строку", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "F"], description: "Поиск по всем файлам", difficulty: "medium" },
                { keys: ["Ctrl", "`"], description: "Открыть/закрыть терминал", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "L"], description: "Выделить все вхождения", difficulty: "hard" },
                { keys: ["Ctrl", "K", "Ctrl", "0"], description: "Свернуть все блоки кода", difficulty: "hard" },
                { keys: ["F12"], description: "Перейти к определению", difficulty: "medium" },
                { keys: ["Shift", "Alt", "F"], description: "Форматировать документ", difficulty: "medium" }
            ]
        },
        chrome: {
            name: "Chrome/Браузер",
            icon: "🌐",
            color: "#4285F4",
            shortcuts: [
                { keys: ["Ctrl", "T"], description: "Открыть новую вкладку", difficulty: "easy" },
                { keys: ["Ctrl", "W"], description: "Закрыть текущую вкладку", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "T"], description: "Открыть последнюю закрытую вкладку", difficulty: "medium" },
                { keys: ["Ctrl", "Tab"], description: "Переключиться на следующую вкладку", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "Tab"], description: "Переключиться на предыдущую вкладку", difficulty: "medium" },
                { keys: ["Ctrl", "L"], description: "Перейти к адресной строке", difficulty: "easy" },
                { keys: ["Ctrl", "R"], description: "Обновить страницу", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "R"], description: "Обновить страницу (игнорируя кеш)", difficulty: "medium" },
                { keys: ["Ctrl", "H"], description: "Открыть историю", difficulty: "medium" },
                { keys: ["Ctrl", "J"], description: "Открыть загрузки", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "N"], description: "Открыть окно в режиме инкогнито", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "Delete"], description: "Очистить данные браузера", difficulty: "hard" },
                { keys: ["F12"], description: "Открыть инструменты разработчика", difficulty: "medium" },
                { keys: ["Ctrl", "+"], description: "Увеличить масштаб", difficulty: "easy" },
                { keys: ["Ctrl", "-"], description: "Уменьшить масштаб", difficulty: "easy" }
            ]
        },
        photoshop: {
            name: "Photoshop",
            icon: "🎨",
            color: "#31A8FF",
            shortcuts: [
                { keys: ["V"], description: "Инструмент перемещения", difficulty: "easy" },
                { keys: ["M"], description: "Инструмент выделения", difficulty: "easy" },
                { keys: ["L"], description: "Инструмент лассо", difficulty: "easy" },
                { keys: ["B"], description: "Кисть", difficulty: "easy" },
                { keys: ["E"], description: "Ластик", difficulty: "easy" },
                { keys: ["T"], description: "Текст", difficulty: "easy" },
                { keys: ["Ctrl", "J"], description: "Дублировать слой", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "N"], description: "Создать новый слой", difficulty: "medium" },
                { keys: ["Ctrl", "E"], description: "Объединить слои", difficulty: "medium" },
                { keys: ["Ctrl", "T"], description: "Свободная трансформация", difficulty: "medium" },
                { keys: ["Ctrl", "Alt", "Z"], description: "Шаг назад", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "Alt", "E"], description: "Создать отпечаток слоёв", difficulty: "hard" },
                { keys: ["["], description: "Уменьшить размер кисти", difficulty: "easy" },
                { keys: ["]"], description: "Увеличить размер кисти", difficulty: "easy" }
            ]
        },
        excel: {
            name: "Excel",
            icon: "📊",
            color: "#217346",
            shortcuts: [
                { keys: ["Ctrl", "C"], description: "Копировать ячейки", difficulty: "easy" },
                { keys: ["Ctrl", "V"], description: "Вставить ячейки", difficulty: "easy" },
                { keys: ["Ctrl", "X"], description: "Вырезать ячейки", difficulty: "easy" },
                { keys: ["Ctrl", "Z"], description: "Отменить действие", difficulty: "easy" },
                { keys: ["Ctrl", "S"], description: "Сохранить книгу", difficulty: "easy" },
                { keys: ["Ctrl", "N"], description: "Создать новую книгу", difficulty: "easy" },
                { keys: ["Ctrl", "1"], description: "Формат ячеек", difficulty: "medium" },
                { keys: ["Ctrl", "Space"], description: "Выделить столбец", difficulty: "medium" },
                { keys: ["Shift", "Space"], description: "Выделить строку", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "+"], description: "Вставить ячейки", difficulty: "medium" },
                { keys: ["Ctrl", "-"], description: "Удалить ячейки", difficulty: "medium" },
                { keys: ["F2"], description: "Редактировать ячейку", difficulty: "easy" },
                { keys: ["Ctrl", "Page Down"], description: "Следующий лист", difficulty: "medium" },
                { keys: ["Ctrl", "Page Up"], description: "Предыдущий лист", difficulty: "medium" },
                { keys: ["Alt", "="], description: "Автосумма", difficulty: "medium" }
            ]
        },
        word: {
            name: "Word",
            icon: "📝",
            color: "#2B579A",
            shortcuts: [
                { keys: ["Ctrl", "C"], description: "Копировать текст", difficulty: "easy" },
                { keys: ["Ctrl", "V"], description: "Вставить текст", difficulty: "easy" },
                { keys: ["Ctrl", "X"], description: "Вырезать текст", difficulty: "easy" },
                { keys: ["Ctrl", "Z"], description: "Отменить", difficulty: "easy" },
                { keys: ["Ctrl", "Y"], description: "Повторить", difficulty: "easy" },
                { keys: ["Ctrl", "B"], description: "Полужирный текст", difficulty: "easy" },
                { keys: ["Ctrl", "I"], description: "Курсив", difficulty: "easy" },
                { keys: ["Ctrl", "U"], description: "Подчёркнутый текст", difficulty: "easy" },
                { keys: ["Ctrl", "L"], description: "Выровнять по левому краю", difficulty: "medium" },
                { keys: ["Ctrl", "E"], description: "Выровнять по центру", difficulty: "medium" },
                { keys: ["Ctrl", "R"], description: "Выровнять по правому краю", difficulty: "medium" },
                { keys: ["Ctrl", "J"], description: "Выровнять по ширине", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", ">"], description: "Увеличить размер шрифта", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "<"], description: "Уменьшить размер шрифта", difficulty: "medium" },
                { keys: ["Ctrl", "Enter"], description: "Вставить разрыв страницы", difficulty: "medium" }
            ]
        },
        linux: {
            name: "Linux",
            icon: "🐧",
            color: "#FCC624",
            shortcuts: [
                { keys: ["Ctrl", "C"], description: "Скопировать (в терминале - прервать)", difficulty: "easy" },
                { keys: ["Ctrl", "V"], description: "Вставить", difficulty: "easy" },
                { keys: ["Ctrl", "Alt", "T"], description: "Открыть терминал", difficulty: "medium" },
                { keys: ["Ctrl", "Alt", "Delete"], description: "Системный монитор", difficulty: "medium" },
                { keys: ["Alt", "F2"], description: "Запустить команду", difficulty: "medium" },
                { keys: ["Alt", "F4"], description: "Закрыть окно", difficulty: "medium" },
                { keys: ["Super", "L"], description: "Заблокировать экран", difficulty: "medium" },
                { keys: ["Ctrl", "Alt", "F1"], description: "Переключиться на TTY1", difficulty: "hard" },
                { keys: ["Alt", "Tab"], description: "Переключение между окнами", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "V"], description: "Вставить в терминале", difficulty: "medium" }
            ]
        }
    }
};

// Словарь для преобразования кодов клавиш в читаемые названия
const keyMap = {
    'Control': 'Ctrl',
    'Meta': 'Win',
    'Command': 'Cmd',
    'Alt': 'Alt',
    'Shift': 'Shift',
    'ArrowUp': '↑',
    'ArrowDown': '↓',
    'ArrowLeft': '←',
    'ArrowRight': '→',
    'Escape': 'Esc',
    'Delete': 'Delete',
    'Backspace': 'Backspace',
    'Enter': 'Enter',
    'Space': 'Space',
    'PageUp': 'Page Up',
    'PageDown': 'Page Down',
    'Home': 'Home',
    'End': 'End',
    'Insert': 'Insert',
    'Tab': 'Tab',
    'CapsLock': 'Caps Lock'
};

// Получить все сочетания для категории
function getShortcutsForCategory(categoryId) {
    return keyboardData.categories[categoryId]?.shortcuts || [];
}

// Получить все категории
function getAllCategories() {
    return Object.keys(keyboardData.categories).map(id => ({
        id,
        ...keyboardData.categories[id]
    }));
}

// Получить случайные сочетания для практики
function getRandomShortcuts(count = 10, categoryId = null) {
    let allShortcuts = [];

    if (categoryId) {
        allShortcuts = getShortcutsForCategory(categoryId).map(s => ({
            ...s,
            category: categoryId,
            categoryName: keyboardData.categories[categoryId].name
        }));
    } else {
        // Собрать все сочетания из всех категорий
        Object.keys(keyboardData.categories).forEach(catId => {
            const shortcuts = keyboardData.categories[catId].shortcuts.map(s => ({
                ...s,
                category: catId,
                categoryName: keyboardData.categories[catId].name
            }));
            allShortcuts = allShortcuts.concat(shortcuts);
        });
    }

    // Перемешать и взять нужное количество
    const shuffled = allShortcuts.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Нормализовать название клавиши
function normalizeKey(key) {
    return keyMap[key] || key.toUpperCase();
}

// Проверить, совпадают ли нажатые клавиши с ожидаемыми
function compareKeys(pressedKeys, expectedKeys) {
    if (pressedKeys.length !== expectedKeys.length) {
        return false;
    }

    const normalizedPressed = pressedKeys.map(k => normalizeKey(k)).sort();
    const normalizedExpected = expectedKeys.map(k => k.toUpperCase()).sort();

    return JSON.stringify(normalizedPressed) === JSON.stringify(normalizedExpected);
}
