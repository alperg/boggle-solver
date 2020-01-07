import React, { Component } from 'react';
import { Button } from 'reactstrap';

import Cell from '../Cell';

class Board extends Component {
  constructor(props) {
    super(props);

    // x,y coordinates for the board
    // ['0,0', '1,0', '2,0', '3,0']
    // ['0,1', '1,1', '2,1', '3,1']
    // ['0,2', '1,2', '2,2', '3,2']
    // ['0,3', '1,3', '2,3', '3,3']

    this.state = {
      board: this.props.value || [
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', ''],
        ['', '', '', '']
      ],
      valid: this.isValid(this.props.value)
    };
  };

  componentDidMount() {
    // Set focus to the first cell on start
    this.c00.setFocus();
  }

  onChange = (event) => {
    const state = this.state;
    let x = event.posX;
    let y = event.posY;

    state.board[y][x] = event.value;
    state.valid = this.isValid(state.board);
    this.updateBoard(state);

    // console.log(`${y},${x}: ${this.state.board[y][x]}`);
    
    // Set focus on next control when typed a valid char
    if (x < 3) {
      // Set focus to the next cell on the right
      x++;
    }
    else {
      // Move down a row and move to the first cell
      x = 0;

      if (y < 3) {
        y++;
      }
      else {
        // Move back to top-left cell
        y = 0;
      }
    }
    
    this['c' + x + y].setFocus();
  }

  // Select the element on focus for faster typing
  onFocus = (event) => event.target.select();

  // Clear all the cells
  onClear = () => {
    const board = [];
    for(let i = 0; i < 4; i++) {
      board[i] = [];
      for(let j = 0; j < 4; j++) {
        board[i][j] = '';
        this['c' + i + j].state.value = '';
      }
    }
    this.updateBoard({ board, valid: this.isValid(board) });
  }

  // Update board when necessary
  updateBoard = (state) => {
    this.setState(state, () => {
      this.props.onChange(state.board);
    });
  }

  // Check if the length of the letters is 16
  isValid = (board) => {
    return board.flat().join('').trim().length === 16;
  }

  render() {
    return (
      <>
        <div className="board">
          <table>
            <tbody>
              <tr>
                <td><Cell posX="0" posY="0" value={this.state.board[0][0]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c00 = input }}/></td>
                <td><Cell posX="1" posY="0" value={this.state.board[0][1]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c10 = input }}/></td>
                <td><Cell posX="2" posY="0" value={this.state.board[0][2]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c20 = input }}/></td>
                <td><Cell posX="3" posY="0" value={this.state.board[0][3]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c30 = input }}/></td>
              </tr>
              <tr>
                <td><Cell posX="0" posY="1" value={this.state.board[1][0]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c01 = input }}/></td>
                <td><Cell posX="1" posY="1" value={this.state.board[1][1]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c11 = input }}/></td>
                <td><Cell posX="2" posY="1" value={this.state.board[1][2]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c21 = input }}/></td>
                <td><Cell posX="3" posY="1" value={this.state.board[1][3]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c31 = input }}/></td>
              </tr>
              <tr>
                <td><Cell posX="0" posY="2" value={this.state.board[2][0]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c02 = input }}/></td>
                <td><Cell posX="1" posY="2" value={this.state.board[2][1]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c12 = input }}/></td>
                <td><Cell posX="2" posY="2" value={this.state.board[2][2]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c22 = input }}/></td>
                <td><Cell posX="3" posY="2" value={this.state.board[2][3]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c32 = input }}/></td>
              </tr>
              <tr>
                <td><Cell posX="0" posY="3" value={this.state.board[3][0]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c03 = input }}/></td>
                <td><Cell posX="1" posY="3" value={this.state.board[3][1]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c13 = input }}/></td>
                <td><Cell posX="2" posY="3" value={this.state.board[3][2]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c23 = input }}/></td>
                <td><Cell posX="3" posY="3" value={this.state.board[3][3]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c33 = input }}/></td>
              </tr>
            </tbody>
          </table>
          <Button className="btn-clear" color="warning"size="lg" onClick={()=> { this.onClear(); this.props.onClear(); }}>Clear</Button>
          <Button className="btn-solve" size="lg" onClick={this.props.onSolveClick} disabled={!this.state.valid}>Solve</Button>
        </div>
        {/* TODO: Further improvement: Render the cells using grid */}
        {/* <div className="board-grid">
          {
            this.state.board.flat().map((cell, i) => (
              <Cell key={i} posX="0" posY="0" value={this.state.board[0][0]} onChange={this.onChange} onFocus={this.onFocus} ref={(input) => { this.c00 = input }}/>
            ))
          }
        </div> */}
      </>
    )
  }
}

export default Board;
