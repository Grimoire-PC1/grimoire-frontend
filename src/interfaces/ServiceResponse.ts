import { Campaign, Character, System } from "./Models";

export type SignInResponse = {
    login?: string;
    email?: string;
    nome?: string;
    id_foto?: string;
};

export type GetCampaigsResponse = Campaign[];

export type GetCharactersResponse = Character[];

export type GetSystemsResponse = System[];