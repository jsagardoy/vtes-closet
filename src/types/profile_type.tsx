export type rolType = 'prince' | 'user';

export interface ProfileType{
    email: string;
    uid: string;
    name: string;
    vken: string;
    rol: rolType;
}