import firebase from "../firebase";
import {observable, action} from 'mobx';
// import { createContext } from "react";
import { IQuestion } from "../models/question";
import { RootStore } from "./rootStore";

export default class QuestionStore {

    rootStore: RootStore;
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @observable questions: IQuestion[] = [];
    private questionRef = firebase.db.ref('questions');

    @action loadQuestions =  () => {
        this.questionRef.on('value', (snapshot : any) => 
        {   
            let loadedSchools: IQuestion[] = [];
            snapshot.forEach((childSnapshot: any) => {
                // var childKey = childSnapshot.key;
                loadedSchools.push(childSnapshot.val());
            });
            this.questions = loadedSchools;
        })
    }  

    @action addQuestion = async (newQuestion: IQuestion) => {
        if (this.questions.some(question => question.content === newQuestion.content)) {
            alert('Question exists already');
        }else {
            await this.questionRef.push(newQuestion); 
        }
        
    }
    @action removeQuestion = async (id: string) => {
        const deletingQuestion = this.questions.splice( this.questions.findIndex(s => s.id  === id),1)[0];
        this.questionRef.remove(deletingQuestion);
    }
}

// export default createContext(new QuestionStore());