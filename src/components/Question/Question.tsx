import {MDBBtn} from 'mdbreact';
import React from 'react';

interface IProps{
    id: string;
    type: string;
    responded: (id: string, type: string, response: string) => void;
}

const question: React.FC<IProps> = (props) => {

    const questionAnswered = (response: string) => {
        props.responded(props.id, props.type, response)
    }

    let questionBody = null;
    switch(props.type) {
        case 'yesno':
            questionBody = (
                <React.Fragment>
                    <MDBBtn color="danger" onClick={()=> questionAnswered('No')}>No</MDBBtn>
                    <MDBBtn color="success" onClick={()=> questionAnswered('Yes')}>Yes</MDBBtn>
                </React.Fragment>    
            );
            break;
        default:
            alert('Unsupported Question Type')
    }

    return (
        <div>
            <h4>{props.children}</h4>
            {questionBody}
        </div>
    )
}

export default question;