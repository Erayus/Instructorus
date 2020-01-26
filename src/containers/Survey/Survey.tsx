import React, { useState, useEffect, useContext} from "react";
import WhiteBox from "../../hoc/whiteBox/whiteBox";
import {observer} from "mobx-react-lite";
import { RouteComponentProps } from "react-router";


import Question from "../../components/Question/Question";
import classes from "./Survey.module.css";
import { IQuestion } from "../../models/question";
import { IFeedback } from "../../models/feedback";
import FeedbackStore from "../../stores/feedbackStore";


interface DetailParams {
    surveyingSchool: string
}

const Survey: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

    const [questions] = useState<IQuestion[]>([
        {
            id: "Q001",
            content: 'Did you have fun today?',
            type: 'yesno'
        },
        {
            id: "Q002",
            content: 'Did you learn something new today?',
            type: 'yesno'
        },
        {
            id: "Q003",
            content: "Do you love today's challenges?",
            type: 'yesno'
        }
    ]);
    const [surveyingSchool, setSurveyingSchool] = useState<string>();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const feedbackStore = useContext(FeedbackStore);

    // useEffect(() => {
    //       // Auto-selected previous selected school
    //       const surveyingSchool = match.params.surveyingSchool;
    //       setSurveyingSchool(surveyingSchool);
  
    //       //Get answers from the database
    //       axios.get<IAnswer[]>("./surveys/" + surveyingSchool+".json")
    //       .then(
    //           (res) => {
    //               const answers = res.data;
    //               if (answers){
    //                   setAnswers(answers)
    //               }
    //           }
    //       )
    //       .catch(
    //           (error) => console.log(error)
    //       )
    // })

    useEffect(()=> {
        setSurveyingSchool(match.params.surveyingSchool);
    }, [match.params.surveyingSchool])

  
    const back = () => {
        if (currentQuestionIndex === 0 ) {
            history.replace('/');
        }else {
            setCurrentQuestionIndex((prevQuestionIndex => prevQuestionIndex - 1));
            feedbackStore.removeFeedback();
            console.log(feedbackStore.surveyingFeedback);
        }
    };

    const onAnswer = (questionId: string, type: string, response: string) => {
        // Add new answer to the answers 
        let newFeedback: IFeedback = {
            id: String(Math.random()),
            type: type,
            response: response,
            questionId: questionId,
            instructorId: "1", //come from Redux Store later,
            schoolId: ""
        }
        //Initialize answers value
        // if (answers == null){
        //     newAnswers = {};
        //     answers[questionId] = {"Yes": 0, "No": 0};
        // } else if (!answers[questionId]){
        //     answers[questionId] = {"Yes": 0, "No": 0};
        // }

        // answers[questionId][response] = ++answers[questionId][response] || 1;
        // this.setState({answers: answers});
        // Move to the next question or submit the survey
        feedbackStore.addFeedback(newFeedback);
        if (currentQuestionIndex < questions.length - 1){   
            setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
        } else {
            feedbackStore.submitFeedback();
            history.replace('/');
        }
    }

    let displayingQuestion = <Question
                                id={questions[currentQuestionIndex].id}
                                type={questions[currentQuestionIndex].type}
                                responded={(id: string, type: string, response: string) => onAnswer(id, type, response)}
                                >
                                {questions[currentQuestionIndex].content}
                                </Question>

    return (

            <React.Fragment>
                <WhiteBox maxWidth="550px">
                    <button type="button" className="btn rgba-blue-strong px-3 py-2 ml-3 float-left" onClick={back}>
                        <i className="fas fa-arrow-left text-white"></i>
                    </button>

                    <div className={classes.SurveyHead}>
                        <h2 className="text-aqua" style={{"fontWeight": "bold"}}>{surveyingSchool}</h2>
                    </div>
                    
                    <div className={classes.SurveyBody}>
                        {displayingQuestion} 
                    </div>
                    <div>
                        <h6>{currentQuestionIndex + 1}/{questions.length}</h6>
                    </div>
                </WhiteBox>
            </React.Fragment>
        )  
}

export default observer(Survey);