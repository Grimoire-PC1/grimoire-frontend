import { SignInResponse } from "./ServiceResponse";

export type User = {
    createdCampaign: Campaign[];
    playedCampaign: Campaign[]
    characters: Character[];
} & SignInResponse;

export type Campaign = {
    id: string;
    name: string;
    image: string;
    system: System;
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

}

export type Character = {
    id: string;
    name: string;
    image: string;
    characterSheet: CharacterSheet;
}

export type System = {
    
}

export type CharacterSheet = {
    system: System;
}