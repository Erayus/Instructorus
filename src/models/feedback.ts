export interface IFeedback {
    id: string;
    key?: string;
    type: string;
    response: string | number | undefined;
    questionId: string;
    instructorId: string;
    schoolId: string;
    dateGiven: Date;
}
