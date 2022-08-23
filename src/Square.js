import React from 'react'

class Square extends React.Component {
  render() {
    const className = this.props.winnerResult?.result.includes(
      this.props.position
    )
      ? 'square activeSquare'
      : 'square'
    return (
      <button className={className} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    )
  }
}

export default Square
