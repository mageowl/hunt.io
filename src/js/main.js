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

    Extends: Phaser.GameObjects.Image,

    initialize:

        function Laser(scene, x, y) {
            Phaser.GameObjects.Image.call(this, scene);

            this.setTexture(playerProj);
            this.setPosition(x, y);
            this.setScale(3);
            this.angle = playerDir
        }

})

function create() {
    player = this.physics.add.image(400, 100, playerSkin)
    this.input.on('pointermove', function (cursor) {
        playerDir = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x, player.y, cursor.x, cursor.y)) + 90
        player.angle = playerDir
    }, this)
    this.input.on('pointerdown', function (pointer) {

        console.log('down');

        lasers.add(new Laser(this, player.x, player.y))

    }, this)

    lasers = this.add.container(0, 0)
}

function update() {
    lasers.list.forEach((obj) => {
        obj.x += (Math.sin(obj.angle) * 10)
        obj.y += (Math.cos(obj.angle) * 10)
    })
}