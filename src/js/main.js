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
            Phaser.GameObjects.Sprite.call(this, scene);

            this.setTexture(playerProj);
            this.setPosition(x, y);
            this.setScale(3);
            this.angle = playerDir

            this.targetX = mX
            this.targetY = mY
        }

})

function create() {
    player = this.physics.add.sprite(400, 100, playerSkin)
    this.input.on('pointermove', function (cursor) {
        playerDir = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y)) + 90
        player.angle = playerDir
        mX = cursor.x
        mY = cursor.y
    }, this)
    this.input.on('pointerdown', function (pointer) {

        console.log('down');

        lasers.add(new Laser(this, player.x, player.y))

    }, this)

    lasers = this.add.container(0, 0)
}

function update() {
    lasers.list.forEach((obj) => {
        this.physics.moveTo(obj, obj.targetX, obj.targetY, 500)
    })
}