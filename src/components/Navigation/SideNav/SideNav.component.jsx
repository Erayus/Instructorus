import React from 'react';
import Logo from '../../../assets/Junior Engineers_HR_CMYK.png';
import classes from './SideNav.module.css';
import {NavLink} from 'react-router-dom'
import { MDBIcon } from "mdbreact";

const SideNav = (props) => {
    return  (
        <React.Fragment>
            <div className={[classes.SideNav, "aqua-gradient", "text-center"].join(" ")}>
                <div className="pt-2"style={{height: '50px', borderBottom: '2px solid white'}}>
                    <h2 style={{fontFamily: "Teko, sans-serif", fontSize: '26px'}}>INSTRUCTORUS</h2>
                </div>
                <div className={classes.Logo}>
                    <img className="mb-3 mt-2" src={Logo} alt="Logo" style={{width: '80%', fontWeight: 'bolder'}}/> 
                </div>
                <nav>
                   <ul>
                        <li>
                            <NavLink to="/admin/schools-report" activeClassName={classes.active}>
                                <MDBIcon icon="school" className="mr-2"/>SCHOOLS
                            </NavLink>
                        </li>
                       <li>
                            <NavLink to="/admin/instructors-report" exact activeClassName={classes.active}>
                                 <i className="fas fa-chalkboard-teacher mr-2"></i> INSTRUCTORS     
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/manage-questions" activeClassName={classes.active}>
                                <MDBIcon icon="question-circle" /> MANAGE QUESTIONS
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/admin/manage" activeClassName={classes.active}>
                                <i className="fas fa-toolbox mr-2"></i> MANAGE
                            </NavLink>
                        </li>
                   </ul>
                </nav>
            </div>
        </React.Fragment>
    
    )
}

export default SideNav;