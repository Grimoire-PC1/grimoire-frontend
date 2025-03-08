import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { GetCharactersResponse } from "../interfaces/ServiceResponse";
import { Character, CharacterRegister } from "@/interfaces/Models";

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