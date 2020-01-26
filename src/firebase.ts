import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfiguration from "./config";

class Firebase {
    public db: any;
    constructor(){
        firebaseApp.initializeApp(firebaseConfiguration);
        this.db = firebaseApp.database();
    }
}

export default new Firebase();