import { Campaign, Character } from "./Models";

export type SignInResponse = {
    id: string;
    username: string;
    email: string;
    token: string;
};

export type GetCampaigsResponse = Campaign[];

export type GetCharactersResponse = Character[];