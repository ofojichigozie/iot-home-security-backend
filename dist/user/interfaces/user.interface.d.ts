export interface User {
    _id?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    country: string;
    UUC: string;
    PIN: string;
    securityStatus: "CALM" | "TENSED";
    createdAt?: Date;
    updatedAt?: Date;
}
