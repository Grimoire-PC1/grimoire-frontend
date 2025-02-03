export type ServicePayload = {
    email: string;
    password: string;
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