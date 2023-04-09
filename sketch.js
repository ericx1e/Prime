let font
let tileSize
let gridSize
let board = []
let maxValue = 0
const primeSet = new Set()
let primeTxt
let nextTile = 4
let moved = false
let score = 0
let gameover = false
let sum = 0
let popup
let buttons

const shadowN = 7
let shadowTransform = { x: 0, y: 0 }

function preload() {
    font = loadFont('roboto-mono/RobotoMono-Medium.ttf')
    primeTxt = loadStrings("prime_list.txt")
}

let canvas

function setup() {
    primeTxt.forEach(n => {
        primeSet.add(parseInt(n))
    })

    canvas = createCanvas(window.innerWidth, window.innerHeight)
    canvas.position(0, 0)
    tileSize = Math.max(width, height) / 10
    gridSize = tileSize * 1.1
    shadowTransform = { x: gridSize / 100, y: gridSize / 100 }

    for (let i = 0; i < 4; i++) {
        board[i] = []
    }

    for (let i = 0; i < 3; i++) {
        spawnRandomTile()
    }

    // popup = new Popup("tutorial")

    buttons = []
    buttons.push(new Button(tileSize * 0.7, height - tileSize * 0.7, tileSize, "tutorial"))
}

function windowResized() {
    canvas = createCanvas(window.innerWidth, window.innerHeight)
    canvas.position(0, 0)
    tileSize = Math.max(width, height) / 10
    gridSize = tileSize * 1.1

    buttons = []
    buttons.push(new Button(tileSize * 0.7, height - tileSize * 0.7, tileSize, "tutorial"))
}

function reset() {
    gameover = false
    for (let i = 0; i < 4; i++) {
        board[i] = []
    }

    nextTile = 4
    score = 0
    sum = 0
    maxValue = 0
    for (let i = 0; i < 3; i++) {
        spawnRandomTile()
    }
}

function draw() {
    colorMode(RGB)
    background(51)
    rectMode(CENTER)
    fill(120)
    for (let i = 0; i < shadowN; i++) {
        rect(width / 2 + i * shadowTransform.x, height / 2 + i * shadowTransform.y, gridSize * 4, gridSize * 4, gridSize / 5)
    }
    fill(150)
    rect(width / 2, height / 2, gridSize * 4, gridSize * 4, gridSize / 5)
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            fill(220)
            noStroke()
            rect(width / 2 - 1.5 * gridSize + c * gridSize, height / 2 - 1.5 * gridSize + r * gridSize, tileSize, tileSize, tileSize / 5)
        }
    }

    loseText = "LOSEPLAYAGAIN?OK"
    if (gameover) {
        noStroke()
        textFont(font)
        textAlign(CENTER, CENTER)
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (r == 3 && (c == 2 || c == 3)) {
                    if (mouseTouchingGridAt(r, c)) {
                        if (mouseIsPressed) {
                            reset()
                        }
                        fill(20, 230, 40, 100)
                    } else {
                        fill(50, 250, 70, 100)
                    }
                    rect(width / 2 - 1.5 * gridSize + c * gridSize, height / 2 - 1.5 * gridSize + r * gridSize, tileSize, tileSize, tileSize / 5)
                    if (mouseTouchingGridAt(r, c)) {
                        fill(20, 170, 40)
                    } else {
                        fill(50, 200, 70)
                    }
                } else {
                    fill(0)
                }
                text(loseText.charAt(r * 4 + c), width / 2 - 1.5 * gridSize + c * gridSize, height / 2 - 1.5 * gridSize + r * gridSize)
            }
        }
    }


    score = 0
    sum = 0
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let cur = board[r][c]
            if (cur) {
                cur.show()
                maxValue = Math.max(maxValue, cur.v)
                score += cur.v * cur.v
                sum += cur.v
            }
        }
    }
    score = parseInt(Math.sqrt(score))

    fill(255)
    textAlign(CENTER, CENTER)
    if (width > height) {
        textSize(width / 30)
        text("next:\n" + nextTile, width / 7, height / 2)
        text("score:\n" + score, width * 6 / 7, height / 2)
    } else {
        textSize(height / 35)
        text("next:\n" + nextTile, width / 2, height / 5)
        text("score:\n" + score, width / 2, height * 4 / 5)
    }

    buttons.forEach(button => {
        button.show()
    })

    if (popup) {
        popup.show()
    }
}

function mouseTouchingGridAt(r, c) {
    let x = width / 2 - 1.5 * gridSize + c * gridSize
    let y = height / 2 - 1.5 * gridSize + r * gridSize
    return mouseX > x - tileSize / 2 && mouseX < x + tileSize / 2 && mouseY > y - tileSize / 2 && mouseY < y + tileSize / 2
}

let startX, startY
let moveTheshold = 30

function touchStarted() {
    if (popup) {
        popup.onClick()
        return
    }

    for (let i = 0; i < buttons.length; i++) {
        button = buttons[i]
        if (button.touchingMouse()) {
            button.onClick()
            startX = undefined
            startY = undefined
            return
        }
    }

    startX = mouseX
    startY = mouseY
    return
}

function touchEnded() {
    if (popup) {
        return
    }
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
        spawnRandomTile(moved)
        moved = false
    }
    return
}

function touchMoved() { //prevent dragging the screen on mobile
    return false;
}

function keyPressed() {
    if (popup) {
        return
    }

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
        spawnRandomTile(moved)
        moved = false
    }
}


function addNewTile(r, c, v, s, combined) {
    let tile = new Tile(r, c, v, s)
    if (combined) {
        tile.combining = true
    }
    board[r][c] = tile
}

function spawnRandomTile(dir) {
    let openR = []
    let openC = []
    let finalR
    let finalC
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (!board[r][c]) {
                openR.push(r)
                openC.push(c)
            }
        }
    }

    if (dir) {
        let randI
        switch (dir) {
            case 'up':
                indices = findAllIndices(openR, 3)
                randI = indices[parseInt(random(0, indices.length))]
                finalR = 3
                finalC = openC[randI]
                break
            case 'right':
                indices = findAllIndices(openC, 0)
                randI = indices[parseInt(random(0, indices.length))]
                finalR = openR[randI]
                finalC = 0
                break
            case 'down':
                indices = findAllIndices(openR, 0)
                randI = indices[parseInt(random(0, indices.length))]
                finalR = 0
                finalC = openC[randI]
                break
            case 'left':
                indices = findAllIndices(openC, 3)
                randI = indices[parseInt(random(0, indices.length))]
                finalR = openR[randI]
                finalC = 3
                break
        }
    } else {
        let randI = parseInt(random(0, openR.length))
        // console.log(openR[randI], openC[randI])
        finalR = openR[randI]
        finalC = openC[randI]
    }
    addNewTile(finalR, finalC, nextTile, tileSize / 2)
    gameover = checkLose()
    // console.log(parseInt(Math.pow(sum, 0.4)), parseInt(Math.pow(sum, 0.5)))
    let v = parseInt(random(2, Math.max(parseInt(Math.pow(sum, 0.4)), 10)))
    if (v > 9 && v % 2 == 0) {
        v++
    }
    nextTile = v
}

function canCombine(a, b) {
    return a == b || primeSet.has(a) || primeSet.has(b)
}

function findAllIndices(array, element) {
    result = []
    let i = array.indexOf(element)
    while (i != -1) {
        result.push(i)
        i = array.indexOf(element, i + 1)
    }

    return result
}

function checkLose() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (!board[r][c]) {
                return false
            }
            if (r > 0 && board[r - 1][c] && canCombine(board[r][c].v, board[r - 1][c].v)) {
                return false
            }
            if (r < 3 && board[r + 1][c] && canCombine(board[r][c].v, board[r + 1][c].v)) {
                return false
            }
            if (c > 0 && board[r][c - 1] && canCombine(board[r][c].v, board[r][c - 1].v)) {
                return false
            }
            if (c < 3 && board[r][c + 1] && canCombine(board[r][c].v, board[r][c + 1].v)) {
                return false
            }
        }
    }
    return true
}