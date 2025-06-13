import { Scene } from 'phaser';
import { findObjectsByClassInObjectsLayer } from '../utils/utils.js';
import Player from '../characters/Player.js';

export class Game extends Scene {
    constructor ()
    {
        super('Game');
    }

    preload () {
        
        // ======== MAPA Y FONDO ========
        this.load.image('background', 'assets/fondo.png');
        this.load.tilemapTiledJSON('mapa', 'assets/mapa/mapa.json');
        
        // ======== ASSETS DE TILESETS =======
        this.load.spritesheet('tiles-1', 'assets/tiles/Sunset_Hill_Act_1_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('tiles-fabrica-1', 'assets/tiles/Cyber_Track_Act_1_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('tiles-fabrica-2', 'assets/tiles/Cyber_Track_Act_2_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('tiles-Andamios-1', 'assets/tiles/Route_99_Act_1_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('tiles-Andamios-2', 'assets/tiles/Route_99_Act_2_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('tiles-Templo-Fabrica-1', 'assets/tiles/Chaos_Angel_Act_1_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });        
        this.load.spritesheet('tiles-Templo-Fabrica-2', 'assets/tiles/Chaos_Angel_Act_2_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });

        // ======== IMAGEN META Y MUERTE ========
        this.load.image('goal', 'assets/master_emerald.png');
        this.load.image('death', 'assets/void.gif');       

        // ======== MUSICA ========
        this.load.audio('musica_fondo', 'assets/music/Sunset Hill Zone_ Map.mp3');

    }

    create ()
    {
        // ======== CONFIGURACION SCROLL Y FONDO ========
        this.bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setDepth(-3);
        this.bg.setScrollFactor(0);

        // ======== CREACION DEL TILEMAP ========
        const map = this.make.tilemap({ key: 'mapa' });

        // ======== ASIGNACION DE TILESETS ========
        const tileset = map.addTilesetImage('Sunset_Hill_Act_1_Tile_Sheet', 'tiles-1');
        const tileset2 = map.addTilesetImage('Cyber_Track_Act_1_Tile_Sheet', 'tiles-fabrica-1');
        const tileset3 = map.addTilesetImage('Cyber_Track_Act_2_Tile_Sheet', 'tiles-fabrica-2');
        const tileset4 = map.addTilesetImage('Route_99_Act_1_Tile_Sheet', 'tiles-Andamios-1');
        const tileset5 = map.addTilesetImage('Route_99_Act_2_Tile_Sheet', 'tiles-Andamios-2');
        const tileset6 = map.addTilesetImage('Chaos_Angel_Act_1_Tile_Sheet', 'tiles-Templo-Fabrica-1');
        const tileset7 = map.addTilesetImage('Chaos_Angel_Act_2_Tile_Sheet', 'tiles-Templo-Fabrica-2');
        const alturaMapa = -358;

        // ======== MAPEADO ========
        this.Frente = map.createLayer('Frente', [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7], 0, alturaMapa).setDepth(1);
        this.Terreno = map.createLayer('Terreno', [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7], 0, alturaMapa);
        this.Fondo = map.createLayer('Fondo', [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7], 0, alturaMapa).setDepth(-1);
        this.fondoLejano = map.createLayer('Fondo_Lejano', [tileset, tileset2, tileset3, tileset4, tileset5, tileset6, tileset7], 0, alturaMapa).setDepth(-2);

        // ======== MUSICA ========
        this.backgroundMusic = this.sound.add('musica_fondo', { loop: true, volume: 0.01 });
        this.backgroundMusic.play();

        //======= PLAYER ========

        const playersFromTiled = findObjectsByClassInObjectsLayer('player', map);
        this.player = new Player(
            this,
            playersFromTiled[0].x,
            playersFromTiled[0].y -350
        );

        //======= META ========
        const goalFromTiled = findObjectsByClassInObjectsLayer('goal', map)[0];
        this.putCheckPoint(goalFromTiled.x, goalFromTiled.y - 350, 'goal');

        //======= MUERTE ========
        const deathFromTiled = findObjectsByClassInObjectsLayer('death', map)[0];

        const deathVoid = this.add.image(deathFromTiled.x+4408, deathFromTiled.y - 350, 'death');
        deathVoid.setSize(8816, 84);

        this.putDeathVoid(deathFromTiled.x+4408, deathFromTiled.y - 350, this.deathVoid);


        //======= COLISIONES ========
        this.Terreno.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, this.Terreno);
        
    }

    putCheckPoint(x, y, sprite) {
        const goal = this.physics.add.sprite(x, y, sprite);
        goal.body.immovable = true;
        goal.body.moves = false;
        goal.setSize(48, 48);
        this.physics.add.overlap(
            this.player,
            goal,
            () => this.scene.start('Win'),
            null,
            this
        );
    }

    //======= COLISIONES MUERTE ========
    putDeathVoid(x, y, sprite){
        const death = this.physics.add.sprite(x, y, sprite);
        death.body.immovable = true;
        death.body.moves = false;
        death.setSize(8816, 392);
        this.physics.add.overlap(
            this.player,
            death,
            () => this.scene.start('GameOver'),
            null,
            this
        );
    }

    update(){
        this.player.update();

        //===== CONFIGURACIONES DE CAMARA =====

        this.cameras.main.scrollY = this.player.y - 733;
        if (this.player.x <= 415) {
            this.cameras.main.scrollX = 0;
            
        } else {
            this.cameras.main.scrollX = this.player.x - 415;
        }     
    }
}
