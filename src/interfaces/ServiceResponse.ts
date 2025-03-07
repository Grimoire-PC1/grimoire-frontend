import { Campaign, Character, System } from "./Models";

export type SignInResponse = {
    username: string;
    email: string;
    token: string;
    id_foto: string;
};

export type GetCampaigsResponse = Campaign[];

export type GetCharactersResponse = Character[];

export type GetSystemsResponse = System[];