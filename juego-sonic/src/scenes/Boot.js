import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload () {

        this.load.spritesheet("player", "/assets/player.png", { frameWidth: 100, frameHeight: 85,  });

        
    }

    create ()
    {
        this.scene.start("Game");
        
        //===== ANIMACIONES =====
        //animacion de empezar a correr
        this.anims.create({
            key: "runningsonic",
            frames: this.anims.generateFrameNumbers ("player", { start: 89, end: 96}),
            frameRate: 24,
            repeat: -1,
            
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers ("player", { start: 0, end: 7}),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers ("player", { start: 160, end: 165}),
            frameRate: 24,
            repeat: -1,
        });

        this.anims.create({
            key: "startrunning",
            frames: this.anims.generateFrameNumbers ("player", { start: 57, end: 88}),
            frameRate: 24,
        });
        
        this.anims.create({
            key: "rolling",
            frames: this.anims.generateFrameNumbers ("player", { start: 266, end: 273}),
            frameRate: 24,
        });

        this.anims.create({
            key: "startSpindash",
            frames: this.anims.generateFrameNumbers ("player", { start: 123, end: 126}),
            frameRate: 12,
        })

        this.anims.create({
            key: "spindash",
            frames: this.anims.generateFrameNumbers ("player", { start: 127, end: 130}),
            frameRate: 12,
            repeat: -1,
        });

        this.anims.create({
            key: "crouch",
            frames: this.anims.generateFrameNumbers ("player", { start: 20, end: 21}),
            frameRate: 4,
            repeat: -1,
            yoyo: true,
        })

        // 123 - 130
        // 127 - 130
    }
}
