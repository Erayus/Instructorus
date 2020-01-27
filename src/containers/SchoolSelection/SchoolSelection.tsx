import React, {useState, useEffect, useRef, SelectHTMLAttributes, useContext, ChangeEvent} from 'react';
import classes from "./SchoolSelection.module.css";
import { MDBBtn } from 'mdbreact';
import SchoolStore from '../../stores/schoolStore';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ISchool } from '../../models/school';

const SchoolSelection: React.FC<RouteComponentProps> =  ({history}) => {
    const schoolSelectionBox = useRef<HTMLSelectElement>(null);
    const [selectedSchool, setSelectedSchool] = useState<ISchool>({id:"", name: "none", logoUrl: ""});
    const schoolStore = useContext(SchoolStore);

    useEffect(() => {
        schoolStore.loadSchools();
        const selectedSchoolFromLS = localStorage.getItem('selectedSchool');
        if (selectedSchoolFromLS !== "none") { 
            // setSelectedSchool(schoolStore.schools.filter(school => school.name == selectedSchoolFromLS)[0]);
            console.log(selectedSchoolFromLS);
        };
        //  schoolSelectionBox.current!.value = selectedSchool!.name;
    }, [schoolStore])
        

    const onSelectSchool = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        localStorage.setItem('selectedSchool', event.target.value );
        setSelectedSchool(schoolStore.schools.filter(school => school.name === event.target.value)[0]);
    }
    const startSurvey = () => {
        history.push('/survey/' + selectedSchool.id);
    }


    let status = "Select a school";
    let continueBtn = null;

    if (selectedSchool!.name !== "none"){
        status = "You have selected:";
        continueBtn =  <MDBBtn className="mt-4" color="success" onClick={startSurvey}> Start Survey </MDBBtn>;
    }
    
    return (
            <div className={[classes.schoolSelection, "z-depth-2 text-center"].join(" ")}>
                <h1 style={{fontWeight: "bolder"}}>INSTRUCTORUS</h1>
                <hr></hr>
                <h5>{status}</h5>
                <select onChange={onSelectSchool}  ref={schoolSelectionBox} className="browser-default custom-select">
                    <option value="none">Select</option>
                    {schoolStore.schools.map(school => (
                         <option key={school.name} value={school.name}>{school.name}</option>
                    ))}
                   
                </select>
                {continueBtn}
            </div>
    )
    
}

export default observer(SchoolSelection);