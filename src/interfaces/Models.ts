import { SignInResponse } from "./ServiceResponse";

export type User = {
    createdCampaign: Campaign[];
    playedCampaign: Campaign[]
    characters: Character[];
} & SignInResponse;

export type Campaign = {
    id: string;
    gameMasterId: string;
    name: string;
    image: string;
    system: string;
    description: string;
    players: Player[];
    diary: Diary;
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
    image:string;
    name:string;
    description:string;
}

export type CharacterSheet = {
    system: System;
}