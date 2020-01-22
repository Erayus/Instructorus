import React from 'react';
import {Link} from 'react-router-dom';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';


const schoolInfo = (props) => {
  return (
    <MDBCol>
      <MDBCard style={{ width: "22rem" }}>
        <MDBCardImage 
            className="img-fluid" 
            src={props.logo} 
            waves />
        <MDBCardBody>
          <MDBCardTitle>{props.name}</MDBCardTitle>
          <MDBCardText>
            <strong>Location:</strong> {props.location}
          </MDBCardText>
          <Link to={"/admin/report/" + props.name}>
            <MDBBtn>
                View Report
            </MDBBtn>
          </Link>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  )
}

export default schoolInfo;