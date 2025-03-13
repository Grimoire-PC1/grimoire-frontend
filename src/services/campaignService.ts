import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { GetCampaigsResponse } from "../interfaces/ServiceResponse";
import { Campaign, CharacterRegister, SheetSubTab, SheetTab } from "@/interfaces/Models";
import { CreateNewCampaignPayload, TemporaryCampaignPayload } from "@/interfaces/ServicePayload";

export const getAllUserCreatedCampaigns = async () => {

    const { data } = await axiosInstace.get<GetCampaigsResponse>(
        `/${ENDPOINT.GET_USER_CREATED_CAMPAIGNS}`
    );

    const arrayedCampaigns: Campaign[] = [];
    data.forEach((item) => {
        arrayedCampaigns.push(item);
    }) 

    return arrayedCampaigns;
}

export const getAllUserPlayedCampaigns = async () => {
    const { data } = await axiosInstace.get<GetCampaigsResponse>(
        `/${ENDPOINT.GET_USER_PLAYED_CAMPAIGNS}`
    );

    const arrayedCampaigns: Campaign[] = [];
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

    console.log(data)
    return data;
}

export const updateCampaign = async (temporaryCampaignPayload: TemporaryCampaignPayload) => {
  
    const { data } = await axiosInstace.put(
      `/${ENDPOINT.UPDATE_CAMPAIGN}`,
      temporaryCampaignPayload.payload,
      { params: { id_campanha: temporaryCampaignPayload.campaignId} }
    );
  
    return data;
};

export const deleteCampaign = async (id:number) => {

    const { data } = await axiosInstace.delete(
    `/${ENDPOINT.DELETE_CAMPAIGN}`,
    { params: { id_campanha: id} }
    );

    return data;
};

export const getCampaignCharacters = async() =>{
    let id = sessionStorage.getItem('currentCampaignId')
    const { data } = await axiosInstace.get<CharacterRegister[]>(
        `/${ENDPOINT.GET_CAMPAIGN_CHARACTERS}`,
        { params: { id_campanha: id} }
    )
    return data;
}

export const getCampaignSheetTemplateTabs = async() =>{
    let campaignId = sessionStorage.getItem('currentCampaignId')
    const { data } = await axiosInstace.get<SheetTab[]>(
        `/${ENDPOINT.GET_CAMPAIGN_SHEET_TABS}`,
        { params: { id_campanha: campaignId} }
    )
    return data;
}


export const getCampaignSheetTemplateSubTabs = async(id_aba_ficha:number) =>{
    let campaignId = sessionStorage.getItem('currentCampaignId')
    const { data } = await axiosInstace.get<SheetSubTab[]>(
        `/${ENDPOINT.GET_CAMPAIGN_SHEET_SUB_TABS}`,
        { params: { id_campanha: campaignId, id_aba_ficha:id_aba_ficha} }
    )
    return data;
}