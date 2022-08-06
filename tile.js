function Tile(r, c, v, s) {
    this.r = r
    this.c = c
    this.s = tileSize
    this.v = v
    this.x = width / 2 - 1.5 * gridSize + c * gridSize
    this.y = height / 2 - 1.5 * gridSize + r * gridSize
    if (s) {
        this.s = s
    } else {
        this.s = tileSize
    }

    this.show = function () {
        colorMode(HSB)
        fill(map(this.v, 0, maxValue, 255, 0), 255, 255)
        if (primeSet.has(this.v)) {
            strokeWeight(this.s / 15)
            stroke(255)
        } else {
            noStroke()
        }
        rect(this.x, this.y, this.s, this.s, this.s / 5)
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

        this.x = lerp(this.x, width / 2 - 1.5 * gridSize + this.c * gridSize, 0.4)
        this.y = lerp(this.y, height / 2 - 1.5 * gridSize + this.r * gridSize, 0.4)

        this.s = lerp(this.s, tileSize, 0.4)
    }
}

function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}