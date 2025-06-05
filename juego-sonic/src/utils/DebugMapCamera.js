export class DebugMapCamera {
    scene;
    controls;
    debugCoords;

    constructor(scene) {
        this.scene = scene;
        this.debugCoords = scene.add.text(0, 0, "").setScrollFactor(0);
        const cursors = scene.input.keyboard.createCursorKeys();
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: scene.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5,
        });
    }

    update(time, delta) {
        this.controls.update(delta);
        this.debugCoords.setText([
            `x: ${this.scene.cameras.main.scrollX}`,
            `y: ${this.scene.cameras.main.scrollY}`
        ]);
    }
}

export default DebugMapCamera;