import React, { useContext, useState, FormEvent, SyntheticEvent } from 'react'
import { MDBInput, MDBBtn, MDBIcon } from 'mdbreact'

import uuid4 from 'uuid/v4';
import QuestionStore from '../../../../stores/questionStore';
import { IQuestion } from '../../../../models/question';

interface IProps {
    onQuestionAdded: () => void;
}

const QuestionForm :React.FC<IProps> = ({onQuestionAdded}) => {
    const initialQuestionForm = {
        id: '',
        type: '',
        content: ''
    }
    const [question, setQuestion] = useState<IQuestion>(initialQuestionForm);
    const questionStore = useContext(QuestionStore);


    const addQuestionHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let newQuestion = {
            ...question,
            id: uuid4()
        }
        questionStore.addQuestion(newQuestion);
        setQuestion(initialQuestionForm); 
        onQuestionAdded();
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
                <select className="browser-default custom-select" name="type" onChange={inputHandler}>
                    <option>Choose question type</option>
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
