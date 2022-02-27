
const Game = () => {
    let player1Score = []
    let player2Score = []
    let symbol = ''
    let winner = ''
    let gameOver = false;
    let gameArray = [
        0, 0, 0,
        0, 0, 0,
        0, 0, 0
    ]
    const getSymbol = () => symbol
    const getWinner = () => {
        for (let i = 0; i <= 8; i += 3) {
            if (gameArray[0 + i] + gameArray[1 + i] + gameArray[2 + i] == symbol + symbol + symbol) winner = symbol, gameOver = true, console.log(`winner is ${winner}`)
        }
        for (let i = 0; i <= 2; i++) {
            if (gameArray[0 + i] + gameArray[3 + i] + gameArray[6 + i] == symbol + symbol + symbol) winner = symbol, gameOver = true, console.log(`winner is ${winner}`)
        }
        if (gameArray[0] + gameArray[4] + gameArray[8] == symbol + symbol + symbol) winner = symbol, gameOver = true, console.log(`winner is ${winner}`)
        if (gameArray[2] + gameArray[4] + gameArray[6] == symbol + symbol + symbol) winner = symbol, gameOver = true, console.log(`winner is ${winner}`)
        if (winner == 'x' || winner == 'o') resultSpan.classList.add('visible'), resultSpan.textContent = `Winner - ${winner}`
        if(player1Score.concat(player2Score).length >= 9 && !winner){winner = 'draw', resultSpan.classList.add('visible'), resultSpan.textContent = `Draw.`}
    }
    const resetGame = () => {
        gameOver = false;
        gameArray = [
            0, 0, 0,
            0, 0, 0,
            0, 0, 0
        ]
        player1Score = []
        player2Score = []
        symbol = ''
        winner = ''
        const board = document.querySelectorAll('.gameBoardBox > div')
        board.forEach(n => n.remove());
        resultSpan.classList.remove('visible'), resultSpan.textContent = ''
    }

    const botPlay = () => {
        const board = document.querySelectorAll('.gameBoardBox > div')
        player2Score.length >= player1Score.length ? symbol = 'o' : symbol = 'x'
        let geriIndexai = []
        for(let i = 0; i < gameArray.length; i++){
            if(gameArray[i] == 0) geriIndexai.push(i)
        }
        randomSkaicius = geriIndexai[Math.floor(Math.random()*geriIndexai.length)]
        let choice = randomSkaicius
        spanas = board[choice].querySelector('span')
        spanas.textContent = symbol
        spanas.classList.add('visible')
        symbol == 'o' ? gameArray[randomSkaicius] = 'o' : gameArray[randomSkaicius] = 'x'
        symbol == 'o' ? player1Score.push(randomSkaicius) : player2Score.push(randomSkaicius)
        getWinner()
    }

    const startGame = () => {
        resetGame()
        for (let i = 0; i < 9; i++) {
            const div = document.createElement('div')
            gameBoardBox.append(div)
            const span = document.createElement('span')
            div.append(span)
            div.addEventListener('click', e => {
                if (e.target.textContent != '' || gameOver == true) {
                    return
                } 
                if(winner == '' && !playAgainstBot.classList.contains('enabled')) {
                player2Score.length >= player1Score.length ? symbol = 'o' : symbol = 'x'

                    span.textContent = symbol
                    span.classList.add('visible')
                    symbol == 'o' ? player1Score.push((i)) : player2Score.push((i))
                    symbol == 'o' ? gameArray[i] = 'o' : gameArray[i] = 'x'
                    getWinner()
                }
                if(winner == '' && playAgainstBot.classList.contains('enabled')){
                    player2Score.length >= player1Score.length ? symbol = 'o' : symbol = 'x'
                    if(symbol == 'o'){
                    span.textContent = symbol
                    span.classList.add('visible')
                    symbol == 'o' ? player1Score.push((i)) : player2Score.push((i))
                    symbol == 'o' ? gameArray[i] = 'o' : gameArray[i] = 'x'
                    getWinner()
                    } else {
                        return
                    }
                if(winner == '' && playAgainstBot.classList.contains('enabled'))
                    setTimeout(() => {
                        botPlay()
                        getWinner()
                    }, 700);
                  
                }
    })
}
    }
return { startGame, resetGame, botPlay }
}

// DOM variables

const app = document.querySelector('#app')
const gameBoardBox = document.createElement('div')
const title = document.createElement('h1')
const menu = document.createElement('div')
const buttons = document.createElement('div')
const start = document.createElement('button')
const reset = document.createElement('button')
const result = document.createElement('div')
const resultSpan = document.createElement('span')
const playAgainstBot = document.createElement('button')

// DOM appends
app.append(gameBoardBox)
gameBoardBox.append(title)
app.append(menu)
buttons.append(start, reset)
result.append(resultSpan)
menu.append(result,playAgainstBot, buttons)

// DOM classlist
gameBoardBox.classList.add('gameBoardBox')
menu.classList.add('menu')
buttons.classList.add('buttonsDiv')
reset.classList.add('btn1', 'btnRadient')
resultSpan.classList.add('resultSpan')
result.classList.add('result')
start.classList.add('btn1', 'btnRadient')
playAgainstBot.classList.add('botButton')

// DOM TextContent
title.textContent = 'Tic-Tac-Toe'
start.textContent = 'Start game'
reset.textContent = 'Reset'
playAgainstBot.textContent = 'Play vs BOT'

const play = Game()
playAgainstBot.addEventListener('click', ()=>{
    playAgainstBot.classList.toggle('enabled')
    play.startGame()
})
start.addEventListener('click', play.startGame)
reset.addEventListener('click', play.startGame)

play.startGame()
