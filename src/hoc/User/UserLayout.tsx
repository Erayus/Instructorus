import React, { useContext, useEffect} from 'react';
import classes from "./UserLayout.module.css";
import {Route, Switch, RouteComponentProps} from 'react-router-dom' ;
import SchoolSelection from '../../containers/SchoolSelection/SchoolSelection';
import Survey from '../../containers/Survey/Survey';
import { RootStoreContext } from '../../stores/rootStore';
import SignUp from './SignUp/SignUp';
import Login from './Login/Login';
import { MDBBtn } from 'mdbreact';

const UserLayout: React.FC<RouteComponentProps>= ({history}) => {

    const rootStore = useContext(RootStoreContext);
    const {loadFeedback} = rootStore.feedbackStore;
    const { loadQuestions} = rootStore.questionStore;
    const {loadSchools} = rootStore.schoolStore;
    const {logOut, currentUser} = rootStore.userStore;
 
    useEffect(() => {
        loadSchools();
        loadQuestions();
        loadFeedback();
        console.log(currentUser);
    }, [loadFeedback, loadSchools, loadQuestions, currentUser]);
 
    const logOutHandler = () => {
        logOut().then(() => {
            history.replace('login')
        });
    }
    return (
        <div className={[classes.UserLayout, "peach-gradient"].join(" ")}>
            {currentUser ? <MDBBtn
                                color="danger"
                                className="float-right" 
                                onClick={logOutHandler}>Log Out</MDBBtn> 
                            : null}
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