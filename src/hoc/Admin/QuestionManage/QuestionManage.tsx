import React, { useState, useContext, useEffect } from 'react'
import QuestionStore from '../../../stores/questionStore';
import { MDBRow, MDBBtn, MDBCol, MDBIcon, MDBBadge } from 'mdbreact';
import Modal from '../../../components/UI/Modal/Modal';
import QuestionForm from './QuestionForm/QuestionForm';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../stores/rootStore';

const QuestionManage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const rootStore = useContext(RootStoreContext);
    const {questions} = rootStore.questionStore;

    // useEffect(()=> {
    
    //     // questionStore.loadQuestions();
    // }, []);

    const modalClosedHandler = () => {
        setIsModalOpen(false);
    }

    return (
        <div className="px-3">
            <MDBRow className="mt-2 mb-4" end>
                <MDBBtn gradient="aqua"  onClick={()=> setIsModalOpen(true)}><MDBIcon far icon="question-circle mr-2" />ADD NEW QUESTION</MDBBtn>
            </MDBRow>

            <MDBRow>
                {questions.map(question => {
                    return (
                        <MDBCol  key={question.id}  md="6" className="my-2">
                             <div className="rounded z-depth-1 p-3 d-flex">
                                <h5 className="my-auto">{question.content}</h5>
                                <MDBBadge pill color="warning py-2 ml-3">{question.type}</MDBBadge>
                            </div>
                        </MDBCol>

                       
                    )
                })}
            </MDBRow>
            
            <Modal
                title="Add New Question" 
                show={isModalOpen}
                modalClosed={modalClosedHandler}> 
                    <QuestionForm showStatus={isModalOpen} onQuestionAdded={()=> {setIsModalOpen(false)}} /> 
            </Modal>
    
        </div>
    )
}

export default observer(QuestionManage)
