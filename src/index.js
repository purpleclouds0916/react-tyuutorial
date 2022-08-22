import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  handleClick(i) {
    const squares = this.state.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext })
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i)
        }}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          lastPosition: null,
        },
      ],
      stepNumber: 0,
      xIsNext: true,
      isDesc: false,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([
        {
          squares: squares,
          lastPosition: lastPosition(i),
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start'

      return (
        <li key={move}>
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
              ({history[move].lastPosition.col},{' '}
              {history[move].lastPosition.row})
            </>
          )}
        </li>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => {
              this.handleClick(i)
            }}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div class="toggle-switch">
            on:降順,off:昇順
            <input type="checkbox" value=""></input>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Game />)

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
      return squares[a]
    }
  }
  return null
}

const lastPosition = (positionNum) => {
  const position = {
    row: null,
    col: null,
  }

  if (positionNum >= 6) {
    position.row = 3
  } else if (positionNum >= 3) {
    position.row = 2
  } else {
    position.row = 1
  }

  if (positionNum % 3 === 0) {
    position.col = 1
  } else if (positionNum % 3 === 1) {
    position.col = 2
  } else if (positionNum % 3 === 2) {
    position.col = 3
  }
  return position
}

// 今日一番の学び
// var player = {score: 1, name: 'Jeff'};

// var newPlayer = Object.assign({}, player, {score: 2});
// // Now player is unchanged, but newPlayer is {score: 2, name: 'Jeff'}

// // Or if you are using object spread syntax, you can write:
// // var newPlayer = {...player, score: 2};
