import React, { useState, useContext, useEffect } from 'react'
import QuestionStore from '../../../stores/questionStore';
import { MDBRow, MDBBtn, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBIcon } from 'mdbreact';
import Modal from '../../../components/UI/Modal/Modal';
import QuestionForm from './QuestionForm/QuestionForm';

const QuestionManage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const questionStore = useContext(QuestionStore);

    useEffect(()=> {
        questionStore.loadQuestions();
    }, [questionStore]);

    const modalClosedHandler = () => {
        setIsModalOpen(false);
    }
    

    return (
        <div className="px-3">
            <MDBRow className="mt-2 mb-4" end>
                <MDBBtn gradient="peach"  onClick={()=> setIsModalOpen(true)}><MDBIcon far icon="question-circle mr-2" />ADD NEW QUESTION</MDBBtn>
            </MDBRow>

            <MDBRow>
                {questionStore.questions.map(question => {
                    return (
                        <div></div>
                    )
                })}
            </MDBRow>
            
            <Modal
                title="Add New Question" 
                show={isModalOpen} 
                modalClosed={modalClosedHandler}> 
                    <QuestionForm onQuestionAdded={()=> {setIsModalOpen(false)}} /> 
            </Modal>
    
        </div>
    )
}

export default QuestionManage
