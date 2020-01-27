import React, {useState, useEffect, useRef, useContext, ChangeEvent} from 'react';
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
        
        const selectedSchoolFromLS:any = localStorage.getItem('selectedSchool');
        if (selectedSchoolFromLS !== "none") {
            setSelectedSchool(schoolStore.schools.filter(school => school.name === selectedSchoolFromLS)[0]);
        };
        schoolSelectionBox.current!.value = selectedSchoolFromLS;
        
    }, [schoolStore, schoolStore.schools.length])


    const onSelectSchool = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        localStorage.setItem('selectedSchool', event.target.value );
        setSelectedSchool(schoolStore.schools.filter(school => school.name === event.target.value)[0]);
    }
    const startSurvey = () => {
        history.push('/survey/' + selectedSchool.id);
    }
    
    return (
            <div className={[classes.schoolSelection, "z-depth-2 text-center"].join(" ")}>
                <h1 style={{fontWeight: "bolder"}}>INSTRUCTORUS</h1>
                <hr></hr>
                <h5>{selectedSchool?.name !== "none" ? "You have selected" : "Please select a school" }</h5>
                <select onChange={onSelectSchool}  ref={schoolSelectionBox} className="browser-default custom-select">
                    <option value="none">Select</option>
                    {schoolStore.schools.map(school => (
                         <option key={school.name} value={school.name}>{school.name}</option>
                    ))}
                   
                </select>
                {selectedSchool?.name !== "none" ? <MDBBtn className="mt-4" color="success" onClick={startSurvey}> Start Survey </MDBBtn> : null}
            </div>
    )
    
}

export default observer(SchoolSelection);