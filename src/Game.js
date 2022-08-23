import React from 'react'
import CustomGame from './CustomGame'

class Game extends React.Component {
  render() {
    return <CustomGame row={3} col={3} ></CustomGame>
  }
}

export default Game
