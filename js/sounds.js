// Звуковые эффекты для KeyMaster
class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.enabled = true;

        // Инициализация AudioContext при первом взаимодействии
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API не поддерживается');
            this.enabled = false;
        }
    }

    setEnabled(enabled) {
        this.enabled = enabled;
    }

    // Звук правильного ответа
    playCorrect() {
        if (!this.enabled || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Мелодичный звук успеха (C5 -> E5 -> G5)
        oscillator.frequency.setValueAtTime(523.25, now); // C5
        oscillator.frequency.setValueAtTime(659.25, now + 0.1); // E5
        oscillator.frequency.setValueAtTime(783.99, now + 0.2); // G5

        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

        oscillator.start(now);
        oscillator.stop(now + 0.4);
    }

    // Звук неправильного ответа
    playWrong() {
        if (!this.enabled || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Низкий звук ошибки
        oscillator.frequency.setValueAtTime(200, now);
        oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.3);

        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        oscillator.start(now);
        oscillator.stop(now + 0.3);
    }

    // Звук достижения (серия 5, 10, 20)
    playMilestone() {
        if (!this.enabled || !this.audioContext) return;

        const now = this.audioContext.currentTime;

        // Играем восходящую арпеджио
        const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6

        frequencies.forEach((freq, index) => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(freq, now + index * 0.1);
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.25, now + index * 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.3);

            oscillator.start(now + index * 0.1);
            oscillator.stop(now + index * 0.1 + 0.3);
        });
    }

    // Звук нажатия кнопки
    playClick() {
        if (!this.enabled || !this.audioContext) return;

        const now = this.audioContext.currentTime;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(800, now);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        oscillator.start(now);
        oscillator.stop(now + 0.05);
    }

    // Звук завершения тренировки
    playComplete() {
        if (!this.enabled || !this.audioContext) return;

        const now = this.audioContext.currentTime;

        // Победная мелодия
        const melody = [
            { freq: 523.25, time: 0 },    // C5
            { freq: 587.33, time: 0.15 }, // D5
            { freq: 659.25, time: 0.3 },  // E5
            { freq: 783.99, time: 0.45 }, // G5
            { freq: 1046.50, time: 0.6 }  // C6
        ];

        melody.forEach(note => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.setValueAtTime(note.freq, now + note.time);
            oscillator.type = 'triangle';

            gainNode.gain.setValueAtTime(0.3, now + note.time);
            gainNode.gain.exponentialRampToValueAtTime(0.01, now + note.time + 0.4);

            oscillator.start(now + note.time);
            oscillator.stop(now + note.time + 0.4);
        });
    }
}
