export interface IFeedback {
    id: string;
    key?: string;
    type: string;
    response: string | number;
    questionId: string;
    instructorId: string;
    schoolId: string;
    dateGiven: Date;
}