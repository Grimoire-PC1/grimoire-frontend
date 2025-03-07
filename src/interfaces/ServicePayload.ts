import { SystemType } from "./Models";

export type SignUpPayload = {
    login: string;
    email: string;
    senha: string;
    nome: string;
    id_foto: string;
};

export type SignInPayload = {
    login: string;
    senha: string;
};

export type CreateNewCampaignPayload = {
    titulo: string;
    id_foto: string;
    id_sistema: number;
    descricao: string;
};

export type CreateNewSystemPayload = {
    id_foto: string;
    nome: string;
    descricao: string;
}

export type TemporarySystemPayload = {
    payload: CreateNewSystemPayload;
    systemType: SystemType;
}

export type CreateNewCharacter = {
    image: string;
    name: string;
}

export type CreateNewSession = {
    title: string;
    description: string;
    date: string;
    presentPlayersIds: string
}

export type UpdateCampaignPayload = {
    novo_titulo?: string;
    nova_id_foto?: string;
    id_novo_sistema?: number;
    nova_descricao?: string;
}

export type TemporaryCampaignPayload = {
    payload: UpdateCampaignPayload;
    campaignId: number;
}

export type UpdateSystemPayload = {
    systemId: number;
    image: string;
    name: string;
    description: string;
}

export type NewRulePayload = {
    id_sistema: number;
    titulo: string;
    descricao: string;
}

export type UpdateRulePayload = {
    id_regra:number;
    titulo: string;
    descricao: string;
}

export type UpdateUserPayload = {

}

export type NewSessionPayload = {
    id_campanha:number;
    tipo_sessao:SessionType;
    titulo:string;
    data:string;
    descricao:string;
    fixada:boolean;
}

export type UpdateSessionPayload = {
    id_sessao:number;
    novo_tipo_sessao:SessionType;
    novo_titulo:string;
    nova_data:string;
    nova_descricao:string;
    fixada:boolean;
}


export type SessionType = "FUTURA" | "PASSADA"