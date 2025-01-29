import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { useUserStore } from "../stores/user/user.store";
import { GetCampaigsResponse } from "../interfaces/ServiceResponse";

export const getAllUserCreatedCampaigns = async () => {

    const { data } = await axiosInstace.get<GetCampaigsResponse>(
        `/${ENDPOINT.GET_USER_CREATED_CAMPAIGNS}`
    );

    return data;
}

export const getAllUserPlayedCampaigns = async () => {
    
}