import React, { useEffect, useContext } from 'react';
import classes from './AdminLayout.module.css';
import SideNav from '../../components/Navigation/SideNav/SideNav.component';

import { Switch, Route, Redirect } from 'react-router';
import InstructorsReports from './InstructorsReport/InstructorsReports';
import SchoolsReport from './SchoolsReport/SchoolsReport';
import Management from './Manage/Manage';
import QuestionManage from './QuestionManage/QuestionManage';
import SchoolDetailedReport from './SchoolsReport/SchoolDetailedReport/SchoolDetailedReport';
import {RootStoreContext}  from '../../stores/rootStore';

const AdminLayout = () => {
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
            <div className={classes.AdminLayout}>
                 <SideNav/>
                    <div className={classes.AdminContent}>
                        {/* <TopNav/> */}
                        <Switch>
                            <Route path="/admin/instructors-report" component={InstructorsReports}/>
                            <Route path="/admin/schools-report/:schoolId" component={SchoolDetailedReport}/>
                            <Route path="/admin/schools-report" component={SchoolsReport}/>
                            <Route path="/admin/manage-questions" component={QuestionManage}/>
                            <Route path="/admin/manage" component={Management}/>
                            <Redirect from="/" to="/admin/schools-report"/>
                        </Switch>
                    </div>
            </div>
        )
}

export default AdminLayout;