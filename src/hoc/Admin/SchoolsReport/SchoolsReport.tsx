import React, { useState, useContext, useEffect, FormEvent } from 'react'
import { MDBInput, MDBBtn, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol } from 'mdbreact';

import Modal from '../../../components/UI/Modal/Modal';
import SchoolStore from '../../../stores/schoolStore'
import { ISchool } from '../../../models/school';
import SchoolForm from './SchoolForm/SchoolForm';
import { observer } from 'mobx-react-lite';

const SchoolsReport = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const schoolStore = useContext(SchoolStore);

    useEffect(()=> {
        schoolStore.loadSchools();
    }, [schoolStore]);

    const modalClosedHandler = () => {
        setIsModalOpen(false);
    }
    

    return (
        <div className="px-3">
            <MDBRow className="mt-2 mb-4" end>
                <MDBBtn gradient="peach"  onClick={()=> setIsModalOpen(true)}>ADD NEW SCHOOL</MDBBtn>
            </MDBRow>

            <MDBRow>
                {schoolStore.schools.map(school => {
                    return (

                        <MDBCol key={school.id} sm="12" md="4">
                             <MDBCard >
                                <MDBCardImage className="img-fluid mx-auto" src={school.logoUrl} waves style={{height: '200px'}} />
                                <MDBCardBody>
                                    <MDBCardTitle>{school.name}</MDBCardTitle>
                                 
                                <MDBBtn color="blue" className="mx-auto btn-block" >View</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>                 
                    )
                })}
            </MDBRow>
            
            <Modal
                title="Add A School" 
                show={isModalOpen} 
                modalClosed={modalClosedHandler}> 
                    <SchoolForm onSchoolAdded={()=> {setIsModalOpen(false)}} /> 
            </Modal>
    
        </div>
    )
}

export default observer(SchoolsReport)
