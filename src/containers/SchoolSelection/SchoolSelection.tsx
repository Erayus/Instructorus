import React, {useState, useEffect, useRef, useContext, ChangeEvent} from 'react';
import classes from "./SchoolSelection.module.css";
import { MDBBtn } from 'mdbreact';
import { RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ISchool } from '../../models/school';
import { RootStoreContext } from '../../stores/rootStore';

const SchoolSelection: React.FC<RouteComponentProps> =  ({history}) => {
    const initialSchoolObj = {id:"", name: "none", logoUrl: ""};
    const schoolSelectionBox = useRef<HTMLSelectElement>(null);
    const [selectedSchool, setSelectedSchool] = useState<ISchool>(initialSchoolObj);
    const rootStore = useContext(RootStoreContext);

    const { schools} = rootStore.schoolStore;

    useEffect(() => {
        const selectedSchoolFromLS:any = localStorage.getItem('selectedSchool');
        
        selectedSchoolFromLS === "none" || !selectedSchoolFromLS ? setSelectedSchool(initialSchoolObj)
        : setSelectedSchool(schools.filter(school => school.name === selectedSchoolFromLS)[0]);
    
        if (schoolSelectionBox.current) {
            schoolSelectionBox.current!.value = selectedSchoolFromLS;
        }
    }, [rootStore, schools.length])


    const onSelectSchool = (event: ChangeEvent<HTMLSelectElement>) => {
        const schoolName = event.target.value;
        localStorage.setItem('selectedSchool', event.target.value );
        schoolName !== "none" ? setSelectedSchool(schools.filter(school => school.name === event.target.value)[0]) 
        : setSelectedSchool(initialSchoolObj) 
    }
    const startSurvey = () => {
        history.push('/survey/' + selectedSchool.id);
    }
    
    return (
            <div className={[classes.schoolSelection, "z-depth-2 text-center"].join(" ")}>
                <h1 style={{fontWeight: "bolder"}}>INSTRUCTORUS</h1>
                <hr></hr>
                <h5>{selectedSchool?.name !== "none" ? "You have selected" : "Please select a school" }</h5>
                {
                    schools.length > 0 ? (
                        <React.Fragment>
                        <select onChange={onSelectSchool}  ref={schoolSelectionBox} className="browser-default custom-select">
                            <option value="none">Select</option>
                            {schools.map(school => (
                                <option key={school.name} value={school.name}>{school.name}</option>
                            ))}
                        </select>
                        </React.Fragment>
                    ) : <div>Loading...</div>
                }
                {selectedSchool?.name !== "none"  && schools.length > 0  ? <MDBBtn className="mt-4" color="success" onClick={startSurvey}> Start Survey </MDBBtn> : null }

                
            </div>
    )
    
}

export default observer(SchoolSelection);