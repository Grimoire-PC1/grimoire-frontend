import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { GetCharactersResponse } from "../interfaces/ServiceResponse";
import { Character, CharacterRegister } from "@/interfaces/Models";
import { CharacterSheetInfo, CreateCharacterPayload, CreateOrUpdateFieldPayload, GetCharacterSheetInfoPayload } from "@/interfaces/ServicePayload";

export const getAllUserCharacters = async () => {

    const { data } = await axiosInstace.get<GetCharactersResponse>(
        `/${ENDPOINT.GET_USER_CHARACTERS}`
    );

    var arrayedCampaigns: Character[] = [];
    data.forEach((item) => {
        arrayedCampaigns.push(item);
    }) 

    return arrayedCampaigns;
}

export const getUserCharacters = async() =>{
    const { data } = await axiosInstace.get<CharacterRegister[]>(
        `/${ENDPOINT.GET_USER_CHARACTERS}`
    )

    console.log(data);
    return data;
}

export const createCharacter = async(payload:CreateCharacterPayload) =>{
    console.log(payload)

    const { data } = await axiosInstace.post<CharacterRegister>(
        `/${ENDPOINT.CREATE_NEW_CHARACTER}`,
        payload,
        { params: { id_campanha: payload.id_campanha} }
    )

    return data;
}

export const getCharacterSheetContent = async(payload:GetCharacterSheetInfoPayload) =>{
    const { data } = await axiosInstace.get<CharacterSheetInfo>(
        `/${ENDPOINT.GET_SHEET_CONTENT}`,
        { params: { id_personagem: payload.id_personagem,id_aba_ficha:payload.id_aba_ficha,id_sub_aba_ficha:payload.id_sub_aba_ficha} }
    )
    
    return data;
}

export const updateCharacterSheetContent = async(payload:CreateOrUpdateFieldPayload) =>{
    const { data } = await axiosInstace.put<CreateOrUpdateFieldPayload>(
        `/${ENDPOINT.UPDATE_SHEET_CONTENT}`,
        payload,
        { params: { id_conteudo_ficha: payload.id_conteudo_ficha} }
    )
    
    return data;
}

export const createCharacterSheetContent = async(payload:CreateOrUpdateFieldPayload) =>{
    const { data } = await axiosInstace.post<CreateOrUpdateFieldPayload>(
        `/${ENDPOINT.CREATE_SHEET_CONTENT}`,
        payload,
        { params: { id_personagem: payload.id_personagem,id_sub_aba_ficha:payload.id_sub_aba_ficha} }
    )
    
    return data;
}