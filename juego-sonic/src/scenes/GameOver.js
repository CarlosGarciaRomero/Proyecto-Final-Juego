import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor() {
        super('GameOver');
    }

    preload() {
        this.load.image('gameOver', 'assets/Game_Over.png');
        this.load.audio('deathMusic', 'assets/music/Game_Over.mp3');
    }

    create() {
        this.add.image(0, 0 , 'gameOver').setOrigin(0, 0).scale = 1.95;
        
        this.winMusic = this.sound.add('deathMusic', { loop: true, volume: 0.1 });
        this.sound.stopByKey('musica_fondo');
        this.winMusic.play();

        this.input.on('pointerdown', () => {
            this.sound.stopByKey('deathMusic');
            this.scene.start('Game');
        });
    }

    update() {

    }
}
