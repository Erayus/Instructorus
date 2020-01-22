import React, {Component} from 'react';
import classes from './AdminLayout.module.css';
import SchoolInfo from '../../components/SchoolInfo/SchoolInfo';

class AdminLayout extends Component {
    render(){
        return (
            <div className={classes.AdminLayout}>
                <SchoolInfo 
                    logo="https://upload.wikimedia.org/wikipedia/commons/8/80/GGS_Crest.png"
                    name="Geelong Grammar Primary School"
                    location="50 Biddlecombe Ave, Corio VIC 3214"   
                />
            </div>
        )
    }
}

export default AdminLayout;