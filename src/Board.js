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
    const gameNum = this.props.gameNum

    for (let i = 0; i < gameNum * gameNum; i = i + gameNum) {
      const inner = []
      for (let r = 0; r < gameNum; r++) {
        inner.push(<>{this.renderSquare(i + r)}</>)
      }
      boards.push(
        <div className="board-row" key={i}>
          {inner}
        </div>
      )
    }
    return <div>{boards}</div>
  }
}

export default Board
