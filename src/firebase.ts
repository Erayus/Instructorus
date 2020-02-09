import firebaseApp from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import firebaseConfiguration from "./config";

class Firebase {
    public db: any;
    public auth: any;
    constructor(){
        firebaseApp.initializeApp(firebaseConfiguration);
        this.db = firebaseApp.database();
        this.auth = firebaseApp.auth();
    }
}

export default new Firebase();