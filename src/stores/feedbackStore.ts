import firebase from "../firebase";
import {observable, action, reaction, toJS} from 'mobx';
import { IFeedback } from "../models/feedback";
// import { createContext } from "react";
import {RootStore} from "./rootStore";
import { act } from "react-dom/test-utils";

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
                let feedback = {
                    ...childSnapshot.val(),
                    key: childSnapshot.key
                }
                loadedFeedback.push(feedback);
            });
            this.feedback = loadedFeedback;
        })
    }  

    @action addFeedback = async (feedback: IFeedback) => {
       await this.surveyingFeedback.push(feedback);
    }
    @action undoFeedback = async () => {
        await this.surveyingFeedback.pop();
    }

    @action removeFeedback =  (schoolId: string) => {
        const removingFeedbackArray = this.feedback.filter( f => f.schoolId  === schoolId);
        removingFeedbackArray.forEach(async removingFeedback => {
            await this.feedbackRef.child(removingFeedback.key).remove();
        })
        this.feedback = this.feedback.filter( f => f.schoolId !== schoolId);
        
    }

    @action submitFeedback =  () => {
        this.surveyingFeedback.forEach(async feedback => {
            await this.feedbackRef.push(feedback);
        });
        this.surveyingFeedback = [];
    }
}

// export default createContext(new FeedbackStore());