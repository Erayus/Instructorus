import React, { useState} from "react";
import WhiteBox from "../../hoc/whiteBox/whiteBox";
import { MDBBtn } from "mdbreact";
import Question from "../../components/Question/Question";
import classes from "./Survey.module.css";
import axios from "../../axios-survey";
import { IQuestion } from "../../models/question";
import { IAnswer } from "../../models/answer";
import { RouteComponentProps } from "react-router";


interface DetailParams {
    surveyingSchool: string
}

const Survey: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

    const [questions, setQuestions] = useState<IQuestion[]>([
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
    // const [answers, setAnswers] = useState<IAnswer[]>([]);

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

  
    const backToSchoolSelection = () => {
        history.replace('/')
    };

    const onAnswer = (questionId: string, type: string, response: string) => {
        // Add new answer to the answers 
        let newAnswer: IAnswer = {
            id: String(Math.random()),
            type: type,
            response: response,
            questionId: questionId,
            instructorId: "1" //come from Redux Store later
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
        if (currentQuestionIndex < questions.length - 1){
            setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1)
        } else {
            submitSurvey(newAnswer);
            history.replace('/')
        }
    }
    const submitSurvey = (newAnswer: IAnswer) => {
        
        axios.post("surveys/" + surveyingSchool+".json", newAnswer).then(
            (res) => {
                console.log(res);
            }
        ).catch(
            (res) => console.log(res)
        )
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

           
                <MDBBtn 
                            color="orange"
                            style={{
                                "backgroundColor": "white",
                                "left": "10px",
                                "top": "5px",
                                "position": "fixed",
                            }}
                            onClick={backToSchoolSelection} >
                            <i className="fa fa-arrow-circle-o-left" style={{"marginRight": "5px", "fontSize": '18px'}}aria-hidden="true"></i> 
                            School Selection
                        </MDBBtn>
            <WhiteBox>
                 
                <div className={classes.SurveyHead}>
                    <h2 style={{"fontWeight": "bold"}}>{surveyingSchool}</h2>
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

export default Survey;