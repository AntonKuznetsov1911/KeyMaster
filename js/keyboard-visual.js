// Визуальная клавиатура
class VisualKeyboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.keyElements = {};
        this.layout = this.getKeyboardLayout();
        this.render();
    }

    getKeyboardLayout() {
        // Раскладка клавиатуры (упрощённая QWERTY)
        return [
            [
                { key: 'Esc', code: 'Escape', width: 1 },
                { key: 'F1', code: 'F1', width: 1 },
                { key: 'F2', code: 'F2', width: 1 },
                { key: 'F3', code: 'F3', width: 1 },
                { key: 'F4', code: 'F4', width: 1 },
                { key: 'F5', code: 'F5', width: 1 },
                { key: 'F6', code: 'F6', width: 1 },
                { key: 'F7', code: 'F7', width: 1 },
                { key: 'F8', code: 'F8', width: 1 },
                { key: 'F9', code: 'F9', width: 1 },
                { key: 'F10', code: 'F10', width: 1 },
                { key: 'F11', code: 'F11', width: 1 },
                { key: 'F12', code: 'F12', width: 1 }
            ],
            [
                { key: '`', code: 'Backquote', width: 1 },
                { key: '1', code: 'Digit1', width: 1 },
                { key: '2', code: 'Digit2', width: 1 },
                { key: '3', code: 'Digit3', width: 1 },
                { key: '4', code: 'Digit4', width: 1 },
                { key: '5', code: 'Digit5', width: 1 },
                { key: '6', code: 'Digit6', width: 1 },
                { key: '7', code: 'Digit7', width: 1 },
                { key: '8', code: 'Digit8', width: 1 },
                { key: '9', code: 'Digit9', width: 1 },
                { key: '0', code: 'Digit0', width: 1 },
                { key: '-', code: 'Minus', width: 1 },
                { key: '=', code: 'Equal', width: 1 },
                { key: 'Backspace', code: 'Backspace', width: 2 }
            ],
            [
                { key: 'Tab', code: 'Tab', width: 1.5 },
                { key: 'Q', code: 'KeyQ', width: 1 },
                { key: 'W', code: 'KeyW', width: 1 },
                { key: 'E', code: 'KeyE', width: 1 },
                { key: 'R', code: 'KeyR', width: 1 },
                { key: 'T', code: 'KeyT', width: 1 },
                { key: 'Y', code: 'KeyY', width: 1 },
                { key: 'U', code: 'KeyU', width: 1 },
                { key: 'I', code: 'KeyI', width: 1 },
                { key: 'O', code: 'KeyO', width: 1 },
                { key: 'P', code: 'KeyP', width: 1 },
                { key: '[', code: 'BracketLeft', width: 1 },
                { key: ']', code: 'BracketRight', width: 1 },
                { key: '\\', code: 'Backslash', width: 1.5 }
            ],
            [
                { key: 'Caps', code: 'CapsLock', width: 1.75 },
                { key: 'A', code: 'KeyA', width: 1 },
                { key: 'S', code: 'KeyS', width: 1 },
                { key: 'D', code: 'KeyD', width: 1 },
                { key: 'F', code: 'KeyF', width: 1 },
                { key: 'G', code: 'KeyG', width: 1 },
                { key: 'H', code: 'KeyH', width: 1 },
                { key: 'J', code: 'KeyJ', width: 1 },
                { key: 'K', code: 'KeyK', width: 1 },
                { key: 'L', code: 'KeyL', width: 1 },
                { key: ';', code: 'Semicolon', width: 1 },
                { key: "'", code: 'Quote', width: 1 },
                { key: 'Enter', code: 'Enter', width: 2.25 }
            ],
            [
                { key: 'Shift', code: 'ShiftLeft', width: 2.25 },
                { key: 'Z', code: 'KeyZ', width: 1 },
                { key: 'X', code: 'KeyX', width: 1 },
                { key: 'C', code: 'KeyC', width: 1 },
                { key: 'V', code: 'KeyV', width: 1 },
                { key: 'B', code: 'KeyB', width: 1 },
                { key: 'N', code: 'KeyN', width: 1 },
                { key: 'M', code: 'KeyM', width: 1 },
                { key: ',', code: 'Comma', width: 1 },
                { key: '.', code: 'Period', width: 1 },
                { key: '/', code: 'Slash', width: 1 },
                { key: 'Shift', code: 'ShiftRight', width: 2.75 }
            ],
            [
                { key: 'Ctrl', code: 'ControlLeft', width: 1.5 },
                { key: 'Win', code: 'MetaLeft', width: 1.25 },
                { key: 'Alt', code: 'AltLeft', width: 1.25 },
                { key: 'Space', code: 'Space', width: 6 },
                { key: 'Alt', code: 'AltRight', width: 1.25 },
                { key: 'Win', code: 'MetaRight', width: 1.25 },
                { key: 'Ctrl', code: 'ControlRight', width: 1.5 }
            ],
            [
                { key: '↑', code: 'ArrowUp', width: 1 },
                { key: '↓', code: 'ArrowDown', width: 1 },
                { key: '←', code: 'ArrowLeft', width: 1 },
                { key: '→', code: 'ArrowRight', width: 1 },
                { key: 'Del', code: 'Delete', width: 1 },
                { key: 'PgUp', code: 'PageUp', width: 1 },
                { key: 'PgDn', code: 'PageDown', width: 1 }
            ]
        ];
    }

    render() {
        this.container.innerHTML = '';

        this.layout.forEach((row, rowIndex) => {
            const rowElement = document.createElement('div');
            rowElement.className = 'keyboard-row';

            row.forEach(keyConfig => {
                const keyElement = document.createElement('div');
                keyElement.className = 'keyboard-key';
                keyElement.style.width = `calc(${keyConfig.width * 3.5}em)`;
                keyElement.textContent = keyConfig.key;
                keyElement.dataset.code = keyConfig.code;
                keyElement.dataset.key = keyConfig.key;

                // Сохраняем ссылку на элемент для дальнейшей подсветки
                const keyId = this.getKeyId(keyConfig.code, keyConfig.key);
                this.keyElements[keyId] = keyElement;

                rowElement.appendChild(keyElement);
            });

            this.container.appendChild(rowElement);
        });
    }

    getKeyId(code, key) {
        return code || key;
    }

    // Подсветить клавишу
    highlightKey(key, type = 'pressed') {
        // Найти элемент клавиши
        const keyElement = this.findKeyElement(key);

        if (keyElement) {
            keyElement.classList.remove('key-pressed', 'key-expected', 'key-correct', 'key-wrong');
            keyElement.classList.add(`key-${type}`);
        }
    }

    // Найти элемент клавиши по названию
    findKeyElement(keyName) {
        // Нормализация названия клавиши
        const normalized = this.normalizeKeyName(keyName);

        // Поиск по различным вариантам
        for (let [id, element] of Object.entries(this.keyElements)) {
            const elementKey = element.dataset.key.toUpperCase();
            const elementCode = element.dataset.code;

            if (elementKey === normalized ||
                elementCode === normalized ||
                id.toUpperCase() === normalized) {
                return element;
            }
        }

        return null;
    }

    normalizeKeyName(key) {
        const normMap = {
            'CONTROL': 'CTRL',
            'CONTROLLEFT': 'CTRL',
            'CONTROLRIGHT': 'CTRL',
            'META': 'WIN',
            'METALEFT': 'WIN',
            'METARIGHT': 'WIN',
            'COMMAND': 'WIN',
            'SHIFTLEFT': 'SHIFT',
            'SHIFTRIGHT': 'SHIFT',
            'ALTLEFT': 'ALT',
            'ALTRIGHT': 'ALT',
            'ARROWUP': '↑',
            'ARROWDOWN': '↓',
            'ARROWLEFT': '←',
            'ARROWRIGHT': '→',
            'DELETE': 'DEL',
            'PAGEUP': 'PGUP',
            'PAGEDOWN': 'PGDN',
            'CAPSLOCK': 'CAPS'
        };

        const upperKey = key.toUpperCase();
        return normMap[upperKey] || upperKey;
    }

    // Подсветить ожидаемые клавиши
    highlightExpectedKeys(keys) {
        this.clearAllHighlights();
        keys.forEach(key => {
            this.highlightKey(key, 'expected');
        });
    }

    // Показать правильные/неправильные клавиши
    showResult(pressedKeys, expectedKeys, isCorrect) {
        if (isCorrect) {
            expectedKeys.forEach(key => {
                this.highlightKey(key, 'correct');
            });
        } else {
            pressedKeys.forEach(key => {
                this.highlightKey(key, 'wrong');
            });
        }
    }

    // Очистить все подсветки
    clearAllHighlights() {
        Object.values(this.keyElements).forEach(element => {
            element.classList.remove('key-pressed', 'key-expected', 'key-correct', 'key-wrong');
        });
    }

    // Обработчик нажатия клавиши
    onKeyDown(event) {
        const key = event.key;
        this.highlightKey(key, 'pressed');
    }

    // Обработчик отпускания клавиши
    onKeyUp(event) {
        const key = event.key;
        const keyElement = this.findKeyElement(key);
        if (keyElement) {
            keyElement.classList.remove('key-pressed');
        }
    }
}
