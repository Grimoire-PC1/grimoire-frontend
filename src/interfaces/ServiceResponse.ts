import { Campaign, Character, System } from "./Models";

export type SignInResponse = {
    id: string;
    username: string;
    email: string;
    token: string;
};

export type GetCampaigsResponse = Campaign[];

export type GetCharactersResponse = Character[];

export type GetSystemsResponse = System[];