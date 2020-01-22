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
        if (event.target.value !== "none"){
            this.setState({selectedSchool: event.target.value})
        } else {
            this.setState({selectedSchool: event.target.value})
        }
    }
    startSurvey = () => {
        this.props.history.push('/survey/' + this.state.selectedSchool)
    }

    render(){
        let status = "Select a school";
        let continueBtn = null;
        if (this.state.selectedSchool !== "none"){
            status = "You have selected:";
            continueBtn =  <MDBBtn color="success" onClick={this.startSurvey}> Start Survey </MDBBtn>;
        }
        return (
                <div className={classes.schoolSelection}>
                    <h1 style={{fontWeight: "bolder"}}>Tutoryaus</h1>
                    <h3>{status}</h3>
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