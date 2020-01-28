import React, { useContext, useState, FormEvent } from 'react'
import { MDBInput, MDBBtn } from 'mdbreact'
import { ISchool } from '../../../../models/school';

import uuid4 from 'uuid/v4';
import {  RootStoreContext } from '../../../../stores/rootStore';

interface IProps {
    onSchoolAdded: () => void;
}

const SchoolForm :React.FC<IProps> = ({onSchoolAdded}) => {
    const initialSchoolForm = {
        id: '',
        name: '',
        logoUrl: ''
    }
    const [school, setSchool] = useState<ISchool>(initialSchoolForm);
    const rootStore = useContext(RootStoreContext);

    const {addSchool} = rootStore.schoolStore;



    const addSchoolHandler = () => {
        let newSchool = {
            ...school,
            id: uuid4()
        }
        addSchool(newSchool);
        setSchool(initialSchoolForm); 
        onSchoolAdded();
    }
    const inputHandler = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
        setSchool({...school, [name]: value})
    }

    return (
        <form>
        <div className="grey-text">
            <MDBInput
            label="School Name"
            icon="school"
            
            type="text"
            validate
            error="wrong"
            success="right"
            name="name"
            value={school.name}
            onInput={inputHandler}
            />
            <MDBInput
                label="Logo URL"
                icon="image"
                type="text"
                validate
                error="wrong"
                success="right"
                name="logoUrl"
                value={school.logoUrl}
                onInput={inputHandler}
            />
            </div>
            <div className="text-center pb-2 mt-2">
            <MDBBtn color="orange" onClick={addSchoolHandler}>
                Add
            </MDBBtn>
            </div>
      </form>
    )
}

export default SchoolForm
