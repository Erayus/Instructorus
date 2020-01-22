import {MDBBtn} from 'mdbreact';
import React from 'react';
const question = (props) => {
    const questionAnswered = (response) => {
        props.responsed(props.id, response)
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