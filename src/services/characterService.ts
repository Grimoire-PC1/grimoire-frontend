import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { GetCharactersResponse } from "../interfaces/ServiceResponse";
import { Character } from "@/interfaces/Models";

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

export const getCharacterById = async (characterId: string) => {
    const { data } = await axiosInstace.get<Character>(
        `/${ENDPOINT.GET_SYSTEM_BY_ID}/${characterId}`
    )

    return data
}