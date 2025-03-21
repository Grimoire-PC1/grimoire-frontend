import { FileType, SheetSubTabType, SystemType } from "./Models";

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
    id_nova_foto: string;
    novo_nome: string;
    nova_descricao: string;
}

export type TemporaryUpdateSystemPayload = {
    payload: UpdateSystemPayload;
    id_sistema: number;
    tipo_sistema: SystemType;
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
    nova_senha: string,
    novo_email: string,
    novo_nome: string,
    id_nova_foto: string
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

export type NewMechanicPayload = {
    nome:string;
    descricao:string;
    acoes:string[];
    efeitos:string[];
}

export type UpdateMechanicPayload = {
    id_mecanica:number;
    novo_nome:string;
    nova_descricao:string;
    novas_acoes:string[];
    novos_efeitos:string[];
}

export type CreateSheetTabPayload = {
    nome:string;
}

export type UpdateSheetTabPayload = {
    id_aba_ficha:number;
    nome:string;
}

export type CreateSheetSubTabPayload = {
    id_aba_ficha:number;
    tipo_sub_aba_ficha:SheetSubTabType;
    nome:string;
}

export type UpdateSheetSubTabPayload = {
    id_sub_aba_ficha:number;
    novo_nome:string;
}

export type CreateCharacterPayload = {
    id_campanha:number;
    nome:string;
    id_foto:string;
}

export type GetCharacterSheetInfoPayload = {
    id_personagem:number;
    id_aba_ficha:number;
    id_sub_aba_ficha:number;
}

export type CharacterSheetInfo = {
    id:number;
    id_personagem:number;
    id_sub_aba_ficha:number;
    nome_sub_aba_ficha:string;
    tipo_sub_aba_ficha:SheetSubTabType;
    conteudo:string[];
}

export type CreateOrUpdateFieldPayload = {
    id_conteudo_ficha: number;
    novo_conteudo: string[];
    id_personagem: number;
    id_sub_aba_ficha: number;
    conteudo: string[];
}

export type NewFolderPayload = {
    id_campanha:number;
    publica: boolean;
    id_pacote_pai?: number;
    nome:string;
}

export type UpdateFolderPayload = {
    id_pacote:number;
    publica?: boolean;
    novo_id_pacote_pai?: number;
    novo_nome:string;
}

export type GetFolderPayload = {
    id_campanha:number;
    id_pacote_pai?: number;
}

export type GetFilesPayload = {
    id_campanha:number;
    id_pacote_pai?: number;
}

export type NewFilePayload = {
    id_pacote_pai: number;
    tipo_arquivo: FileType;
    nome: string;
    conteudo: string;
}

export type UpdateFilePayload = {
    id_arquivo:number;
    novo_id_pacote_pai?: number;
    novo_nome?:string;
    novo_conteudo?:string;
}

export type NewItemPayload = {
    nome:string;
    descricao:string;
    qtd_dados:number;
    tipo_dado:number;
    bonus_dado:number;
    rolar_dado:string;
    quantidade:number;
}

export type UpdateItemPayload = {
    id:number;
    novo_nome:string;
    nova_descricao:string;
    nova_qtd_dados:number;
    novo_tipo_dado:number;
    novo_bonus_dado:number;
    novo_rolar_dado:string;
    nova_quantidade:number;
}