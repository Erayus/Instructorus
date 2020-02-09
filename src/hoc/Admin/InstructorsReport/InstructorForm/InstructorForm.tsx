import React, { FormEvent, useState, useContext } from 'react'
import { MDBIcon, MDBBtn, MDBInput } from 'mdbreact'
import { IUser } from '../../../../models/user';
import { RootStoreContext } from '../../../../stores/rootStore';

interface IProps {
    onInstructorAdded: () => void;
}

const InstructorForm:React.FC<IProps> = ({onInstructorAdded}) => {


    const [newInstructorEmail, setNewInstructorEmail] = useState<string>("");
    const rootStore = useContext(RootStoreContext);
    const {registerUser} = rootStore.userStore;
    
    const addInstructorHandler = (e: any) => {
        e.preventDefault();
        registerUser(newInstructorEmail, "instructor");
    }
    
    const inputHandler = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {value} = e.currentTarget;
        setNewInstructorEmail(value)
    }


    return (
        <form onSubmit={addInstructorHandler}> 
        <div className="grey-text text-left">        
            <MDBInput
                label="Email"
                icon="envelope"
                type="email"
                validate
                error="wrong"
                success="right"
                name="email"
                value={newInstructorEmail}
                onInput={inputHandler}
            />
            <div className="text-center pb-2 mt-2">
            <MDBBtn color="orange" type="submit">
                Add
            </MDBBtn>
            </div>
        </div>
      </form>
    )
}

export default InstructorForm
