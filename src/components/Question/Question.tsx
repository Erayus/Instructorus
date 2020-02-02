import {MDBBtn, MDBTypography} from 'mdbreact';
import React from 'react';
import RatingScale from '../RatingScale/RatingScale';

interface IProps{
    id: string;
    content: string;
    type: string;
    onResponded: (id: string, type: string, response: string | number | undefined) => void;
}

const question: React.FC<IProps> = (props) => {

    const questionAnsweredHandler = (response: string | number | undefined) => {
        props.onResponded(props.id, props.type, response)
    }

    let questionBody = null;
    switch(props.type) {
        case 'yesno':
            questionBody = (
                <React.Fragment>
                    <MDBBtn color="danger" onClick={()=> questionAnsweredHandler('No')}>No</MDBBtn>
                    <MDBBtn color="success" onClick={()=> questionAnsweredHandler('Yes')}>Yes</MDBBtn>
                </React.Fragment>    
            );
            break;
        case 'rating':
            questionBody = (
                <React.Fragment>
                    <RatingScale sizeInPixel="40px" onRated={questionAnsweredHandler}/>
                </React.Fragment>
                   
            )
            break;
        default:
            alert('Unsupported Question Type')
    }

    return (
        <div>
            <h3 style={{fontSize: "24px", fontWeight: "bolder"}}>{props.content}</h3>
            {questionBody}
        </div>
    )
}

export default question;