import { createContext } from "react";
import SchoolStore from "../stores/schoolStore";
import FeedbackStore from "../stores/feedbackStore";
import QuestionStore from "../stores/questionStore";
import UserStore from "./userStore";

export class RootStore {
    feedbackStore: FeedbackStore;
    questionStore: QuestionStore;
    schoolStore: SchoolStore;
    userStore: UserStore;

    constructor(){
        this.feedbackStore = new FeedbackStore(this);
        this.questionStore = new QuestionStore(this);
        this.schoolStore = new SchoolStore(this);
        this.userStore = new UserStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore())