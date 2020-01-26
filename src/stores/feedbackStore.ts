import firebase from "../firebase";
import {observable, action, reaction} from 'mobx';
import { IFeedback } from "../models/feedback";
import { createContext } from "react";

class FeedbackStore {

    
    constructor(){
        reaction(
            () => this.surveyingFeedback,
            (surveyingFeedback) => console.log(surveyingFeedback)
        )
    }
    @observable feedback: IFeedback[] = [];
    @observable surveyingFeedback: IFeedback[] = [];
    private feedbackRef = firebase.db.ref('feedback');


    @action addFeedback = async (feedback: IFeedback) => {
       this.surveyingFeedback.push(feedback);
    }
    @action removeFeedback = async () => {
        this.surveyingFeedback.pop();
    }

    @action submitFeedback = async () => {
        this.surveyingFeedback.forEach(feedback => {
            this.feedbackRef.push(feedback);
        });
        this.surveyingFeedback = [];
    }
}

export default createContext(new FeedbackStore());