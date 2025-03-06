import { SignInResponse } from "./ServiceResponse";

export type User = {
    createdCampaign: Campaign[];
    playedCampaign: Campaign[]
    characters: Character[];
} & SignInResponse;

export type Campaign = {
    id: string;
    id_mestre: string;
    titulo: string;
    foto_url: string;
    id_sistema: System;
    descricao: string;
    jogadores?: Player[];
    diario?: Diary;
}

export type Diary = {
    fixedSessions: Session[];
    pastSessions: Session[];
    futureSessions: Session[];
}

export type Session = {
    id: string;
    title: string;
    description: string;
    date: string;
    presentPlayers: Player[];
}

export type Player = {
    id: string;
    characters: Character[]
}

export type Character = {
    id: string;
    name: string;
    image: string;
    characterSheet: CharacterSheet;
}

export type System = {
    id: number;
    id_criador: number;
    foto_url:string;
    nome:string;
    descricao:string;
    tipo_sistema: SystemType
}

export type SystemType = "PUBLICO" | "PRIVADO"

export type CharacterSheet = {
    system: System;
}