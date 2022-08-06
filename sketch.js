let font
let tileSize
let gridSize
let board = []
let maxValue = 0
const primeSet = new Set()
let primeTxt
let nextTile = 4
let moved = false

function preload() {
    font = loadFont('roboto-mono/RobotoMono-Medium.ttf')
    primeTxt = loadStrings("prime_list.txt")
}

let canvas

function setup() {
    primeTxt.forEach(n => {
        primeSet.add(parseInt(n))
    });

    canvas = createCanvas(window.innerWidth, window.innerHeight)
    canvas.position(0, 0)
    tileSize = Math.max(width, height) / 10
    gridSize = tileSize * 1.1

    for (let i = 0; i < 4; i++) {
        board[i] = []
    }

    for (let i = 0; i < 3; i++) {
        spawnRandomTile()
    }
}

function windowResized() {
    canvas = createCanvas(window.innerWidth, window.innerHeight)
    canvas.position(0, 0)
    tileSize = Math.max(width, height) / 10
    gridSize = tileSize * 1.1
}

function draw() {
    colorMode(RGB)
    background(51)
    rectMode(CENTER)
    fill(150)
    rect(width / 2, height / 2, gridSize * 4, gridSize * 4, gridSize / 5)
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            fill(220)
            noStroke()
            rect(width / 2 - 1.5 * gridSize + c * gridSize, height / 2 - 1.5 * gridSize + r * gridSize, tileSize, tileSize, tileSize / 5)
        }
    }


    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
                board[r][c].show()
                maxValue = Math.max(maxValue, board[r][c].v)
            }
        }
    }

    fill(255)
    textAlign(CENTER, CENTER)
    if (width > height) {
        textSize(width / 30)
        text("next:\n" + nextTile, width / 7, height / 2)
    } else {
        textSize(height / 35)
        text("next:\n" + nextTile, width / 2, height / 5)
    }
}

let startX, startY
let moveTheshold = 30

function touchStarted() {
    startX = mouseX
    startY = mouseY
    return
}

function touchEnded() {
    dx = mouseX - startX
    dy = mouseY - startY
    if (dx * dx + dy * dy > moveTheshold * moveTheshold) {
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) { //left to right
                right()
            } else {
                left()
            }
        } else {
            if (dy > 0) { //top to bottom
                down()
            } else {
                up()
            }
        }
    }

    if (moved) {
        spawnRandomTile()
        moved = false
    }
    return
}

function touchMoved() { //prevent dragging the screen on mobile
    return false;
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        up()
    } else if (keyCode == RIGHT_ARROW) {
        right()
    } else if (keyCode == DOWN_ARROW) {
        down()
    } else if (keyCode == LEFT_ARROW) {
        left()
    }

    if (moved) {
        spawnRandomTile()
        moved = false
    }
}


function addNewTile(r, c, v, s) {
    let tile = new Tile(r, c, v, s)
    board[r][c] = tile
}

function spawnRandomTile() {
    let openR = []
    let openC = []
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (!board[r][c]) {
                openR.push(r)
                openC.push(c)
            }
        }
    }

    let randI = parseInt(random(0, openR.length))
    // console.log(openR[randI], openC[randI])
    addNewTile(openR[randI], openC[randI], nextTile, tileSize / 2)
    nextTile = parseInt(random(1, 10))
}

function canCombine(a, b) {
    return a == b || primeSet.has(a) || primeSet.has(b)
}
