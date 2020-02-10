import React, { useContext, useEffect} from 'react';
import classes from "./UserLayout.module.css";
import {Route, Switch} from 'react-router-dom' ;
import SchoolSelection from '../../containers/SchoolSelection/SchoolSelection';
import Survey from '../../containers/Survey/Survey';
import { RootStoreContext } from '../../stores/rootStore';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';

const UserLayout = () => {

    const rootStore = useContext(RootStoreContext);
    const {loadFeedback} = rootStore.feedbackStore;
    const { loadQuestions} = rootStore.questionStore;
    const {loadSchools} = rootStore.schoolStore;
 
    useEffect(() => {
        loadSchools();
        loadQuestions();
        loadFeedback();

    }, [loadFeedback, loadSchools, loadQuestions]);
 
    return (
        <div className={[classes.UserLayout, "peach-gradient"].join(" ")}>
            <Switch>
                <Route path="/survey/:schoolId" component={Survey} />
                <Route path="/complete-sign-up" exact component={SignUp} />
                <Route path="/login" exact component={Login} />
                <Route path="/" exact component={SchoolSelection} />
            </Switch>
        </div>
    )

}

export default UserLayout;