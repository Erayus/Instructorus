import firebase from "../firebase";
import {observable, action} from 'mobx';
import { createContext } from "react";
import { ISchool } from "../models/school";

class SchoolStore {
    @observable schools: ISchool[] = [];
    private schoolRef = firebase.db.ref('schools');

    @action loadSchools =  () => {
        this.schoolRef.on('value', (snapshot : any) => 
        {   
            let loadedSchools: ISchool[] = [];
            snapshot.forEach((childSnapshot: any) => {
                // var childKey = childSnapshot.key;
                loadedSchools.push(childSnapshot.val());
            });
            this.schools = loadedSchools;
        })
    }  

    @action addSchool = async (school: ISchool) => {

        await this.schoolRef.push(school); 
        this.schools.push(school);
    }
    @action removeSchool = async (id: string) => {
        const deletingSchool = this.schools.splice( this.schools.findIndex(s => s.id  === id),1)[0];
        this.schoolRef.remove(deletingSchool);
    }
}

export default createContext(new SchoolStore());