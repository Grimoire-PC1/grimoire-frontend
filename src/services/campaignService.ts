import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { GetCampaigsResponse } from "../interfaces/ServiceResponse";
import { Campaign } from "@/interfaces/Models";
import { CreateNewCampaignPayload, UpdateCampaignPayload } from "@/interfaces/ServicePayload";

export const getAllUserCreatedCampaigns = async () => {

    const { data } = await axiosInstace.get<GetCampaigsResponse>(
        `/${ENDPOINT.GET_USER_CREATED_CAMPAIGNS}`
    );

    var arrayedCampaigns: Campaign[] = [];
    data.forEach((item) => {
        arrayedCampaigns.push(item);
    }) 

    return arrayedCampaigns;
}

export const getAllUserPlayedCampaigns = async () => {
    const { data } = await axiosInstace.get<GetCampaigsResponse>(
        `/${ENDPOINT.GET_USER_PLAYED_CAMPAIGNS}`
    );

    var arrayedCampaigns: Campaign[] = [];
    data.forEach((item) => {
        arrayedCampaigns.push(item);
    }) 

    return arrayedCampaigns;
}

export const getCampaignById = async (campaignId: string) => {
    const { data } = await axiosInstace.get<Campaign>(
        `/${ENDPOINT.GET_CAMPAIGN_BY_ID}/${campaignId}`
    )

    return data
}

export const createNewCampaign = async(newCampaign: CreateNewCampaignPayload) => {
    console.log(newCampaign)
    const { data } = await axiosInstace.post<Campaign>(
        `/${ENDPOINT.CREATE_NEW_CAMPAIGN}`,
        newCampaign
    )

    return data;
}

export const updateCampaign = async (updatedCampaign: UpdateCampaignPayload) => {
  
    const { data } = await axiosInstace.put(
      `/${ENDPOINT.UPDATE_CAMPAIGN}/${updatedCampaign.campaignId}`,
      {
        campaignId: updatedCampaign.campaignId,
        name: updatedCampaign.name,
        image: updatedCampaign.image,
        systemId: updatedCampaign.systemId,
        description: updatedCampaign.description
      }
    );
  
    return data;
  };