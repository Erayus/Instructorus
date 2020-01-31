import firebase from "../firebase";
import {observable, action, reaction} from 'mobx';
import { IFeedback } from "../models/feedback";
// import { createContext } from "react";
import { toJS } from "mobx";
import {RootStore} from "./rootStore";

export default class FeedbackStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore){
        this.rootStore = rootStore;


        reaction(
            () => this.feedback,
            (feedback) => {
                // console.log(feedback)
            }
        )
    }

    @observable feedback: IFeedback[] = [];
    @observable surveyingFeedback: IFeedback[] = [];
    private feedbackRef = firebase.db.ref('feedback');

    @action getFeedbackBySchoolId = (schoolId: string) =>  {
        if (this.feedback.length > 0){
            let feedbackBySchoolId = this.feedback.filter(feedback => feedback.schoolId === schoolId);
            // console.log(toJS(feedbackBySchoolId, {recurseEverything : true}))
            return feedbackBySchoolId;
        } else {
            console.log("No feedback given yet")
        }
    }

    @action getFeedbackForReport = (schoolId: string, questionId: string, questionType: string) => {
        if (this.feedback.length > 0) {
            let requestingFeedback = this.feedback.filter(feedback => feedback.schoolId === schoolId && feedback.questionId === questionId);
            // console.log(toJS(requestingFeedback, {recurseEverything : true}))
            return requestingFeedback;
        } else {

        }
    }

    @action loadFeedback =  () => {
        this.feedbackRef.on('value', (snapshot : any) => 
        {   
            let loadedFeedback: IFeedback[] = [];
            snapshot.forEach((childSnapshot: any) => {
                // var childKey = childSnapshot.key;
                loadedFeedback.push(childSnapshot.val());
            });
            this.feedback = loadedFeedback;
        })
    }  

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

// export default createContext(new FeedbackStore());