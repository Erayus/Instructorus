import React from 'react';
import Logo from '../../assets/erayus-logo.png';
import classes from './SideNav.module.css';
import {NavLink} from 'react-router-dom'
import { MDBIcon } from "mdbreact";

const SideNav = (props) => {
    return  (
        <React.Fragment>
            <div className={classes.SideNav}>
                <div className="pt-2"style={{height: '67px', borderBottom: '2px solid #212121'}}>
                    <h2 style={{fontFamily: "Teko, sans-serif", fontSize: '40px'}}>Erayus</h2>
                </div>
                <div className={classes.Logo}>
                    <img className="mb-3" src={Logo} alt="Logo" style={{width: '80%', fontWeight: 'bolder'}}/> 
                </div>
                <nav>
                   <ul>
                       <li>
                            <NavLink to="/" exact activeClassName={classes.active}>
                                <MDBIcon icon="chart-line" className="mr-2"/> INSTRUCTORS     
                            </NavLink>
                        </li>
                       <li>
                            <NavLink to="/speed-report" activeClassName={classes.active}>
                                <MDBIcon fab icon="cloudscale" className="mr-2"/>SCHOOLs
                            </NavLink>
                        </li>
                   </ul>
                </nav>
            </div>
        </React.Fragment>
    
    )
}

export default SideNav;