let lerpSpeed = 0.35
let gravity = 0.5

function Tile(r, c, v, s) {
    this.r = r
    this.c = c
    this.s = tileSize
    this.v = v
    this.x = width / 2 - 1.5 * gridSize + c * gridSize
    this.y = height / 2 - 1.5 * gridSize + r * gridSize
    this.combining = false;
    this.xv = random(-2, 2)
    this.yv = random(-3, -10)
    this.delay = parseInt(random(60, 180))

    if (s) {
        this.s = s
    } else {
        this.s = tileSize
    }

    this.show = function () {
        colorMode(HSB)
        hue = map(this.v, 0, maxValue, 255, 20)
        fill(hue, 70, 90)
        if (this.combining) {
            noStroke()
            rect(width / 2 - 1.5 * gridSize + this.c * gridSize, height / 2 - 1.5 * gridSize + this.r * gridSize, this.s, this.s, this.s / 5)
        }
        if (primeSet.has(this.v)) {
            strokeWeight(this.s / 15)
            stroke(255)
        } else {
            noStroke()
        }
        rect(this.x, this.y, this.s, this.s, this.s / 5)
        // fill((128 + hue) % 255, 255, 255)
        fill(255)
        noStroke()
        textFont(font)
        textAlign(CENTER, CENTER)
        if (str(this.v).length <= 2) {
            textSize(this.s / 2)
        } else {
            textSize(this.s / 3)
        }
        text(v, this.x, this.y)
        this.s = lerp(this.s, tileSize, lerpSpeed)

        if (!gameover) {
            this.x = lerp(this.x, width / 2 - 1.5 * gridSize + this.c * gridSize, lerpSpeed)
            this.y = lerp(this.y, height / 2 - 1.5 * gridSize + this.r * gridSize, lerpSpeed)
        } else {
            if (this.delay > 0) {
                this.x = lerp(this.x, width / 2 - 1.5 * gridSize + this.c * gridSize, lerpSpeed)
                this.y = lerp(this.y, height / 2 - 1.5 * gridSize + this.r * gridSize, lerpSpeed)
                this.delay--
                return
            }
            if (this.combining) {
                this.x = width / 2 - 1.5 * gridSize + this.c * gridSize
                this.y = height / 2 - 1.5 * gridSize + this.r * gridSize
                this.combining = false
            }
            this.x += this.xv
            this.y += this.yv
            this.yv += gravity
        }
    }
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}