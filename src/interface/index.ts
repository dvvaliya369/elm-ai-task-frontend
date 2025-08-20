export interface IUser {
    _id: string;
    fullName: string;
    email: string;
    profilePhoto: Record<string, unknown>;
}