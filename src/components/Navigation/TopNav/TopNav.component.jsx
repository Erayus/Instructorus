import React from "react";
import {MDBNavbar,
MDBIcon, MDBNavbarBrand, MDBNavbarNav, MDBNavItem
} from "mdbreact";
import moment from "moment";
import classes from './TopNav.module.css';
const  topNav = (props) => {

  return (
      <MDBNavbar style={{backgroundColor: "#fc6262"}}  dark expand="md" className="mb-5" >
          <MDBNavbarNav>
              <MDBNavbarBrand>
                <strong className="white-text pl-5" style={{fontSize: '28px', fontFamily: 'Audiowide'}}>JUNIOR ENGINEERS</strong>
            </MDBNavbarBrand>
          </MDBNavbarNav>
          <MDBNavbarNav right className={classes.RightNav}>
            <MDBNavItem  className="rounded aqua-gradient z-depth-2" style={{color: 'white', width: '150px', padding: '10px 0px'}}>
                <MDBIcon far icon="calendar-alt" className="mr-1" /> {moment().format("MMM Do YY")}
            </MDBNavItem>
          </MDBNavbarNav>
      </MDBNavbar>
    );
}


export default topNav;