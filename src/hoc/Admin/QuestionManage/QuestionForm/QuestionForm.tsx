import React, { useContext, useState, FormEvent, SyntheticEvent, SelectHTMLAttributes, useRef, useEffect } from 'react'
import { MDBInput, MDBBtn, MDBIcon } from 'mdbreact'

import uuid4 from 'uuid/v4';
import QuestionStore from '../../../../stores/questionStore';
import { IQuestion } from '../../../../models/question';

interface IProps {
    onQuestionAdded: () => void;
    showStatus: boolean
}

const QuestionForm :React.FC<IProps> = ({onQuestionAdded, showStatus}) => {

    const currentQuestionType = useRef<HTMLSelectElement>(null);
    const initialQuestionForm = {
        id: '',
        type: '',
        content: ''
    }
    const [question, setQuestion] = useState<IQuestion>(initialQuestionForm);
    const questionStore = useContext(QuestionStore);

    useEffect(()=> {
        setQuestion({...question, type: currentQuestionType.current!.value});  
    },[question,showStatus])

    const addQuestionHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (question.content === "") {
            alert("Please pick a question type")
        }else {
            let newQuestion = {
                ...question,
                id: uuid4()
            }
            questionStore.addQuestion(newQuestion);
            setQuestion(initialQuestionForm);
            onQuestionAdded();
        }
       
    }
    const inputHandler = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.currentTarget;
        setQuestion({...question, [name]: value})
    }

    return (
        <form > 
        <div className="grey-text">
            <div className="d-flex">
                <MDBIcon far icon="list-alt mr-2" size="2x"/>
                <select ref={currentQuestionType} className="browser-default custom-select" name="type" onChange={inputHandler}>
                    <option value="">Choose question type</option>
                    <option value="yesno">Yes/No</option>
                    <option value="rating">Rating</option>
                    <option value="comment">Comment</option>
                </select>
            </div>
            
            <MDBInput
                label="Content"
                icon="spell-check"
                type="text"
                validate
                error="wrong"
                success="right"
                name="content"
                value={question.content}
                onInput={inputHandler}
            />
            </div>
            <div className="text-center pb-2 mt-2">
            <MDBBtn color="orange" onClick={addQuestionHandler}>
                Add
            </MDBBtn>
            </div>
      </form>
    )
}

export default QuestionForm
