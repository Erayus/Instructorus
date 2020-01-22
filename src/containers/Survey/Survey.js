import React, {Component} from "react";
import WhiteBox from "../../hoc/whiteBox/whiteBox";
import { MDBBtn } from "mdbreact";
import Question from "../../components/Question/Question";
import classes from "./Survey.module.css";
import axios from "../../axios-survey";

class Survey extends Component {
    state = {
        surveyingSchool: null,
        questions: [
            {
                id: "Q001",
                title: 'Did you have fun today?',
                type: 'yesno'
            },
            {
                id: "Q002",
                title: 'Did you learn something new today?',
                type: 'yesno'
            },
            {
                id: "Q003",
                title: "Do you love today's challenges?",
                type: 'yesno'
            }
        ],
        answers: null,
        curQuestionIndex: 0
    }

    componentDidMount = () => {
        // Auto-selected previous selected school
        const surveyingSchool = this.props.match.params.surveyingSchool;
        this.setState({surveyingSchool: surveyingSchool})

        //Get answers from the database
        axios.get("./surveys/" + surveyingSchool+".json")
        .then(
            (res) => {
                const answers = res.data;
                if (answers){
                    this.setState({answers: answers})
                }
            }
        )
        .catch(
            (error) => console.log(error)
        )
    }
    backToSchoolSelection = () => {
        this.props.history.replace('/')
    }
    onQuestionAnswered = (questionId, response) => {
        // Add new answer to the answers 
        let answers = this.state.answers;
        //Initialize answers value
        if (answers == null){
            answers = {};
            answers[questionId] = {"Yes": 0, "No": 0};
        } else if (!answers[questionId]){
            answers[questionId] = {"Yes": 0, "No": 0};
        }

        answers[questionId][response] = ++answers[questionId][response] || 1;
        this.setState({answers: answers});
        // Move to the next question or submit the survey
        if (this.state.curQuestionIndex < this.state.questions.length - 1){
            this.setState({curQuestionIndex: this.state.curQuestionIndex + 1})
        } else {
            this.submitSurvey();
            this.props.history.replace('/')
        }
    }
    submitSurvey(){
        console.log("Survey sent: " + this.state.answers)
        axios.put("surveys/" + this.state.surveyingSchool+".json", this.state.answers).then(
            (res) => {
                console.log(res);
            }
        ).catch(
            (res) => console.log(res)
        )
    }

    render(){
    let displayingQuestion = <Question
                                id={this.state.questions[this.state.curQuestionIndex].id}
                                type={this.state.questions[this.state.curQuestionIndex].type}
                                responsed={(id, response) => this.onQuestionAnswered(id, response)}
                            >
                                {this.state.questions[this.state.curQuestionIndex].title}
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
                            onClick={this.backToSchoolSelection} >
                            <i className="fa fa-arrow-circle-o-left" style={{"marginRight": "5px", "fontSize": '18px'}}aria-hidden="true"></i> 
                            School Selection
                        </MDBBtn>
            <WhiteBox>
                 
                <div className={classes.SurveyHead}>
                    <h2 style={{"fontWeight": "bold"}}>{this.state.surveyingSchool}</h2>
                </div>
                
                <div className={classes.SurveyBody}>
                    {displayingQuestion} 
                </div>
                <div>
                    <h6>{this.state.curQuestionIndex + 1}/{this.state.questions.length}</h6>
                </div>
            </WhiteBox>
            </React.Fragment>
        )  
    }
}

export default Survey;