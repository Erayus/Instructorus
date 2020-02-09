export interface IUser {
    uid: string;
    key?: string;
    displayName: string;
    email: string;
    type: string;
    token?: string;
}