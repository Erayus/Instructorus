import React, {Component} from 'react';
import classes from './AdminLayout.module.css';
import SideNav from '../../components/Navigation/SideNav/SideNav.component';
import TopNav from '../../components/Navigation/TopNav/TopNav.component';
import { Switch, Route } from 'react-router';
import InstructorsReports from './InstructorsReport/InstructorsReports';
import SchoolsReport from './SchoolsReport/SchoolsReport';
import Management from './Manage/Manage';

const AdminLayout = () => {
        return (
            <div className={classes.AdminLayout}>
                 <SideNav/>
                    <div className={classes.AdminContent}>
                        <TopNav/>
                        <Switch>
                            <Route path="/admin/instructors-report" component={InstructorsReports}/>
                            <Route path="/admin/schools-report" component={SchoolsReport}/>
                            <Route path="/admin/manage" component={Management}/>
                        </Switch>
                    </div>
            </div>
        )
}

export default AdminLayout;