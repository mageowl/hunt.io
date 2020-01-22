const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
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
let enemyLaserColl


function preload() {
    this.load.image("zombie", `./src/image/enemies/lvl1.png`)
    skins.forEach(skin => {
        this.load.image(skin + "-player", `./src/image/players/${skin}/player.png`)
        this.load.image(skin + "-laser", `./src/image/players/${skin}/laser.png`)
    })
}

function create() {
    player = this.physics.add.sprite(400, 100, playerSkin)

    player.setScale(0.5)
    player.depth = 1
    player.setCollideWorldBounds(true)
    this.input.on('pointermove', function (cursor) {
        // Locate mouse
        mX = cursor.x
        mY = cursor.y
    }, this)
    this.input.on('pointerdown', function (pointer) {
        // Player is firing
        let laser = lasers.create(player.x, player.y)
        this.physics.world.enable(laser)
        this.physics.velocityFromAngle(playerDir + 90, 500, laser.body.velocity)

    }, this)

    lasers = this.add.group({classType: Laser})

    wads = this.input.keyboard.addKeys('W,A,D,S')

    enemies = this.add.container(0, 0)
    enemyLaserColl = this.physics.add.collider(lasers, enemies, enemyHit, null)

    enemy1 = enemies.add(new Enemy(this, 100, 100))
}

function update() {
    lasers.list.forEach((obj) => {
        if (obj.x > 800 || obj.y > 600 || obj.x < 0 || obj.y < 0) {
            obj.destroy()
        }
    })

    player.setVelocity(0)
    player.setVelocityX(((wads.D.isDown) + -(wads.A.isDown)) * 100)
    player.setVelocityY(((wads.S.isDown) + -(wads.W.isDown)) * 100)

    // Calc player angle
    playerDir = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(player.x, player.y, mX, mY)) + 90
    player.angle = playerDir

    // Enemy AI
    enemies.list.forEach((obj) => {
        obj.tick(player)
    })

}

function enemyHit() {
    console.log("HIT")
}