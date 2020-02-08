import React, { useState, useContext, useEffect } from 'react'
import {  MDBBtn, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBIcon } from 'mdbreact';

import Modal from '../../../components/UI/Modal/Modal';

import SchoolForm from './SchoolForm/SchoolForm';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { RootStoreContext } from '../../../stores/rootStore';
import classes from './SchoolsReport.module.css';


const SchoolsReport: React.FC<RouteComponentProps>= ({history}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const rootStore = useContext(RootStoreContext);
    const {schools, removeSchool} = rootStore.schoolStore;
    const {feedback} = rootStore.feedbackStore;

    useEffect(()=> {
        // schoolStore.loadSchools();
    }, [rootStore]);

    const modalClosedHandler = () => {
        setIsModalOpen(false);
    }
    const selectSchoolHandler = (schoolId: string) => {
        history.push("/admin/schools-report/"+ schoolId)
    }

    const removeSchoolHandler = (schoolId: string) => {
         if (window.confirm("Are you sure you want to remove this school?")) {
            removeSchool(schoolId);
        };

    }
    
    return (
        <div className="px-3">
            <MDBRow className="mt-2 mb-4" end>
                <MDBBtn gradient="aqua"  onClick={()=> setIsModalOpen(true)}>ADD NEW SCHOOL</MDBBtn>
            </MDBRow>
            <MDBRow className="mt-2 mb-5" end>
                <MDBCol>
                    <div className="z-depth-1 d-flex mb-3" >
                        <div className="deep-orange p-3 rounded mr-2">
                            <MDBIcon className="text-white" icon="school" size="3x"/>
                        </div>
                        <div className="p-3">
                            <h6 className="m-0">TOTAL SCHOOLS</h6>
                            <h4 className="m-0">{schools.length}</h4>
                        </div>
                    </div>
                </MDBCol>

                <MDBCol>
                    <div className="z-depth-1 rounded  mb-3">
                    <div className="z-depth-1  d-flex " >
                        <div className="cyan p-3 rounded mr-2">
                            <MDBIcon className="text-white" icon="comment" size="3x"/>
                        </div>
                        <div className="p-3">
                            <h6 className="m-0"> TOTAL FEEDBACK</h6>
                            <h4 className="m-0">{feedback.length}</h4>
                        </div>
                    </div>
                    </div>
                </MDBCol>

                <MDBCol>
                <div className="z-depth-1 rounded  mb-3">
                    <div className="z-depth-1  d-flex " >
                        <div className="green p-3 rounded mr-2">
                            <MDBIcon far className="text-white" icon="smile" size="3x"/>
                        </div>
                        <div className="p-3">
                            <h6 className="m-0"> SATISFACTION</h6>
                            <h4 className="m-0">72% <MDBIcon style={{color: 'green'}}icon="arrow-up" /></h4>
                        </div>
                    </div>
                    </div>
                </MDBCol>
                
            </MDBRow>
            <MDBRow>
                {schools.map(school => {
                    return (
                        <MDBCol key={school.key} sm="12" md="6" className="my-3">
                             <MDBCard className={classes.SchoolCard} >
                                <MDBIcon 
                                    icon="window-close" 
                                    size="2x" 
                                    className={[ classes.DeleteSchoolBtn, 'text-danger'].join(" ")}
                                    onClick={()=> removeSchoolHandler(school.key!)}
                                    />
                                <MDBCardImage 
                                    className={[classes.SchoolLogo, 'img-fluid mx-auto'].join(" ")} 
                                    src={school.logoUrl} waves style={{height: '200px'}} />
                                <MDBCardBody>
                                    <MDBCardTitle className="text-center">{school.name}</MDBCardTitle>
                                <MDBBtn color="orange" className="mx-auto btn-block" onClick={() => selectSchoolHandler(school.id)} >View</MDBBtn>
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
