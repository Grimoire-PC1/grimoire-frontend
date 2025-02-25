import { SystemType } from "./Models";

export type SignUpPayload = {
    login: string;
    email: string;
    senha: string;
    nome: string;
    foto_url: string;
};

export type SignInPayload = {
    login: string;
    senha: string;
};

export type CreateNewCampaignPayload = {
    titulo: string;
    foto_url: string;
    id_sistema: number;
    descricao: string;
};

export type CreateNewSystemPayload = {
    foto_url: string;
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
    nova_foto_url?: string;
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

export type UpdateUserPayload = {

}