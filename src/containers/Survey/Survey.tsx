import React, { useState, useEffect, useContext} from "react";
import WhiteBox from "../../hoc/whiteBox/whiteBox";
import {observer} from "mobx-react-lite";
import { RouteComponentProps } from "react-router";


import Question from "../../components/Question/Question";
import classes from "./Survey.module.css";
import { IFeedback } from "../../models/feedback";
import { ISchool } from './../../models/school';
import { RootStoreContext } from "../../stores/rootStore";

interface DetailParams {
    schoolId: string
}

const Survey: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

    const [surveyingSchool, setSurveyingSchool] = useState<ISchool>();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const rootStore = useContext(RootStoreContext)
    const { schools } = rootStore.schoolStore;
    const { addFeedback, removeFeedback, submitFeedback} = rootStore.feedbackStore;
    const { questions } = rootStore.questionStore;

    useEffect(()=> {
        setSurveyingSchool(schools.filter(school => school.id === match.params.schoolId)[0]);
    }, [match.params.schoolId, schools.length, rootStore])

  
    const back = () => {
        if (currentQuestionIndex === 0 ) {
            history.replace('/');
        }else {
            setCurrentQuestionIndex((prevQuestionIndex => prevQuestionIndex - 1));
            removeFeedback();
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

        addFeedback(newFeedback);

        if (currentQuestionIndex < questions.length - 1){   
            setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
        } else {
            submitFeedback();
            history.replace('/');
        }
    }


    let displayingQuestion: any = "Loading questions...";
    if (questions.length > 0) {
        displayingQuestion = <Question
                                    id={questions[currentQuestionIndex]?.id}
                                    type={questions[currentQuestionIndex]?.type}
                                    responded={(id: string, type: string, response: string) => onAnswer(id, type, response)}
                                    >
                                    {questions[currentQuestionIndex]?.content}
                                    </Question>
    } else if (questions.length === 0) {
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
                            <h6>{currentQuestionIndex + 1}/{questions.length}</h6>
                        </div>
                    </div>
                </WhiteBox>
            </React.Fragment>
        )  
}

export default observer(Survey);