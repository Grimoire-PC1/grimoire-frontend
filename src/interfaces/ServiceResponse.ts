import { Campaign } from "./Models";

export type SignInResponse = {
    id: string;
    username: string;
    email: string;
    token: string;
};

export type GetCampaigsResponse = Campaign[];