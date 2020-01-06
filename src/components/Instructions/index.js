import React from 'react';
import { Jumbotron } from 'reactstrap';

function Instructions() {
  return (
    <Jumbotron>
      <h1 className="display-5">A simple Boggle word game solver built with React and Bootstrap.</h1>
      <hr className="my-2" />
      <p className="lead">How to use the solver?</p>
      <p>Type all the 16 letters in the text boxes with in the 4x4 board below, and click the "Solve" button. You will see the results shorthly right next to the board.</p>
    </Jumbotron>
  );
}

export default Instructions;
