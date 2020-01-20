const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload,
        create
    }
}

const game = new Phaser.Game(config)

const skins = [
    "alex"
]

let playerSkin = "alex-player"
let playerProj = "alex-laser"
let playerDir = 90

let player
let lasers


function preload() {
    skins.forEach(skin => {
        this.load.image(skin + "-player", `./recources/image/players/${skin}/player.png`)
        this.load.image(skin + "-laser", `./recources/image/players/${skin}/laser.png`)
    });
}

class Laser extends Phaser.Physics.Arcade.Image {
    constructor(damage, angle, x, y) {
        super(game.scene.getIndex(0), x, y, playerProj)
        this.damage = damage
        this.angle = angle
        lasers.add(this)
    }
}

function create() {
    player = this.physics.add.image(400, 100, playerSkin)
    this.input.on('pointermove', function (cursor) {
        playerDir = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y)) + 90
        player.angle = playerDir
    }, this)

    lasers = this.add.container(0, 0)
}

function update() {
    switch (this.input.activePointer.button) {
        case 1:
            // Player is firing laser
            let laser = new Laser(1, playerDir, player.x, player.y)
    }
}