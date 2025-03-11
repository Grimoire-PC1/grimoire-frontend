import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { GetCharactersResponse } from "../interfaces/ServiceResponse";
import { Character, CharacterRegister } from "@/interfaces/Models";
import { CharacterSheetInfo, CreateCharacterPayload, GetCharacterSheetInfoPayload } from "@/interfaces/ServicePayload";

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

    const { data } = await axiosInstace.post<CreateCharacterPayload>(
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