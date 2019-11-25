import React, {Component} from 'react';
import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import './Quiz.css';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'


class Quiz extends Component {

  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
        {
          question: 'Якого кольору небо?',
          rightAnswerId: 2,
          id: 1,
          answers: [
              {text: 'червоне', id: 1},
              {text: 'голубе', id: 2},
              {text: 'зелене', id: 3},
              {text: 'оранжеве', id: 4}

          ]

        },
        {
            question: 'Японський автомобіль?',
            rightAnswerId: 3,
            id: 2,
            answers: [
                {text: 'Audi', id: 1},
                {text: 'Peugeot', id: 2},
                {text: 'Toyota', id: 3},
                {text: 'Lancia', id: 4}

            ]

        }
    ]
  };

  onAnswerClickHandler = (answerId) => {
      if(this.state.answerState){
          const key = Object.keys(this.state.answerState)[0];
          if (this.state.answerState[key] === 'success'){
              return
          }
      }

      const question = this.state.quiz[this.state.activeQuestion];
      const results = this.state.results;
      if(question.rightAnswerId === answerId) {
          if(!results[answerState]){
              results[answerState] = 'success'
          }

          this.setState({
              answerState: {[answerId]: 'success'},
              results,
          });
          const timeout = window.setTimeout(() => {
              if (this.isQuizFinished()) {
                  this.setState({
                      isFinished: true
                  })
              }else {
                  this.setState({
                      activeQuestion: this.state.activeQuestion + 1,
                      answerState: null
                  })
              }
              window.clearTimeout(timeout)
          }, 1000)
      } else {
            results[answerState] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results,
            })
      }


};

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

  render() {
 
    return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>Відповісти на всі питання</h1>
          {
              this.state.isFinished
              ? <FinishedQuiz
                  results={this.state.results}
                  quiz={this.state.quiz}
                  />
              : <ActiveQuiz
                      answers={this.state.quiz[this.state.activeQuestion].answers}
                      question={this.state.quiz[this.state.activeQuestion].question}
                      onAnswerClick={this.onAnswerClickHandler}
                      quizLength={this.state.quiz.length}
                      answerNumber={this.state.activeQuestion +1}
                      state={this.state.answerState}
                  />
          }
      </div>

    </div>
    );
  };
};

export default Quiz;
