import React, { useState, useEffect, useContext} from "react";
import WhiteBox from "../../hoc/whiteBox/whiteBox";
import {observer} from "mobx-react-lite";
import { RouteComponentProps } from "react-router";


import Question from "../../components/Question/Question";
import classes from "./Survey.module.css";
import { IFeedback } from "../../models/feedback";
import { ISchool } from './../../models/school';
import { RootStoreContext } from "../../stores/rootStore";
import { MDBTypography } from "mdbreact";

interface DetailParams {
    schoolId: string
}

const Survey: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

    const [surveyingSchool, setSurveyingSchool] = useState<ISchool>();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const rootStore = useContext(RootStoreContext)
    const { schools } = rootStore.schoolStore;
    const { addFeedback, undoFeedback, submitFeedback} = rootStore.feedbackStore;
    const { questions } = rootStore.questionStore;

    useEffect(()=> {
        setSurveyingSchool(schools.filter(school => school.id === match.params.schoolId)[0]);
    }, [match.params.schoolId, schools.length, rootStore])

  
    const back = () => {
        if (currentQuestionIndex === 0 ) {
            history.replace('/');
        }else {
            setCurrentQuestionIndex((prevQuestionIndex => prevQuestionIndex - 1));
            undoFeedback();
        }
    };

    const onAnswer = (questionId: string, type: string, response: string | number | undefined) => {
        // Add new answer to the answers 
        let newFeedback: IFeedback = {
            id: String(Math.random()),
            type: type,
            response: response,
            questionId: questionId,
            instructorId: "1", //come from Redux Store later,
            schoolId: match.params.schoolId, 
            dateGiven: new Date(),
        }

        addFeedback(newFeedback);

        if (currentQuestionIndex < questions.length - 1){   
            setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
        } else {
            submitFeedback();
            history.replace('/');
        }
    }



    return (
            <React.Fragment>
                <WhiteBox maxWidth="550px">
                    <div className="text-center">
                        <button type="button" className="btn rgba-blue-strong px-3 py-2 m-2 float-left" onClick={back}>
                            <i className="fas fa-arrow-left text-white"></i>
                        </button>

                        <div className={classes.SurveyHead}>
                            <h1 style={{fontSize: "34px", fontWeight: "bolder"}} >{surveyingSchool ? surveyingSchool!.name : null}</h1>
                        </div>
                        
                        <div className={classes.SurveyBody}>
                            {questions.length > 0 ? (
                                <Question
                                 id={questions[currentQuestionIndex]?.id}
                                 content={questions[currentQuestionIndex]?.content}
                                 type={questions[currentQuestionIndex]?.type}
                                 onResponded={(id: string, type: string, response: string|number|undefined) => onAnswer(id, type, response)}
                                />
                            ) :  "Loading questions..." } 
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