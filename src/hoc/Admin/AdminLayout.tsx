import React from 'react';
import classes from './AdminLayout.module.css';
import SideNav from '../../components/Navigation/SideNav/SideNav.component';

import { Switch, Route, Redirect } from 'react-router';
import InstructorsReports from './InstructorsReport/InstructorsReports';
import SchoolsReport from './SchoolsReport/SchoolsReport';
import Management from './Manage/Manage';
import QuestionManage from './QuestionManage/QuestionManage';

const AdminLayout = () => {
        return (
            <div className={classes.AdminLayout}>
                 <SideNav/>
                    <div className={classes.AdminContent}>
                        {/* <TopNav/> */}
                        <Switch>
                            <Route path="/admin/instructors-report" component={InstructorsReports}/>
                            <Route path="/admin/schools-report" component={SchoolsReport}/>
                            <Route path="/admin/manage-questions" component={QuestionManage}/>
                            <Route path="/admin/manage" component={Management}/>
                            <Redirect from="/" to="/admin/instructors-report"/>
                        </Switch>
                    </div>
            </div>
        )
}

export default AdminLayout;