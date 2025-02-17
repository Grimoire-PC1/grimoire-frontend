export type SignInPayload = {
    login: string;
    email: string;
    senha: string;
    nome: string;
    foto_url: string;
};

export type CreateNewCampaignPayload = {
    name: string;
    image: string;
    systemId: string;
    description: string;
};

export type CreateNewSystemPayload = {
    image: string;
    name: string;
    description: string;
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
    campaignId: string;
    name?: string;
    image?: string;
    systemId?: string;
    description?: string;
}

export type UpdateSystemPayload = {
    systemId: string;
    image: string;
    name: string;
    description: string;
}

export type UpdateUserPayload = {

}