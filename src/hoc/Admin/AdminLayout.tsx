import React, {Component} from 'react';
import classes from './AdminLayout.module.css';
import SideNav from '../../components/Navigation/SideNav/SideNav.component';
import TopNav from '../../components/Navigation/TopNav/TopNav.component';

const AdminLayout = () => {
        return (
            <div className={classes.AdminLayout}>
                 <SideNav/>
                    <div className="main-content">
                        <TopNav/>
                    </div>
            </div>
        )
}

export default AdminLayout;