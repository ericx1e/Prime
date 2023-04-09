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
        push()
        translate(-(shadowN - 1) * shadowTransform.x, -(shadowN - 1) * shadowTransform.y)
        colorMode(HSB)
        hue = map(this.v, 0, maxValue, 255, 20)
        if (this.combining) {
            noStroke()
            fill(hue, 70, 60)
            for (let i = 0; i < shadowN; i++) {
                rect(width / 2 - 1.5 * gridSize + this.c * gridSize + i * shadowTransform.x, height / 2 - 1.5 * gridSize + this.r * gridSize + i * shadowTransform.y, this.s, this.s, this.s / 5)
            }
            fill(hue, 70, 90)
            rect(width / 2 - 1.5 * gridSize + this.c * gridSize, height / 2 - 1.5 * gridSize + this.r * gridSize, this.s, this.s, this.s / 5)
        }

        fill(hue, 70, 60)
        noStroke()
        if (!this.combining) {
            for (let i = 0; i < shadowN; i++) {
                rect(this.x + i * shadowTransform.x, this.y + i * shadowTransform.y, this.s, this.s, this.s / 5)
            }
        }

        if (primeSet.has(this.v)) {
            strokeWeight(this.s / 20)
            stroke(255)
        } else {
            noStroke()
        }
        fill(hue, 70, 90)


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
        if (this.s != tileSize) {
            this.s = lerp(this.s, tileSize, lerpSpeed)
        }

        if (!gameover) {
            this.x = lerp(this.x, width / 2 - 1.5 * gridSize + this.c * gridSize, lerpSpeed)
            this.y = lerp(this.y, height / 2 - 1.5 * gridSize + this.r * gridSize, lerpSpeed)
        } else {
            if (this.delay > 0) {
                this.x = lerp(this.x, width / 2 - 1.5 * gridSize + this.c * gridSize, lerpSpeed)
                this.y = lerp(this.y, height / 2 - 1.5 * gridSize + this.r * gridSize, lerpSpeed)
                this.delay--
                pop()
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

        pop()
    }
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}