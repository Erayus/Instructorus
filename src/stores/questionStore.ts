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
            let loadedQuestions: IQuestion[] = [];
            snapshot.forEach((childSnapshot: any) => {
                let question = {
                    ...childSnapshot.val(),
                    key: childSnapshot.key
                }
                loadedQuestions.push(question);
            });
            this.questions = loadedQuestions;
        })
    }  

    @action addQuestion = async (newQuestion: IQuestion) => {
        if (this.questions.some(question => question.content === newQuestion.content)) {
            alert('Question exists already');
        }else {
            await this.questionRef.push(newQuestion); 
        }
        
    }
    @action removeQuestion = async (key: string) => {
        this.questions.splice( this.questions.findIndex(s => s.key  === key),1);
        await this.questionRef.child(key).remove();
    }
}

// export default createContext(new QuestionStore());