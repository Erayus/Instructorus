import React, {Component} from 'react';
import classes from "./UserLayout.module.css";
import {Route, Switch} from 'react-router-dom' ;
import SchoolSelection from '../../containers/SchoolSelection/SchoolSelection';
import Survey from '../../containers/Survey/Survey';

class UserLayout extends Component {

    componentDidMount(){
      
    }


    render(){
        return (
            <div className={classes.UserLayout}>
                <Switch>
                    <Route path="/survey/:surveyingSchool" component={Survey} />
                    <Route path="/" exact component={SchoolSelection} />
                </Switch>
                
            </div>
        )
    }
}

export default UserLayout;