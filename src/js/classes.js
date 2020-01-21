
class Laser extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, playerProj)

        this.setScale(2)
    }

}

class Enemy extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "zombie")
    }

    tick(player) {
        // Calc angle
        let angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, player.x, player.y)) + 90
        this.angle = angle
    }
}