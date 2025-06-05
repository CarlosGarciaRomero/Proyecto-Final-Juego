class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.gravity.y = 600;
        this.body.setMaxVelocity(1000);


        // Escala del jugador y tamaño de hitbox
        this.scale = 1.4;
        this.setFlipX(true);
        this.setSize(45, 53, true);

        // Controlador del jugador
        this.cursor = this.scene.input.keyboard.createCursorKeys();
        this.gamepad;

        // Gamepad
        

    }

    update(){
        // Controles teclado
        this.left = this.cursor.left.isDown;
        this.right = this.cursor.right.isDown;        
        this.up = this.cursor.up.isDown;
        this.down = this.cursor.down.isDown;
        
        // Controles gamepad
        if (this.scene.input.gamepad.total > 0) {
            this.gamepad = this.scene.input.gamepad.getPad(0);
            this.gamepadLeft = this.gamepad.left;
            this.gamepadRight = this.gamepad.right;
            this.gamepadX = this.gamepad.A;
            this.gamepadDown = this.gamepad.down;
        }
        

        // animaciones movimiento y suelo
        this.move();
        this.animate();
        this.onGround = this.body.blocked.down;
    }

    move(){
        // Movimiento
        if (this.left || this.gamepadLeft) {

            this.setAccelerationX(-500);
            this.setFlipX(false);  

        } else if (this.right || this.gamepadRight) {

            this.setAccelerationX(500);
            this.setFlipX(true);
            
        } else if (this.down || this.gamepadDown) {

            
            if (this.body.velocity.x > 0){

                this.setAccelerationX(-200);

            } else if (this.body.velocity.x < 0){

                this.setAccelerationX(200);

                

            } else {

                this.setVelocityX(0);

            }

        } else {
            this.setAccelerationX(0);
            this.setVelocityX(0);
        } 

        // Salto
        if (this.up && this.onGround || this.gamepadX && this.onGround) {

            this.setVelocityY(-820);

        }

        // Rodar
        
    }

    animate(){

        if (this.onGround) {

            if (this.left || this.gamepadLeft || this.right || this.gamepadRight) {

                this.setSize(30, 53, true);

                if (this.body.velocity.x >= 500 || this.body.velocity.x <= -500) {
                    this.anims.play('runningsonic', true);
                } else {
                    this.anims.play('startrunning', true);
                }
                
            } else if (this.down && this.body.velocity.x == 0 || this.gamepadDown && this.body.velocity.x == 0) {

                this.anims.play('crouch', true);
                this.setSize(30, 53, true); 
            
            }else if (this.down && this.body.velocity.x != 0 || this.gamepadDown && this.body.velocity.x != 0) {

                this.anims.play('rolling', true);
                this.setSize(30, 32, true);

            } else {

                this.anims.play('idle', true);
                this.setSize(30, 53, true);

            }    

        } else if (!this.onGround && this.down || this.gamepadDown && !this.onGround) {

            this.anims.play('rolling', true);
            this.setSize(30, 32, true);

        } else {

            this.anims.play('jump', true);
                this.setSize(30, 53, true);

        }
    }
}

export default Player;