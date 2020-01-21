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
        create,
        update
    }
}

const game = new Phaser.Game(config)

const skins = [
    "alex"
]

let mX
let mY

let playerSkin = "alex-player"
let playerProj = "alex-laser"
let playerDir = 90

let player
let lasers
let wads


function preload() {
    skins.forEach(skin => {
        this.load.image(skin + "-player", `./src/image/players/${skin}/player.png`)
        this.load.image(skin + "-laser", `./src/image/players/${skin}/laser.png`)
    });
}

const Laser = new Phaser.Class({

    Extends: Phaser.GameObjects.Sprite,

    initialize:

        function Laser(scene, x, y) {
            Phaser.GameObjects.Sprite.call(this, scene)

            this.setTexture(playerProj);
            this.setPosition(x, y);
            this.setScale(3);
            this.angle = playerDir
        }

})

function create() {
    player = this.physics.add.sprite(400, 100, playerSkin)
    player.setCollideWorldBounds(true)
    this.input.on('pointermove', function (cursor) {
        playerDir = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y)) + 90
        player.angle = playerDir
        mX = cursor.x
        mY = cursor.y
    }, this)
    this.input.on('pointerdown', function (pointer) {

        console.log('down');

        let laser = new Laser(this, player.x, player.y)
        lasers.add(laser)
        this.physics.world.enable(laser)
        this.physics.moveTo(laser, pointer.x, pointer.y, 500)

    }, this)

    lasers = this.add.container(0, 0)

    wads = this.input.keyboard.addKeys('W,A,D,S')
}

function update() {
    lasers.list.forEach((obj) => {
        if (obj.x > 800 || obj.y > 600 || obj.x < 0 || obj.y < 0) {
            obj.destroy()
        }
    })

    player.setVelocity(0)
    player.setVelocityX(((wads.D.isDown) + -(wads.A.isDown)) * 5)
    player.setVelocityY(((wads.S.isDown) + -(wads.W.isDown)) * 5)

}