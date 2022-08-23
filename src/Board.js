import React from 'react'
import Square from './Square'

class Board extends React.Component {
  renderSquare(i) {
    const winnerResult = this.props.activeSquares
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i)
        }}
        winnerResult={winnerResult}
        position={i}
      />
    )
  }

  render() {
    const boards = []
    const row = this.props.row
    const col = this.props.col
    let currentNum = 0

    for (let r = 0; r < row * row; r = r + row) {
      const inner = []
      for (let c = 0; c < col; c++) {
        inner.push(<>{this.renderSquare(currentNum)}</>)
        currentNum++
      }
      boards.push(
        <div className="board-row" key={r}>
          {inner}
        </div>
      )
    }
    return <div>{boards}</div>
  }
}

export default Board
