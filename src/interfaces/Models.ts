import { SessionType } from "./ServicePayload";
import { SignInResponse } from "./ServiceResponse";

export type User = {
    createdCampaign?: Campaign[];
    playedCampaign?: Campaign[]
    characters?: Character[];
} & SignInResponse;

export type Campaign = {
    id: string;
    id_mestre: string;
    titulo: string;
    id_foto: string;
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
    id: number;
    id_campanha:number;
    id_campanha_mestre:number;
    titulo:string;
    data:string;
    descricao:string;
    tipo_sessao:SessionType;
    fixada:boolean;
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
    id_foto:string;
    nome:string;
    descricao:string;
    tipo_sistema: SystemType
}

export type SystemRule = {
    id:number;
    id_sistema:number;
    titulo:string;
    descricao:string;
}

export type SystemType = "PUBLICO" | "PRIVADO"

export type CharacterSheet = {
    system: System;
}

export type SystemMechanic = {
    id:number;
    id_sistema:number;
    id_sistema_criador:number;
    nome:string;
    descricao:string;
    acoes:string;
    efeitos:string;
}

export type CharacterRegister = {
    id:number;
    id_usuario:number;
    id_campanha:number;
    id_campanha_mestre:number;
    nome:string;
    id_foto:string;
}

export type SheetTab = {
    id:number;
    id_sistema:number;
    id_sistema_criador:number;
    nome:string;
}

export type SheetSubTab = {
    id:number;
    id_aba_ficha:number;
    id_sistema:number;
    id_sistema_criador:number;
    nome:string;
    tipo_sub_aba_ficha:SheetSubTabType;
}

export type SheetSubTabType = "TEXTO" | "INTEIRO" | "DADO";

export type Folder = {
    id: number;
    id_usuario: number;
    id_campanha: number;
    id_campanha_mestre: number;
    id_pacote_pai: number|null;
    nome: string;
    publica: boolean;
}