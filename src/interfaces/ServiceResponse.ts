import { Campaign, Character, System } from "./Models";

export type SignInResponse = {
    id?: number;
    login?: string;
    email?: string;
    nome?: string;
    id_foto?: string;
};

export type GetCampaigsResponse = Campaign[];

export type GetCharactersResponse = Character[];

export type GetSystemsResponse = System[];

export type PostParticipanteResponse = {
    id_usuario: Number,
    id_campanha: Number,
    nome_usuario: string,
    id_foto_usuario: string
}