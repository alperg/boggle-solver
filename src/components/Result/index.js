import React from 'react';
import { Table } from 'reactstrap';

// Show the words found with their scores
function Result(props) {
  return (
    <div className="result">
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Word</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
        {
          props.data.sort(function(a, b) { return b.score - a.score; }).map(function(word, i) {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{word.word}</td>
                <td>{word.score}</td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
    </div>
  )
}

export default Result;
