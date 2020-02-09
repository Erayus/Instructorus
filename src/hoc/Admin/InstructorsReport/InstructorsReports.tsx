import React, { useState } from 'react';
import { MDBRow, MDBBtn, MDBIcon } from 'mdbreact';
import Modal from '../../../components/UI/Modal/Modal';
import InstructorForm from './InstructorForm/InstructorForm';


const InstructorsReports: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modalClosedHandler = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="p-3 text-center ">
            <MDBRow className="mt-2 mb-4" end>
                <MDBBtn gradient="aqua"  onClick={()=> setIsModalOpen(true)}>
                    <MDBIcon icon="users" className="mr-2"/>
                    REGISTER INSTRUCTOR
                </MDBBtn>
            </MDBRow>
            <Modal
                title="REGISTER INSTRUCTOR" 
                show={isModalOpen} 
                modalClosed={modalClosedHandler}> 
                    <InstructorForm onInstructorAdded={()=> {setIsModalOpen(false)}} /> 
            </Modal>

    
        </div>
    )
}

export default InstructorsReports;