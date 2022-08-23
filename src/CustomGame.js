import React from 'react'

import './index.css'
import Board from './Board'

class CustomGame extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      row: 3,
      col: 3,
      history: [
        {
          // 上手く動くのか心配
          squares: Array(9).fill(null),
          lastPosition: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isDesc: false,
      message: null,
      activeSquares: [],
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (squares[i]) {
      return
    }

    if (calculateWinner(squares)) {
      this.setState({ activeSquares: calculateWinner(squares).result })
      return
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([
        {
          squares: squares,
          lastPosition: lastPosition(i, this.state.row, this.state.col),
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })

    if (!calculateWinner(squares) && !squares.includes(null)) {
      this.setState({
        message: '引き分けになりました。',
      })
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    })
  }

  desc() {
    this.setState({
      isDesc: !this.state.isDesc,
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start'

      return (
        <li key={history[move]}>
          ,
          <button
            className={move === this.state.stepNumber ? 'active' : ''}
            onClick={() => {
              this.jumpTo(move)
            }}
          >
            {desc}
          </button>
          {history[move].lastPosition && (
            <>
              row:{history[move].lastPosition.row},col:
              {history[move].lastPosition.col}
            </>
          )}
        </li>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner.winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <>
        <div>
          row:
          <input
            type="text"
            name=""
            value={this.state.row}
            onChange={(e) => {
              this.setState({ row: e.target.value })
            }}
          ></input>
          <br></br>
          <br></br>
          col:
          <input
            type="text"
            name=""
            value={this.state.col}
            onChange={(e) => {
              this.setState({ col: e.target.value })
            }}
          ></input>
          <br></br>
          <br></br>
          winner:<input></input>
        </div>
        <br></br>
        <br></br>
        <div className="game">
          {this.state.message && this.state.message}
          <div className="game-board">
            <Board
              squares={current.squares}
              activeSquares={calculateWinner(current.squares)}
              onClick={(i) => {
                this.handleClick(i)
              }}
              row={Number(this.state.row)}
              col={Number(this.state.col)}
              history
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div className="toggle-switch">
              on:降順,off:昇順
              <input
                type="checkbox"
                value=""
                onChange={() => {
                  this.desc()
                }}
              ></input>
            </div>
            <ol className={this.state.isDesc ? 'desc' : ''}>{moves}</ol>
          </div>
        </div>
      </>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], result: [a, b, c] }
    }
  }
  return null
}

const lastPosition = (positionNum, row, col) => {
  const position = {
    row: null,
    col: null,
  }

  position.row = Math.trunc(positionNum / col) + 1

  for (let i = 0; i < col; i++) {
    if (positionNum % col === i) {
      position.col = (positionNum % col) + 1
    }
  }

  return position
}

// 今日一番の学び
// var player = {score: 1, name: 'Jeff'};

// var newPlayer = Object.assign({}, player, {score: 2});
// // Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// // Or if you are using object spread syntax, you can write:
// // var newPlayer = {...player, score: 2};
export default CustomGame
