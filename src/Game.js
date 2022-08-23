import React from 'react'
import CustomGame from './CustomGame'

class Game extends React.Component {
  render() {
    return <CustomGame row={5} col={7}></CustomGame>
  }
}

export default Game
