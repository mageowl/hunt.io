
class Laser extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, playerProj)

        this.setScale(2)
        this.angle = playerDir
    }

}

class Enemy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "zombie")

        this.setScale(0.5)
       scene.physics.world.enable(this)
    }

    tick(player) {
        // Calc angle
        let angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y)) + 90
        this.angle = angle
    }
}