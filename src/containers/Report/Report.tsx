import React, {Component} from 'react';
import axios from '../../axios-survey';
import Chart from '../../components/Chart/Chart';

class Report extends Component {
    state = {
        schoolName: null,
        questions: null,
        questionTitles: {
            'Q001': 'Did You Have Fun Today?',
            'Q002': 'Did You Learn Something New Today?',
            'Q003': 'Do You Love Today\'s Chanllenges?' 
        }
    }
    componentDidMount(){
        const schoolName = this.props.match.params.schoolName;
        this.setState({schoolName: schoolName});  
        axios.get('/surveys/' + schoolName + '.json').then(
            (res)=> {
                console.log(res.data)
                this.setState({questions: res.data})
            }
        )
    }
    render(){
        let questionData = [];
        for (let questionNum in this.state.questions){
            let question = {};
            question['title'] = this.state.questionTitles[questionNum];
            question['noOfYes'] = this.state.questions[questionNum]['Yes'];
            question['noOfNo'] = this.state.questions[questionNum]['No'];
            questionData.push(question)
        }
        let charts = (questionData.map(question => {
            return <Chart 
                        key={question.title} 
                        title={question.title} 
                        noOfYes={question.noOfYes} 
                        noOfNo={question.noOfNo}/>
        }))

        return(
            <React.Fragment>
                <h2 style={{marginTop: '20px'}}><strong>{this.state.schoolName}</strong></h2>
                <div style={{display: 'flex', justifyContent: 'center' ,marginTop: '80px'}}>
                    {charts}
                </div>
            </React.Fragment>
        )
    }
}

export default Report;