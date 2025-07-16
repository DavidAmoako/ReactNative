// filepath: c:\Users\Escobar\Documents\Programing\ReactNative\TheHandyMan-ReactNative\src\types\user.ts
export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
    userType: 'user' | 'worker' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}