import { useState , useCallback} from "react";

import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import QuizcompleteImg from '../assets/quiz-complete.png';
 
function Quiz(){

    const [userAnswers , setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    const quizComplete = activeQuestionIndex === QUESTIONS.length;


     const handleSelectAnswer =useCallback (function handleSelectAnswer(SelectedAnswer) {
        setUserAnswers( (prevUserAnswers) => {
            return [...prevUserAnswers , SelectedAnswer];
        });
     }, []);

     const  handleSkipAnswer = useCallback( () => handleSelectAnswer(null), [handleSelectAnswer ] );









      
      if (quizComplete) {
        return (
          <div id="summary">
            <img src={QuizcompleteImg} alt="Trophy icon"/>
            <h2>Quiz Completed!</h2>

          </div>
        )
      }
     
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return(
      <div id="quiz">
                <div id="question">
                  <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer}/>
          <h2>{QUESTIONS [activeQuestionIndex].text}</h2>
        <ul id="answers">
            {shuffledAnswers.map((answer) => 
            <li key={answer} className="answer">
                <button onClick={() => handleSelectAnswer(answer)}>{answer}</button>
            </li>)}
        </ul>
        </div>
      </div>
    )
    }
    export default Quiz;