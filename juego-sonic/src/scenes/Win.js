export class Win extends Phaser.Scene {
    constructor() {
        super('Win');
    }

    preload() {
        this.load.image('win', 'assets/win.jpeg');
        this.load.audio('winMusic', 'assets/music/sonido_teclado.mp3');
    }

    create() {
        this.add.image(0, 0 , 'win').setOrigin(0, 0).scale = 1.75;
        
        this.winMusic = this.sound.add('winMusic', { loop: true, volume: 0.1 });
        this.sound.stopByKey('musica_fondo');
        this.winMusic.play();

        this.input.on('pointerdown', () => {
            this.sound.stopByKey('winMusic');
            this.scene.start('Game');
        });
    }

    update() {

    }
}