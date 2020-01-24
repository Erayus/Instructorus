import React, {Component} from 'react';
import classes from "./SchoolSelection.module.css";
import { MDBBtn } from 'mdbreact';

class SchoolSelection extends Component {
    constructor(props) {
        super(props);
        this.schoolSelectionBox= React.createRef();
    }

    state = {
        selectedSchool: "none"
    }

    componentDidMount(){
        const selectedSchool = localStorage.getItem('selectedSchool');
        if (selectedSchool !== "none"){
            this.setState({selectedSchool: selectedSchool})
        }
        this.schoolSelectionBox.current.value = selectedSchool;
    }

    onSelectSchool = (event) => {
        localStorage.setItem('selectedSchool', event.target.value );
        this.setState({selectedSchool: event.target.value})
     
    }
    startSurvey = () => {
        this.props.history.push('/survey/' + this.state.selectedSchool)
    }

    render(){
        let status = "Select a school";
        let continueBtn = null;

        if (this.state.selectedSchool !== "none"){
            status = "You have selected:";
            continueBtn =  <MDBBtn className="mt-4" color="success" onClick={this.startSurvey}> Start Survey </MDBBtn>;
        }
        return (
                <div className={[classes.schoolSelection, "z-depth-2"].join(" ")}>
                    <h1 style={{fontWeight: "bolder"}}>INSTRUCTORUS</h1>
                    <hr></hr>
                    <h5>{status}</h5>
                    <select onChange={this.onSelectSchool} ref={this.schoolSelectionBox} className="browser-default custom-select">
                        <option value="none">Select</option>
                        <option value="St Margaret Primary School">St Margaret Primary School</option>
                        <option value="Gardenvale Primary School">Gardenvale Primary School</option>
                        <option value="Geelong Grammar Primary School">Geelong Grammar Primary School</option>
                    </select>
                    {continueBtn}
                </div>
        )
    }
}

export default SchoolSelection;