import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

import Header from './components/Header';
import Footer from './components/Footer';
import Instructions from './components/Instructions';
import Board from './components/Board';
import Result from './components/Result';

import { fetchWords } from './services/apiService';

class App extends Component {
  constructor(props) {
    super(props);

    // Represents the 4x4 board with 16 cells
    this.state = {
      board: [
        ['R', 'H', 'R', 'E'],
        ['Y', 'P', 'C', 'S'],
        ['W', 'N', 'S', 'N'],
        ['T', 'E', 'G', 'O']
      ],
      // Will be fetched from the API
      result: [],
      // Total score to be calculated based on the word lengths
      totalScore: 0,
      // To show the loading overlay
      loading: false
    };
  };

  // Update state when a value changes
  onBoardChange = (board) => {
    this.setState({ board });
  };

  // Fetch the words from the APIs and update the UI with the results
  // TODO: Further improvement: Some of this logic can be moved to a utility service
  onSolveClick = () => {
    const letters = this.state.board.flat().join('');

    this.setState({ loading: true });
    fetchWords(letters).then((data) => {
      if(data.length) {
        const dataWithScores = data.map(d => {
          return {
            word: d,
            score: this.calculateScore(d)
          }
        });

        const totalScore = dataWithScores.reduce((a, b) => ({ score: a.score + b.score }));

        this.setState({
          result: dataWithScores,
          loading: false,
          totalScore: totalScore.score
        });
      } else {
        this.setState({
          loading: false
        });
      }
    }).catch(console.log);
  }

  // Calculates score based on the work length
  // TODO: Further improvement: This can be moved to a utility service
  calculateScore = (word) => {
    let score = 1;

    if (word.length > 4) {
      switch(word.length) {
        case 5: score = 2; break;
        case 6: score = 3; break;
        case 7: score = 5; break;
        default: score = 11; break;
      };
    }
    return score;
  }

  // Clear the UI for the next round
  onClear = () => {
    this.setState({
      result: [],
      totalScore: 0
    })
  }

  render() {
    const { board, result, totalScore, loading } = this.state;

    return (
      <div className="boggle-solver">
        
        <Header />

        <Instructions />
        
        {
          loading && (
            <Container className="overlay" fluid={true}>
              <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
              </div>
            </Container>
          )
        }

        <Container className="content" fluid={true}>
          <Row>
            <Col md="4" xs="12">
              <Board value={board} onChange={this.onBoardChange} onSolveClick={this.onSolveClick} onClear={this.onClear} />
            </Col>
            <Col md="4" xs="12">
              <Result data={result} />
            </Col>
            <Col md="4" xs="12">
              <div className="score-wrapper">
                <Card body inverse  color="secondary">
                  <CardBody>
                    <h1 className="display-5 words">Words found: {result.length > 0 ? result.length : ''}</h1>
                    <h1 className="display-5 score">Total Score: {totalScore > 0 ? totalScore : ''}</h1>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>

        <Footer />

      </div>
    );
  }
}

export default App;
