import { Scene } from 'phaser';
import { findObjectsByClassInObjectsLayer } from '../utils/utils.js';
import Player from '../characters/Player.js';

export class Game extends Scene {
    constructor ()
    {
        super('Game');
    }

    preload () {
        
        this.load.image('background', 'assets/fondo.png');
        this.load.tilemapTiledJSON('mapa', 'assets/mapa/mapa.json');
        this.load.spritesheet('tiles-1', 'assets/tiles/Sunset_Hill_Act_1_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('tiles-fabrica-1', 'assets/tiles/Cyber_Track_Act_1_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('tiles-fabrica-2', 'assets/tiles/Cyber_Track_Act_2_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('tiles-Andamios-1', 'assets/tiles/Route_99_Act_1_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('tiles-Andamios-2', 'assets/tiles/Route_99_Act_2_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet('tiles-Templo-Fabrica-1', 'assets/tiles/Chaos_Angel_Act_1_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });        
        this.load.spritesheet('tiles-Templo-Fabrica-2', 'assets/tiles/Chaos_Angel_Act_2_Tile_Sheet.png', { frameWidth: 48, frameHeight: 48 });
    }

    create ()
    {
        this.bg = this.add.image(0, 0, 'background').setOrigin(0, 0).setDepth(-3);
        this.bg.setScrollFactor(0);

        const map = this.make.tilemap({ key: 'mapa' });
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

        //======= PLAYER ========

        const playersFromTiled = findObjectsByClassInObjectsLayer('player', map);
        this.player = new Player(
            this,
            playersFromTiled[0].x,
            playersFromTiled[0].y -350
        );

        //======= COLISIONES ========
        this.Terreno.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, this.Terreno);
        
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
