function up() {
    for (let r = 1; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
                board[r][c].combining = false
                let next = board[r - 1][c]
                if (next) {
                    if (canCombine(board[r][c].v, next.v)) {
                        newV = board[r][c].v + next.v
                        board[r][c] = undefined
                        board[r - 1][c] = undefined
                        addNewTile(r, c, newV, false, true)
                    } else {
                        continue
                    }
                }
                board[r][c].r--
                board[r - 1][c] = board[r][c]
                board[r][c] = undefined
                moved = 'up'
            }
        }
    }
}

function right() {
    for (let r = 0; r < 4; r++) {
        for (let c = 2; c >= 0; c--) {
            if (board[r][c]) {
                board[r][c].combining = false
                let next = board[r][c + 1]
                if (next) {
                    if (canCombine(board[r][c].v, next.v)) {
                        newV = board[r][c].v + next.v
                        board[r][c] = undefined
                        board[r][c + 1] = undefined
                        addNewTile(r, c, newV, false, true)
                    } else {
                        continue
                    }
                }
                board[r][c].c++
                board[r][c + 1] = board[r][c]
                board[r][c] = undefined
                moved = 'right'
            }
        }
    }
}

function down() {
    for (let r = 2; r >= 0; r--) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c]) {
                board[r][c].combining = false
                let next = board[r + 1][c]
                if (next) {
                    if (canCombine(board[r][c].v, next.v)) {
                        newV = board[r][c].v + next.v
                        board[r][c] = undefined
                        board[r + 1][c] = undefined
                        addNewTile(r, c, newV, false, true)
                    } else {
                        continue
                    }
                }
                board[r][c].r++
                board[r + 1][c] = board[r][c]
                board[r][c] = undefined
                moved = 'down'
            }
        }
    }
}

function left() {
    for (let r = 0; r < 4; r++) {
        for (let c = 1; c < 4; c++) {
            if (board[r][c]) {
                board[r][c].combining = false
                let next = board[r][c - 1]
                if (next) {
                    if (canCombine(board[r][c].v, next.v)) {
                        newV = board[r][c].v + next.v
                        board[r][c] = undefined
                        board[r][c - 1] = undefined
                        addNewTile(r, c, newV, false, true)
                    } else {
                        continue
                    }
                }
                board[r][c].c--
                board[r][c - 1] = board[r][c]
                board[r][c] = undefined
                moved = 'left'
            }
        }
    }
}