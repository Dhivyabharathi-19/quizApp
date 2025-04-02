import { useState, useCallback, useRef } from "react";



import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import QuizcompleteImg from '../assets/quiz-complete.png';

 
function Quiz(){

  


    const [answerState, setAnswerState ] = useState ('');
    const [userAnswers , setUserAnswers] = useState([]);
    

    const activeQuestionIndex = answerState === '' ? userAnswers.length: userAnswers.length - 1;

    const quizComplete = activeQuestionIndex === QUESTIONS.length;


     const handleSelectAnswer =useCallback (function handleSelectAnswer(SelectedAnswer) {



        setAnswerState('answered');

        setUserAnswers( (prevUserAnswers) => {
            return [...prevUserAnswers , SelectedAnswer];
        });
        setTimeout(() => {
          if (SelectedAnswer === QUESTIONS [activeQuestionIndex].answers[0]) {
            setAnswerState('correct');
          } else {
            setAnswerState('wrong');
          }
          
          setTimeout(() => {
            setAnswerState('');
          },2000);

        },1000);
     }, [activeQuestionIndex]);

     const  handleSkipAnswer = useCallback( () => handleSelectAnswer(null), [handleSelectAnswer ] );









      
      if (quizComplete) {
        return (
          <div id="summary">
            <img src={QuizcompleteImg} alt="Trophy icon"/>
            <h2>Quiz Completed!</h2>

          </div>
        )
      }
     
    return(
      <div id="quiz">
            < Question   
            key = {activeQuestionIndex}
             questionText={ QUESTIONS [activeQuestionIndex].text} 
            answers={QUESTIONS[activeQuestionIndex].answers}
            answerState={answerState}
            SelectedAnswer={userAnswers[userAnswers.length - 1]}
             onSelectAnswer={handleSelectAnswer}
             onSkipAnswer={handleSkipAnswer}
            />
      </div>
    )
    }
    export default Quiz;