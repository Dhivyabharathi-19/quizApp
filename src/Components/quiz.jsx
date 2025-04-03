import { useState, useCallback} from "react";



import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";

import Summary from "./summary.jsx";

 
function Quiz(){

  


   
    const [userAnswers , setUserAnswers] = useState([]);
    

    const activeQuestionIndex =userAnswers.length;

    const quizComplete = activeQuestionIndex === QUESTIONS.length;


     const handleSelectAnswer =useCallback (function handleSelectAnswer(SelectedAnswer) {



      

        setUserAnswers( (prevUserAnswers) => {
            return  [...prevUserAnswers , SelectedAnswer];
        });
      },
       []);

     const  handleSkipAnswer = useCallback( () => handleSelectAnswer(null), [handleSelectAnswer ] );









      
      if (quizComplete) {
        return (
          <Summary userAnswers={userAnswers}/>
        )
      }
     
    return(
      <div id="quiz">
            < Question   
            key = {activeQuestionIndex}
            index = {activeQuestionIndex}
             onSelectAnswer={handleSelectAnswer}
             onSkipAnswer={handleSkipAnswer}
            />
      </div>
    )
    }
    export default Quiz;