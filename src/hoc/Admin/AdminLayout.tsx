import React, {Component} from 'react';
import classes from './AdminLayout.module.css';
import SideNav from '../../components/Navigation/SideNav/SideNav.component';
import TopNav from '../../components/Navigation/TopNav/TopNav.component';
import { Switch, Route } from 'react-router';
import InstructorsReports from './InstructorsReport/InstructorsReports';
import SchoolsReport from './SchoolsReport/SchoolsReport';
import UsersManagement from './UsersManagement/UsersManagement';

const AdminLayout = () => {
        return (
            <div className={classes.AdminLayout}>
                 <SideNav/>
                    <div className="main-content">
                        <TopNav/>
                        <Switch>
                        
                        </Switch>
                    </div>
            </div>
        )
}

export default AdminLayout;