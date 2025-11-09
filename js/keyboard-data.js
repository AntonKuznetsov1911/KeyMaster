// База данных клавиатурных сочетаний
const keyboardData = {
    categories: {
        windows: {
            name: "Windows",
            icon: "🪟",
            color: "#0078D4",
            shortcuts: [
                // Основные команды
                { keys: ["Ctrl", "C"], description: "Скопировать выделенный текст или объект", difficulty: "easy" },
                { keys: ["Ctrl", "V"], description: "Вставить скопированный текст или объект", difficulty: "easy" },
                { keys: ["Ctrl", "X"], description: "Вырезать выделенный текст или объект", difficulty: "easy" },
                { keys: ["Ctrl", "Z"], description: "Отменить последнее действие", difficulty: "easy" },
                { keys: ["Ctrl", "Y"], description: "Повторить отменённое действие", difficulty: "easy" },
                { keys: ["Ctrl", "A"], description: "Выделить всё", difficulty: "easy" },
                { keys: ["Ctrl", "S"], description: "Сохранить документ", difficulty: "easy" },
                { keys: ["Ctrl", "F"], description: "Найти текст в документе", difficulty: "easy" },
                { keys: ["Ctrl", "P"], description: "Печать документа", difficulty: "easy" },
                { keys: ["Ctrl", "N"], description: "Создать новый документ", difficulty: "easy" },
                { keys: ["Ctrl", "O"], description: "Открыть файл", difficulty: "easy" },
                { keys: ["Ctrl", "W"], description: "Закрыть окно", difficulty: "easy" },
                { keys: ["Delete"], description: "Удалить выбранный элемент", difficulty: "easy" },
                { keys: ["Shift", "Delete"], description: "Удалить без помещения в корзину", difficulty: "medium" },

                // Работа с окнами
                { keys: ["Alt", "Tab"], description: "Переключение между открытыми окнами", difficulty: "medium" },
                { keys: ["Alt", "F4"], description: "Закрыть активное окно", difficulty: "medium" },
                { keys: ["Win", "D"], description: "Показать/скрыть рабочий стол", difficulty: "medium" },
                { keys: ["Win", "M"], description: "Свернуть все окна", difficulty: "medium" },
                { keys: ["Win", "Shift", "M"], description: "Развернуть свёрнутые окна", difficulty: "hard" },
                { keys: ["Win", "↑"], description: "Развернуть окно на весь экран", difficulty: "medium" },
                { keys: ["Win", "↓"], description: "Свернуть текущее окно", difficulty: "medium" },
                { keys: ["Win", "←"], description: "Прикрепить окно к левому краю", difficulty: "medium" },
                { keys: ["Win", "→"], description: "Прикрепить окно к правому краю", difficulty: "medium" },
                { keys: ["Win", "Home"], description: "Свернуть все кроме активного окна", difficulty: "hard" },

                // Win команды
                { keys: ["Win", "E"], description: "Открыть проводник", difficulty: "medium" },
                { keys: ["Win", "L"], description: "Заблокировать компьютер", difficulty: "medium" },
                { keys: ["Win", "R"], description: "Открыть окно 'Выполнить'", difficulty: "medium" },
                { keys: ["Win", "Tab"], description: "Открыть представление задач", difficulty: "medium" },
                { keys: ["Win", "I"], description: "Открыть параметры Windows", difficulty: "medium" },
                { keys: ["Win", "A"], description: "Открыть центр уведомлений", difficulty: "medium" },
                { keys: ["Win", "S"], description: "Открыть поиск", difficulty: "medium" },
                { keys: ["Win", "V"], description: "Открыть журнал буфера обмена", difficulty: "hard" },
                { keys: ["Win", "X"], description: "Открыть меню быстрых ссылок", difficulty: "medium" },
                { keys: ["Win", "K"], description: "Подключение к беспроводным дисплеям", difficulty: "hard" },
                { keys: ["Win", "P"], description: "Режим проецирования экрана", difficulty: "medium" },
                { keys: ["Win", "U"], description: "Центр специальных возможностей", difficulty: "hard" },
                { keys: ["Win", "."], description: "Открыть панель эмодзи", difficulty: "medium" },
                { keys: ["Win", ";"], description: "Открыть панель эмодзи (альтернатива)", difficulty: "medium" },

                // Виртуальные рабочие столы
                { keys: ["Win", "Ctrl", "D"], description: "Создать новый виртуальный рабочий стол", difficulty: "hard" },
                { keys: ["Win", "Ctrl", "F4"], description: "Закрыть текущий виртуальный рабочий стол", difficulty: "hard" },
                { keys: ["Win", "Ctrl", "←"], description: "Переключиться на левый рабочий стол", difficulty: "hard" },
                { keys: ["Win", "Ctrl", "→"], description: "Переключиться на правый рабочий стол", difficulty: "hard" },

                // Системные команды
                { keys: ["Ctrl", "Shift", "Esc"], description: "Открыть диспетчер задач", difficulty: "hard" },
                { keys: ["Win", "Shift", "S"], description: "Сделать скриншот области экрана", difficulty: "hard" },
                { keys: ["Win", "PrtScn"], description: "Скриншот всего экрана в файл", difficulty: "medium" },
                { keys: ["Alt", "PrtScn"], description: "Скриншот активного окна", difficulty: "medium" },
                { keys: ["Win", "+"], description: "Увеличить масштаб (лупа)", difficulty: "hard" },
                { keys: ["Win", "-"], description: "Уменьшить масштаб (лупа)", difficulty: "hard" },
                { keys: ["Win", "Esc"], description: "Закрыть лупу", difficulty: "hard" },

                // Проводник
                { keys: ["Ctrl", "Shift", "N"], description: "Создать новую папку", difficulty: "hard" },
                { keys: ["Alt", "←"], description: "Назад в проводнике", difficulty: "medium" },
                { keys: ["Alt", "→"], description: "Вперёд в проводнике", difficulty: "medium" },
                { keys: ["Alt", "↑"], description: "Уровень вверх в проводнике", difficulty: "medium" },
                { keys: ["F2"], description: "Переименовать файл", difficulty: "easy" },
                { keys: ["F5"], description: "Обновить окно", difficulty: "easy" },
                { keys: ["F11"], description: "Полноэкранный режим", difficulty: "easy" },
                { keys: ["Ctrl", "Scroll"], description: "Изменить размер значков", difficulty: "medium" },
                { keys: ["Alt", "Enter"], description: "Свойства выделенного элемента", difficulty: "medium" },
                { keys: ["Ctrl", "E"], description: "Перейти к строке поиска", difficulty: "medium" },

                // Дополнительные команды
                { keys: ["F1"], description: "Справка", difficulty: "easy" },
                { keys: ["F10"], description: "Активировать строку меню", difficulty: "medium" },
                { keys: ["Shift", "F10"], description: "Контекстное меню", difficulty: "medium" },
                { keys: ["Ctrl", "F4"], description: "Закрыть документ", difficulty: "medium" },
                { keys: ["Alt", "Space"], description: "Системное меню окна", difficulty: "hard" },
                { keys: ["Ctrl", "Alt", "Tab"], description: "Постоянное отображение открытых окон", difficulty: "hard" },
                { keys: ["Win", "Number"], description: "Запустить приложение с панели задач", difficulty: "medium" },
                { keys: ["Win", "Shift", "Number"], description: "Новое окно приложения с панели задач", difficulty: "hard" },
                { keys: ["Win", "Ctrl", "Number"], description: "Последнее окно приложения", difficulty: "hard" },
                { keys: ["Win", "T"], description: "Переключение между приложениями на панели задач", difficulty: "medium" },
                { keys: ["Win", "B"], description: "Фокус на область уведомлений", difficulty: "hard" },
                { keys: ["Win", "Alt", "D"], description: "Дата и время на рабочем столе", difficulty: "hard" }
            ]
        },
        macos: {
            name: "macOS",
            icon: "🍎",
            color: "#000000",
            shortcuts: [
                // Основные команды
                { keys: ["Cmd", "C"], description: "Скопировать выделенный текст", difficulty: "easy" },
                { keys: ["Cmd", "V"], description: "Вставить скопированный текст", difficulty: "easy" },
                { keys: ["Cmd", "X"], description: "Вырезать выделенный текст", difficulty: "easy" },
                { keys: ["Cmd", "Z"], description: "Отменить последнее действие", difficulty: "easy" },
                { keys: ["Cmd", "Shift", "Z"], description: "Повторить отменённое действие", difficulty: "medium" },
                { keys: ["Cmd", "A"], description: "Выделить всё", difficulty: "easy" },
                { keys: ["Cmd", "S"], description: "Сохранить документ", difficulty: "easy" },
                { keys: ["Cmd", "F"], description: "Найти текст", difficulty: "easy" },
                { keys: ["Cmd", "P"], description: "Печать", difficulty: "easy" },
                { keys: ["Cmd", "N"], description: "Создать новый документ", difficulty: "easy" },
                { keys: ["Cmd", "O"], description: "Открыть файл", difficulty: "easy" },
                { keys: ["Cmd", "G"], description: "Найти следующее", difficulty: "medium" },
                { keys: ["Cmd", "Shift", "G"], description: "Найти предыдущее", difficulty: "medium" },

                // Работа с окнами и приложениями
                { keys: ["Cmd", "Q"], description: "Выйти из приложения", difficulty: "medium" },
                { keys: ["Cmd", "W"], description: "Закрыть окно", difficulty: "medium" },
                { keys: ["Cmd", "M"], description: "Свернуть окно", difficulty: "medium" },
                { keys: ["Cmd", "Option", "M"], description: "Свернуть все окна приложения", difficulty: "hard" },
                { keys: ["Cmd", "H"], description: "Скрыть окна приложения", difficulty: "medium" },
                { keys: ["Cmd", "Option", "H"], description: "Скрыть окна других приложений", difficulty: "hard" },
                { keys: ["Cmd", "Tab"], description: "Переключение между приложениями", difficulty: "medium" },
                { keys: ["Cmd", "`"], description: "Переключение между окнами приложения", difficulty: "medium" },
                { keys: ["Cmd", ","], description: "Открыть настройки приложения", difficulty: "medium" },

                // Spotlight и поиск
                { keys: ["Cmd", "Space"], description: "Открыть Spotlight", difficulty: "medium" },
                { keys: ["Cmd", "Option", "Space"], description: "Окно поиска Finder", difficulty: "hard" },

                // Finder
                { keys: ["Cmd", "Shift", "N"], description: "Создать новую папку", difficulty: "medium" },
                { keys: ["Cmd", "Delete"], description: "Переместить в корзину", difficulty: "easy" },
                { keys: ["Cmd", "Shift", "Delete"], description: "Очистить корзину", difficulty: "hard" },
                { keys: ["Cmd", "Option", "Shift", "Delete"], description: "Очистить корзину без подтверждения", difficulty: "hard" },
                { keys: ["Cmd", "D"], description: "Дублировать файлы", difficulty: "medium" },
                { keys: ["Cmd", "I"], description: "Показать информацию о файле", difficulty: "medium" },
                { keys: ["Cmd", "R"], description: "Показать оригинал ярлыка", difficulty: "hard" },
                { keys: ["Cmd", "T"], description: "Новая вкладка в Finder", difficulty: "medium" },
                { keys: ["Cmd", "["], description: "Назад в Finder", difficulty: "medium" },
                { keys: ["Cmd", "]"], description: "Вперёд в Finder", difficulty: "medium" },
                { keys: ["Cmd", "↑"], description: "Открыть родительскую папку", difficulty: "medium" },
                { keys: ["Cmd", "↓"], description: "Открыть выделенный элемент", difficulty: "medium" },
                { keys: ["Cmd", "Shift", "C"], description: "Открыть Компьютер", difficulty: "medium" },
                { keys: ["Cmd", "Shift", "D"], description: "Открыть Рабочий стол", difficulty: "medium" },
                { keys: ["Cmd", "Shift", "H"], description: "Открыть Домашнюю папку", difficulty: "medium" },
                { keys: ["Cmd", "Shift", "O"], description: "Открыть Документы", difficulty: "medium" },
                { keys: ["Cmd", "Shift", "U"], description: "Открыть Утилиты", difficulty: "hard" },
                { keys: ["Cmd", "Shift", "A"], description: "Открыть Программы", difficulty: "medium" },
                { keys: ["Cmd", "K"], description: "Подключиться к серверу", difficulty: "hard" },

                // Скриншоты
                { keys: ["Cmd", "Shift", "3"], description: "Скриншот всего экрана", difficulty: "hard" },
                { keys: ["Cmd", "Shift", "4"], description: "Скриншот выбранной области", difficulty: "hard" },
                { keys: ["Cmd", "Shift", "5"], description: "Открыть панель скриншотов", difficulty: "hard" },
                { keys: ["Cmd", "Shift", "4", "Space"], description: "Скриншот конкретного окна", difficulty: "hard" },

                // Системные команды
                { keys: ["Cmd", "Option", "Esc"], description: "Принудительно завершить приложение", difficulty: "hard" },
                { keys: ["Cmd", "Ctrl", "Q"], description: "Заблокировать экран", difficulty: "medium" },
                { keys: ["Cmd", "Option", "Power"], description: "Режим сна", difficulty: "hard" },
                { keys: ["Cmd", "Ctrl", "Power"], description: "Перезагрузка", difficulty: "hard" },
                { keys: ["Cmd", "Shift", "Q"], description: "Выйти из учётной записи", difficulty: "hard" },
                { keys: ["Cmd", "Ctrl", "F"], description: "Полноэкранный режим", difficulty: "medium" },

                // Текст и редактирование
                { keys: ["Cmd", "B"], description: "Полужирный текст", difficulty: "easy" },
                { keys: ["Cmd", "I"], description: "Курсив", difficulty: "easy" },
                { keys: ["Cmd", "U"], description: "Подчёркнутый текст", difficulty: "easy" },
                { keys: ["Cmd", "T"], description: "Шрифты", difficulty: "medium" },
                { keys: ["Cmd", "Option", "C"], description: "Копировать стиль", difficulty: "hard" },
                { keys: ["Cmd", "Option", "V"], description: "Вставить стиль", difficulty: "hard" },
                { keys: ["Cmd", "+"], description: "Увеличить масштаб", difficulty: "easy" },
                { keys: ["Cmd", "-"], description: "Уменьшить масштаб", difficulty: "easy" },
                { keys: ["Cmd", "0"], description: "Сбросить масштаб", difficulty: "medium" },

                // Mission Control и пространства
                { keys: ["Ctrl", "↑"], description: "Mission Control", difficulty: "medium" },
                { keys: ["Ctrl", "↓"], description: "Окна приложения", difficulty: "medium" },
                { keys: ["Ctrl", "←"], description: "Переключить пространство влево", difficulty: "hard" },
                { keys: ["Ctrl", "→"], description: "Переключить пространство вправо", difficulty: "hard" },
                { keys: ["F11"], description: "Показать рабочий стол", difficulty: "medium" }
            ]
        },
        vscode: {
            name: "VS Code",
            icon: "💻",
            color: "#007ACC",
            shortcuts: [
                // Основные команды
                { keys: ["Ctrl", "P"], description: "Быстрый переход к файлу", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "P"], description: "Открыть палитру команд", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "N"], description: "Новое окно редактора", difficulty: "easy" },
                { keys: ["Ctrl", "W"], description: "Закрыть редактор", difficulty: "easy" },
                { keys: ["Ctrl", "N"], description: "Новый файл", difficulty: "easy" },
                { keys: ["Ctrl", "O"], description: "Открыть файл", difficulty: "easy" },
                { keys: ["Ctrl", "S"], description: "Сохранить файл", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "S"], description: "Сохранить как", difficulty: "medium" },
                { keys: ["Ctrl", "K", "S"], description: "Сохранить все", difficulty: "medium" },

                // Панели и вид
                { keys: ["Ctrl", "B"], description: "Показать/скрыть боковую панель", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "E"], description: "Открыть проводник", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "F"], description: "Поиск по всем файлам", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "G"], description: "Управление версиями (Git)", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "D"], description: "Отладка", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "X"], description: "Расширения", difficulty: "medium" },
                { keys: ["Ctrl", "`"], description: "Открыть/закрыть терминал", difficulty: "medium" },
                { keys: ["Ctrl", "J"], description: "Показать/скрыть панель", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "M"], description: "Показать проблемы", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "U"], description: "Показать вывод", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "Y"], description: "Консоль отладки", difficulty: "medium" },

                // Редактирование кода
                { keys: ["Ctrl", "/"], description: "Закомментировать/раскомментировать строку", difficulty: "easy" },
                { keys: ["Shift", "Alt", "A"], description: "Блочный комментарий", difficulty: "medium" },
                { keys: ["Alt", "↑"], description: "Переместить строку вверх", difficulty: "medium" },
                { keys: ["Alt", "↓"], description: "Переместить строку вниз", difficulty: "medium" },
                { keys: ["Shift", "Alt", "↑"], description: "Копировать строку вверх", difficulty: "medium" },
                { keys: ["Shift", "Alt", "↓"], description: "Копировать строку вниз", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "K"], description: "Удалить строку", difficulty: "medium" },
                { keys: ["Ctrl", "Enter"], description: "Вставить строку ниже", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "Enter"], description: "Вставить строку выше", difficulty: "medium" },
                { keys: ["Ctrl", "]"], description: "Увеличить отступ", difficulty: "medium" },
                { keys: ["Ctrl", "["], description: "Уменьшить отступ", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "\\"], description: "Перейти к парной скобке", difficulty: "hard" },

                // Поиск и навигация
                { keys: ["Ctrl", "F"], description: "Найти в файле", difficulty: "easy" },
                { keys: ["Ctrl", "H"], description: "Заменить", difficulty: "easy" },
                { keys: ["F3"], description: "Найти следующее", difficulty: "easy" },
                { keys: ["Shift", "F3"], description: "Найти предыдущее", difficulty: "easy" },
                { keys: ["Ctrl", "G"], description: "Перейти к строке", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "O"], description: "Перейти к символу", difficulty: "medium" },
                { keys: ["Ctrl", "T"], description: "Показать все символы", difficulty: "medium" },
                { keys: ["F12"], description: "Перейти к определению", difficulty: "medium" },
                { keys: ["Alt", "F12"], description: "Посмотреть определение", difficulty: "hard" },
                { keys: ["Shift", "F12"], description: "Показать ссылки", difficulty: "hard" },
                { keys: ["Ctrl", "K", "F12"], description: "Открыть определение сбоку", difficulty: "hard" },

                // Мультикурсор и выделение
                { keys: ["Ctrl", "D"], description: "Выделить следующее вхождение", difficulty: "medium" },
                { keys: ["Ctrl", "K", "Ctrl", "D"], description: "Пропустить текущее выделение", difficulty: "hard" },
                { keys: ["Ctrl", "Shift", "L"], description: "Выделить все вхождения", difficulty: "hard" },
                { keys: ["Alt", "Click"], description: "Добавить курсор", difficulty: "medium" },
                { keys: ["Ctrl", "Alt", "↑"], description: "Добавить курсор выше", difficulty: "hard" },
                { keys: ["Ctrl", "Alt", "↓"], description: "Добавить курсор ниже", difficulty: "hard" },
                { keys: ["Ctrl", "U"], description: "Отменить последнее движение курсора", difficulty: "hard" },
                { keys: ["Shift", "Alt", "I"], description: "Курсоры в конце строк", difficulty: "hard" },

                // Форматирование
                { keys: ["Shift", "Alt", "F"], description: "Форматировать документ", difficulty: "medium" },
                { keys: ["Ctrl", "K", "Ctrl", "F"], description: "Форматировать выделение", difficulty: "hard" },

                // Сворачивание кода
                { keys: ["Ctrl", "Shift", "["], description: "Свернуть регион", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "]"], description: "Развернуть регион", difficulty: "medium" },
                { keys: ["Ctrl", "K", "Ctrl", "0"], description: "Свернуть все", difficulty: "hard" },
                { keys: ["Ctrl", "K", "Ctrl", "J"], description: "Развернуть все", difficulty: "hard" },
                { keys: ["Ctrl", "K", "Ctrl", "["], description: "Свернуть все вложенные", difficulty: "hard" },
                { keys: ["Ctrl", "K", "Ctrl", "]"], description: "Развернуть все вложенные", difficulty: "hard" },

                // Вкладки и редакторы
                { keys: ["Ctrl", "Tab"], description: "Переключить открытый файл", difficulty: "easy" },
                { keys: ["Ctrl", "1"], description: "Фокус на первую группу редакторов", difficulty: "medium" },
                { keys: ["Ctrl", "2"], description: "Фокус на вторую группу редакторов", difficulty: "medium" },
                { keys: ["Ctrl", "3"], description: "Фокус на третью группу редакторов", difficulty: "medium" },
                { keys: ["Ctrl", "\\"], description: "Разделить редактор", difficulty: "medium" },
                { keys: ["Ctrl", "K", "Ctrl", "←"], description: "Фокус на левую группу", difficulty: "hard" },
                { keys: ["Ctrl", "K", "Ctrl", "→"], description: "Фокус на правую группу", difficulty: "hard" },
                { keys: ["Ctrl", "K", "←"], description: "Переместить редактор влево", difficulty: "hard" },
                { keys: ["Ctrl", "K", "→"], description: "Переместить редактор вправо", difficulty: "hard" },

                // Отладка
                { keys: ["F5"], description: "Начать/продолжить отладку", difficulty: "medium" },
                { keys: ["Shift", "F5"], description: "Остановить отладку", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "F5"], description: "Перезапустить отладку", difficulty: "medium" },
                { keys: ["F9"], description: "Переключить точку останова", difficulty: "medium" },
                { keys: ["F10"], description: "Шаг с обходом", difficulty: "medium" },
                { keys: ["F11"], description: "Шаг с заходом", difficulty: "medium" },
                { keys: ["Shift", "F11"], description: "Шаг с выходом", difficulty: "medium" },

                // Дополнительные команды
                { keys: ["Ctrl", "K", "V"], description: "Открыть Markdown предпросмотр", difficulty: "hard" },
                { keys: ["Ctrl", "K", "Z"], description: "Режим Zen", difficulty: "medium" },
                { keys: ["Ctrl", "="], description: "Увеличить масштаб", difficulty: "easy" },
                { keys: ["Ctrl", "-"], description: "Уменьшить масштаб", difficulty: "easy" },
                { keys: ["Ctrl", ","], description: "Настройки", difficulty: "medium" },
                { keys: ["Ctrl", "K", "Ctrl", "T"], description: "Изменить тему", difficulty: "medium" },
                { keys: ["Ctrl", "K", "Ctrl", "S"], description: "Сочетания клавиш", difficulty: "hard" }
            ]
        },
        chrome: {
            name: "Chrome/Браузер",
            icon: "🌐",
            color: "#4285F4",
            shortcuts: [
                // Вкладки
                { keys: ["Ctrl", "T"], description: "Открыть новую вкладку", difficulty: "easy" },
                { keys: ["Ctrl", "W"], description: "Закрыть текущую вкладку", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "T"], description: "Открыть последнюю закрытую вкладку", difficulty: "medium" },
                { keys: ["Ctrl", "Tab"], description: "Переключиться на следующую вкладку", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "Tab"], description: "Переключиться на предыдущую вкладку", difficulty: "medium" },
                { keys: ["Ctrl", "1"], description: "Перейти к первой вкладке", difficulty: "medium" },
                { keys: ["Ctrl", "9"], description: "Перейти к последней вкладке", difficulty: "medium" },
                { keys: ["Ctrl", "N"], description: "Новое окно", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "N"], description: "Новое окно инкогнито", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "W"], description: "Закрыть окно", difficulty: "medium" },
                { keys: ["Alt", "Home"], description: "Открыть главную страницу", difficulty: "medium" },

                // Навигация
                { keys: ["Ctrl", "L"], description: "Перейти к адресной строке", difficulty: "easy" },
                { keys: ["Alt", "D"], description: "Перейти к адресной строке (альтернатива)", difficulty: "medium" },
                { keys: ["Ctrl", "Enter"], description: "Добавить www. и .com", difficulty: "medium" },
                { keys: ["Ctrl", "R"], description: "Обновить страницу", difficulty: "easy" },
                { keys: ["F5"], description: "Обновить страницу (альтернатива)", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "R"], description: "Обновить без кеша", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "Delete"], description: "Очистить данные браузера", difficulty: "hard" },
                { keys: ["Alt", "←"], description: "Назад", difficulty: "easy" },
                { keys: ["Alt", "→"], description: "Вперёд", difficulty: "easy" },
                { keys: ["Backspace"], description: "Назад (альтернатива)", difficulty: "easy" },

                // Инструменты
                { keys: ["Ctrl", "H"], description: "Открыть историю", difficulty: "medium" },
                { keys: ["Ctrl", "J"], description: "Открыть загрузки", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "B"], description: "Показать/скрыть панель закладок", difficulty: "medium" },
                { keys: ["Ctrl", "D"], description: "Добавить закладку", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "D"], description: "Сохранить все вкладки как закладки", difficulty: "hard" },
                { keys: ["Ctrl", "Shift", "O"], description: "Открыть диспетчер закладок", difficulty: "medium" },
                { keys: ["F12"], description: "Инструменты разработчика", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "J"], description: "Консоль JavaScript", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "I"], description: "Инструменты разработчика (альтернатива)", difficulty: "medium" },
                { keys: ["Ctrl", "U"], description: "Просмотр исходного кода", difficulty: "medium" },

                // Поиск и масштаб
                { keys: ["Ctrl", "F"], description: "Найти на странице", difficulty: "easy" },
                { keys: ["Ctrl", "G"], description: "Найти следующее", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "G"], description: "Найти предыдущее", difficulty: "medium" },
                { keys: ["Ctrl", "+"], description: "Увеличить масштаб", difficulty: "easy" },
                { keys: ["Ctrl", "-"], description: "Уменьшить масштаб", difficulty: "easy" },
                { keys: ["Ctrl", "0"], description: "Сбросить масштаб", difficulty: "medium" },
                { keys: ["Ctrl", "Scroll"], description: "Изменить масштаб колёсиком", difficulty: "medium" },

                // Страница
                { keys: ["Space"], description: "Прокрутить вниз", difficulty: "easy" },
                { keys: ["Shift", "Space"], description: "Прокрутить вверх", difficulty: "easy" },
                { keys: ["Home"], description: "В начало страницы", difficulty: "easy" },
                { keys: ["End"], description: "В конец страницы", difficulty: "easy" },
                { keys: ["Ctrl", "P"], description: "Печать", difficulty: "easy" },
                { keys: ["Ctrl", "S"], description: "Сохранить страницу", difficulty: "easy" },
                { keys: ["F11"], description: "Полноэкранный режим", difficulty: "medium" },
                { keys: ["Esc"], description: "Остановить загрузку", difficulty: "easy" },

                // Дополнительно
                { keys: ["Ctrl", "Shift", "M"], description: "Переключить профиль пользователя", difficulty: "hard" },
                { keys: ["Alt", "F"], description: "Открыть меню Chrome", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "A"], description: "Поиск вкладок", difficulty: "hard" },
                { keys: ["Ctrl", "Click"], description: "Открыть ссылку в новой вкладке", difficulty: "medium" },
                { keys: ["Shift", "Click"], description: "Открыть ссылку в новом окне", difficulty: "medium" }
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
                // Основные
                { keys: ["Ctrl", "C"], description: "Копировать", difficulty: "easy" },
                { keys: ["Ctrl", "V"], description: "Вставить", difficulty: "easy" },
                { keys: ["Ctrl", "X"], description: "Вырезать", difficulty: "easy" },
                { keys: ["Ctrl", "Z"], description: "Отменить", difficulty: "easy" },
                { keys: ["Ctrl", "Y"], description: "Повторить", difficulty: "easy" },
                { keys: ["Ctrl", "S"], description: "Сохранить", difficulty: "easy" },
                { keys: ["Ctrl", "N"], description: "Новая книга", difficulty: "easy" },
                { keys: ["Ctrl", "O"], description: "Открыть", difficulty: "easy" },
                { keys: ["Ctrl", "P"], description: "Печать", difficulty: "easy" },
                { keys: ["Ctrl", "W"], description: "Закрыть", difficulty: "easy" },
                { keys: ["F12"], description: "Сохранить как", difficulty: "medium" },

                // Выделение
                { keys: ["Ctrl", "Space"], description: "Выделить столбец", difficulty: "medium" },
                { keys: ["Shift", "Space"], description: "Выделить строку", difficulty: "medium" },
                { keys: ["Ctrl", "A"], description: "Выделить всё", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "End"], description: "Выделить до последней ячейки", difficulty: "medium" },

                // Навигация
                { keys: ["Ctrl", "Home"], description: "В начало листа", difficulty: "easy" },
                { keys: ["Ctrl", "End"], description: "К последней ячейке", difficulty: "easy" },
                { keys: ["Ctrl", "Page Down"], description: "Следующий лист", difficulty: "medium" },
                { keys: ["Ctrl", "Page Up"], description: "Предыдущий лист", difficulty: "medium" },
                { keys: ["Ctrl", "G"], description: "Перейти к ячейке", difficulty: "medium" },

                // Редактирование
                { keys: ["F2"], description: "Редактировать ячейку", difficulty: "easy" },
                { keys: ["Delete"], description: "Очистить ячейку", difficulty: "easy" },
                { keys: ["Ctrl", "D"], description: "Заполнить вниз", difficulty: "medium" },
                { keys: ["Ctrl", "R"], description: "Заполнить вправо", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "+"], description: "Вставить ячейки", difficulty: "medium" },
                { keys: ["Ctrl", "-"], description: "Удалить ячейки", difficulty: "medium" },
                { keys: ["Ctrl", ";"], description: "Вставить дату", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", ";"], description: "Вставить время", difficulty: "medium" },
                { keys: ["Alt", "Enter"], description: "Перенос строки в ячейке", difficulty: "medium" },

                // Форматирование
                { keys: ["Ctrl", "1"], description: "Формат ячеек", difficulty: "medium" },
                { keys: ["Ctrl", "B"], description: "Полужирный", difficulty: "easy" },
                { keys: ["Ctrl", "I"], description: "Курсив", difficulty: "easy" },
                { keys: ["Ctrl", "U"], description: "Подчёркнутый", difficulty: "easy" },
                { keys: ["Ctrl", "5"], description: "Зачёркнутый", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "$"], description: "Денежный формат", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "%"], description: "Процентный формат", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "#"], description: "Формат даты", difficulty: "medium" },

                // Формулы
                { keys: ["Alt", "="], description: "Автосумма", difficulty: "medium" },
                { keys: ["Ctrl", "`"], description: "Показать формулы", difficulty: "medium" },
                { keys: ["F4"], description: "Переключить ссылки", difficulty: "medium" },
                { keys: ["Shift", "F3"], description: "Вставить функцию", difficulty: "medium" },
                { keys: ["F9"], description: "Вычислить все", difficulty: "medium" },

                // Данные
                { keys: ["Ctrl", "T"], description: "Создать таблицу", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "L"], description: "Включить фильтр", difficulty: "medium" },
                { keys: ["Alt", "↓"], description: "Открыть фильтр", difficulty: "medium" },
                { keys: ["Shift", "F2"], description: "Добавить примечание", difficulty: "medium" },

                // Листы
                { keys: ["Shift", "F11"], description: "Вставить новый лист", difficulty: "medium" },
                { keys: ["Alt", "F1"], description: "Создать диаграмму", difficulty: "medium" },
                { keys: ["F11"], description: "Диаграмма на новом листе", difficulty: "medium" },
                { keys: ["Alt", "F8"], description: "Макросы", difficulty: "hard" },
                { keys: ["Alt", "F11"], description: "Редактор VBA", difficulty: "hard" },
                { keys: ["F7"], description: "Проверка орфографии", difficulty: "easy" }
            ]
        },
        word: {
            name: "Word",
            icon: "📝",
            color: "#2B579A",
            shortcuts: [
                // Основные команды
                { keys: ["Ctrl", "C"], description: "Копировать текст", difficulty: "easy" },
                { keys: ["Ctrl", "V"], description: "Вставить текст", difficulty: "easy" },
                { keys: ["Ctrl", "X"], description: "Вырезать текст", difficulty: "easy" },
                { keys: ["Ctrl", "Z"], description: "Отменить", difficulty: "easy" },
                { keys: ["Ctrl", "Y"], description: "Повторить", difficulty: "easy" },
                { keys: ["Ctrl", "A"], description: "Выделить всё", difficulty: "easy" },
                { keys: ["Ctrl", "S"], description: "Сохранить документ", difficulty: "easy" },
                { keys: ["Ctrl", "N"], description: "Создать новый документ", difficulty: "easy" },
                { keys: ["Ctrl", "O"], description: "Открыть документ", difficulty: "easy" },
                { keys: ["Ctrl", "P"], description: "Печать", difficulty: "easy" },
                { keys: ["Ctrl", "W"], description: "Закрыть документ", difficulty: "easy" },
                { keys: ["Ctrl", "F"], description: "Найти", difficulty: "easy" },
                { keys: ["Ctrl", "H"], description: "Заменить", difficulty: "easy" },
                { keys: ["F12"], description: "Сохранить как", difficulty: "medium" },

                // Форматирование текста
                { keys: ["Ctrl", "B"], description: "Полужирный текст", difficulty: "easy" },
                { keys: ["Ctrl", "I"], description: "Курсив", difficulty: "easy" },
                { keys: ["Ctrl", "U"], description: "Подчёркнутый текст", difficulty: "easy" },
                { keys: ["Ctrl", "Shift", "D"], description: "Двойное подчёркивание", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "W"], description: "Подчёркивание слов", difficulty: "hard" },
                { keys: ["Ctrl", "D"], description: "Шрифт (диалоговое окно)", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "A"], description: "Все заглавные", difficulty: "medium" },
                { keys: ["Shift", "F3"], description: "Изменить регистр", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", ">"], description: "Увеличить размер шрифта", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "<"], description: "Уменьшить размер шрифта", difficulty: "medium" },
                { keys: ["Ctrl", "]"], description: "Увеличить шрифт на 1 пт", difficulty: "medium" },
                { keys: ["Ctrl", "["], description: "Уменьшить шрифт на 1 пт", difficulty: "medium" },
                { keys: ["Ctrl", "Space"], description: "Очистить форматирование", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "K"], description: "Малые заглавные", difficulty: "hard" },

                // Выравнивание
                { keys: ["Ctrl", "L"], description: "Выровнять по левому краю", difficulty: "medium" },
                { keys: ["Ctrl", "E"], description: "Выровнять по центру", difficulty: "medium" },
                { keys: ["Ctrl", "R"], description: "Выровнять по правому краю", difficulty: "medium" },
                { keys: ["Ctrl", "J"], description: "Выровнять по ширине", difficulty: "medium" },

                // Абзацы и отступы
                { keys: ["Ctrl", "M"], description: "Увеличить отступ", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "M"], description: "Уменьшить отступ", difficulty: "medium" },
                { keys: ["Ctrl", "T"], description: "Создать висячий отступ", difficulty: "hard" },
                { keys: ["Ctrl", "Shift", "T"], description: "Уменьшить висячий отступ", difficulty: "hard" },
                { keys: ["Ctrl", "1"], description: "Одинарный интервал", difficulty: "medium" },
                { keys: ["Ctrl", "2"], description: "Двойной интервал", difficulty: "medium" },
                { keys: ["Ctrl", "5"], description: "Полуторный интервал", difficulty: "medium" },
                { keys: ["Ctrl", "0"], description: "Добавить/удалить интервал перед абзацем", difficulty: "hard" },

                // Вставка
                { keys: ["Ctrl", "Enter"], description: "Вставить разрыв страницы", difficulty: "medium" },
                { keys: ["Shift", "Enter"], description: "Разрыв строки", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "Enter"], description: "Разрыв колонки", difficulty: "hard" },
                { keys: ["Ctrl", "K"], description: "Вставить гиперссылку", difficulty: "medium" },
                { keys: ["Alt", "Shift", "D"], description: "Вставить дату", difficulty: "medium" },
                { keys: ["Alt", "Shift", "T"], description: "Вставить время", difficulty: "medium" },
                { keys: ["Ctrl", "F9"], description: "Вставить поле", difficulty: "hard" },

                // Навигация
                { keys: ["Ctrl", "Home"], description: "В начало документа", difficulty: "easy" },
                { keys: ["Ctrl", "End"], description: "В конец документа", difficulty: "easy" },
                { keys: ["Ctrl", "←"], description: "На слово влево", difficulty: "medium" },
                { keys: ["Ctrl", "→"], description: "На слово вправо", difficulty: "medium" },
                { keys: ["Ctrl", "↑"], description: "На абзац вверх", difficulty: "medium" },
                { keys: ["Ctrl", "↓"], description: "На абзац вниз", difficulty: "medium" },
                { keys: ["Ctrl", "G"], description: "Перейти к странице", difficulty: "medium" },
                { keys: ["Shift", "F5"], description: "Вернуться к последнему изменению", difficulty: "hard" },

                // Выделение
                { keys: ["Ctrl", "Shift", "Home"], description: "Выделить до начала документа", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "End"], description: "Выделить до конца документа", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "←"], description: "Выделить слово слева", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "→"], description: "Выделить слово справа", difficulty: "medium" },
                { keys: ["F8"], description: "Расширенное выделение", difficulty: "hard" },
                { keys: ["Shift", "F8"], description: "Уменьшить выделение", difficulty: "hard" },

                // Работа с таблицами
                { keys: ["Tab"], description: "Следующая ячейка таблицы", difficulty: "easy" },
                { keys: ["Shift", "Tab"], description: "Предыдущая ячейка таблицы", difficulty: "easy" },
                { keys: ["Alt", "Home"], description: "Первая ячейка в строке", difficulty: "medium" },
                { keys: ["Alt", "End"], description: "Последняя ячейка в строке", difficulty: "medium" },
                { keys: ["Alt", "Page Up"], description: "Первая ячейка в столбце", difficulty: "medium" },
                { keys: ["Alt", "Page Down"], description: "Последняя ячейка в столбце", difficulty: "medium" },

                // Стили и форматирование
                { keys: ["Ctrl", "Shift", "S"], description: "Применить стиль", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "N"], description: "Обычный стиль", difficulty: "medium" },
                { keys: ["Alt", "Ctrl", "1"], description: "Заголовок 1", difficulty: "medium" },
                { keys: ["Alt", "Ctrl", "2"], description: "Заголовок 2", difficulty: "medium" },
                { keys: ["Alt", "Ctrl", "3"], description: "Заголовок 3", difficulty: "medium" },

                // Дополнительные команды
                { keys: ["F7"], description: "Проверка правописания", difficulty: "easy" },
                { keys: ["Shift", "F7"], description: "Тезаурус", difficulty: "medium" },
                { keys: ["F4"], description: "Повторить последнее действие", difficulty: "medium" },
                { keys: ["Alt", "F8"], description: "Макросы", difficulty: "hard" },
                { keys: ["Ctrl", "Q"], description: "Удалить форматирование абзаца", difficulty: "hard" },
                { keys: ["Ctrl", "Shift", "C"], description: "Копировать формат", difficulty: "medium" },
                { keys: ["Ctrl", "Shift", "V"], description: "Вставить формат", difficulty: "medium" }
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
