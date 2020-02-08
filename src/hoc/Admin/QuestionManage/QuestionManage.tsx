import React, { useState, useContext } from 'react'
import { MDBRow, MDBBtn, MDBCol, MDBIcon, MDBBadge } from 'mdbreact';
import Modal from '../../../components/UI/Modal/Modal';
import QuestionForm from './QuestionForm/QuestionForm';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../stores/rootStore';
import classes from './QuestionManage.module.css';

const QuestionManage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const rootStore = useContext(RootStoreContext);
    const {questions, removeQuestion} = rootStore.questionStore;

    const modalClosedHandler = () => {
        setIsModalOpen(false);
    }

    const removeQuestionHandler = (questionKey: string) => {
        if (window.confirm("Are you sure you want to remove this question?")){
            removeQuestion(questionKey);
        }
    }

    return (
        <div className="px-3">
            <MDBRow className="mt-2 mb-4" end>
                <MDBBtn gradient="aqua"  onClick={()=> setIsModalOpen(true)}><MDBIcon far icon="question-circle mr-2" />ADD NEW QUESTION</MDBBtn>
            </MDBRow>

            <MDBRow>
                {questions.filter(q => q.type == "yesno").map(question => {
                    return (
                        <MDBCol  key={question.id}  md="6" className="my-2">
                             <div className={[classes.QuestionCard , "rounded z-depth-1 p-3 d-flex"].join(" ")}>
                                <h5 className="my-auto">{question.content}</h5>
                                <MDBBadge pill color="success py-2 ml-3">{question.type}</MDBBadge>
                                <MDBIcon 
                                    icon="window-close" 
                                    size="2x" 
                                    className={[classes.DeleteSchoolBtn, 'text-danger'].join(" ")}
                                    onClick={()=> removeQuestionHandler(question.key!)}
                                    />
                            </div>
                        </MDBCol>

                       
                    )
                })}
            </MDBRow>
            <hr/>
            <MDBRow>
                {questions.filter(q => q.type == "rating").map(question => {
                    return (
                        <MDBCol  key={question.id}  md="6" className="my-2">
                             <div className={[classes.QuestionCard , "rounded z-depth-1 p-3 d-flex"].join(" ")}>
                                <h5 className="my-auto">{question.content}</h5>
                                <MDBBadge pill color="warning py-2 ml-3">{question.type}</MDBBadge>
                                <MDBIcon 
                                    icon="window-close" 
                                    size="2x" 
                                    className={[ classes.DeleteSchoolBtn, 'text-danger'].join(" ")}
                                    onClick={()=> removeQuestionHandler(question.key!)}
                                    />
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
