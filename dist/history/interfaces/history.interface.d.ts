export interface History {
    id?: string;
    userId: string;
    type: string;
    address: string;
    city: string;
    state: string;
    country: string;
    createdAt?: Date;
}
