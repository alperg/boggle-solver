import React, { Component } from 'react';

class Cell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      posX: this.props.posX,
      posY: this.props.posY,
      isLetter: false
    };
  };

  // Update state on input change
  onChange = (e) => {
    if(this.state.isLetter) {
      this.setState({
        value: e.target.value.toUpperCase()
      }, function() {
        if (this.props.onChange) {
          this.props.onChange(this.state);
        }
      });
    } else {
      setTimeout(() => {
        this.setFocus();
      }, 10);
    }
  };

  // Validate the letter, only allow uppercase and lowercase letters
  onKeyPress = (event) =>  {
    this.setState({
      isLetter: (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122)
    });
  }

  // Set focus to this el when needed (from the parent)
  setFocus() {
    this.cell.focus();
    this.cell.select();
  }

  render() {
    return (
      <div className="cell">
        <input
          type="text"
          maxLength="1"
          value={this.state.value}
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}
          ref={(input) => { this.cell = input; }}
        />
      </div>
    );
  }   
}

export default Cell;
