export interface IFeedback {
    id: string;
    type: string;
    response: string | number;
    questionId: string;
    instructorId: string;
    schoolId: string;
    dateGiven: Date;
}