function Button(x, y, s, id) {
    this.x = x
    this.y = y
    this.s = s

    this.show = function () {
        if (this.touchingMouse()) {
            fill(70)
        } else {
            fill(90)
        }

        rectMode(CENTER)
        rect(this.x, this.y, this.s, this.s, this.s / 5)

        switch (id) {
            case "tutorial":
                fill(10)
                textSize(this.s / 2)
                text("?", this.x, this.y - this.s / 10)
                break
        }
    }

    this.touchingMouse = function () {
        return mouseX > this.x - this.s / 2 && mouseX < this.x + this.s / 2 && mouseY > this.y - this.s / 2 && mouseY < this.y + this.s / 2
    }

    this.onClick = function () {
        switch (id) {
            case "tutorial":
                popup = new Popup("tutorial")
                break
        }
    }
}