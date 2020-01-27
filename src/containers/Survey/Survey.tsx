import React, { useState, useEffect, useContext} from "react";
import WhiteBox from "../../hoc/whiteBox/whiteBox";
import {observer} from "mobx-react-lite";
import { RouteComponentProps } from "react-router";


import Question from "../../components/Question/Question";
import classes from "./Survey.module.css";
import { IQuestion } from "../../models/question";
import { IFeedback } from "../../models/feedback";
import FeedbackStore from "../../stores/feedbackStore";
import SchoolStore from "../../stores/schoolStore";
import { ISchool } from './../../models/school';
import QuestionStore from "../../stores/questionStore";

interface DetailParams {
    schoolId: string
}

const Survey: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

    const [surveyingSchool, setSurveyingSchool] = useState<ISchool>();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const questionStore = useContext(QuestionStore)
    const schoolStore = useContext(SchoolStore);
    const feedbackStore = useContext(FeedbackStore);

    useEffect(()=> {
        schoolStore.loadSchools();
        questionStore.loadQuestions();
        setSurveyingSchool(schoolStore.schools.filter(school => school.id === match.params.schoolId)[0]);

    }, [match.params.schoolId, schoolStore.schools.length, questionStore])

  
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
            schoolId: match.params.schoolId
        }

        feedbackStore.addFeedback(newFeedback);
        
        if (currentQuestionIndex < questionStore.questions.length - 1){   
            setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
        } else {
            feedbackStore.submitFeedback();
            history.replace('/');
        }
    }


    let displayingQuestion: any = "Loading questions...";
    if (questionStore.questions.length > 0) {
        displayingQuestion = <Question
                                    id={questionStore.questions[currentQuestionIndex]?.id}
                                    type={questionStore.questions[currentQuestionIndex]?.type}
                                    responded={(id: string, type: string, response: string) => onAnswer(id, type, response)}
                                    >
                                    {questionStore.questions[currentQuestionIndex]?.content}
                                    </Question>
    } else if (questionStore.questions.length == 0) {
        displayingQuestion = "No questions added yet";
    }

    return (

            <React.Fragment>
                <WhiteBox maxWidth="550px">
                    <div className="text-center">
                        <button type="button" className="btn rgba-blue-strong px-3 py-2 ml-3 float-left" onClick={back}>
                            <i className="fas fa-arrow-left text-white"></i>
                        </button>

                        <div className={classes.SurveyHead}>
                            <h2 className="text-aqua" style={{"fontWeight": "bold"}}>{surveyingSchool ? surveyingSchool!.name : null}</h2>
                        </div>
                        
                        <div className={classes.SurveyBody}>
                            {displayingQuestion} 
                        </div>
                        <div>
                            <h6>{currentQuestionIndex + 1}/{questionStore.questions.length}</h6>
                        </div>
                    </div>
                </WhiteBox>
            </React.Fragment>
        )  
}

export default observer(Survey);