
class Laser extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, playerProj)

        this.setScale(2)
        this.angle = playerDir
        scene.physics.world.enable(this)
        scene.physics.add.existing(this)
    }

}

class Enemy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "zombie")

        this.setScale(0.5)
        this.game = scene
        scene.physics.world.enable(this)
        scene.physics.add.existing(this)
    }

    tick(player) {
        // Calc angle
        let angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y)) + 90
        this.angle = angle
        // Velocity from angle
        this.game.physics.velocityFromAngle(angle - 90, 15, this.body.velocity)
    }
}