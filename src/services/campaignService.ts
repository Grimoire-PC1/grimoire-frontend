import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { GetCampaigsResponse } from "../interfaces/ServiceResponse";
import { Campaign, CharacterRegister, Folder, SheetSubTab, SheetTab, File, Item } from "@/interfaces/Models";
import { CreateNewCampaignPayload, GetFilesPayload, GetFolderPayload, NewFilePayload, NewFolderPayload, NewItemPayload, TemporaryCampaignPayload, UpdateFilePayload, UpdateFolderPayload, UpdateItemPayload } from "@/interfaces/ServicePayload";

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
    console.log(id);
    const { data } = await axiosInstace.get<CharacterRegister[]>(
        `/${ENDPOINT.GET_CAMPAIGN_CHARACTERS}`,
        { params: { id_campanha: parseInt(id||"")} }
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


export const leaveCampaign = async(id_campanha:number) =>{
    const { data } = await axiosInstace.delete<string>(
        `/${ENDPOINT.LEAVE_CAMPAIGN}`,
        { params: { id_campanha: id_campanha} }
    )
    return data;
}

export const createFolder = async(newFolder:NewFolderPayload) => {
    console.log(newFolder)

    const { data } = await axiosInstace.post<Folder>(
        `/${ENDPOINT.CREATE_FOLDER}`,
        newFolder,
        { params: { id_campanha: newFolder.id_campanha, publica: newFolder.publica} }
    )

    console.log(data)
    return data;
}

export const updateFolder = async(payload:UpdateFolderPayload) => {

    const { data } = await axiosInstace.put<Folder>(
        `/${ENDPOINT.UPDATE_FOLDER}`,
        payload,
        { params: { id_pacote:payload.id_pacote} }
    )

    console.log(data)
    return data;
}

export const deleteFolder = async(id:number) => {

    const { data } = await axiosInstace.delete<string>(
        `/${ENDPOINT.DELETE_FOLDER}`,
        { params: { id_pacote:id} }
    )

    console.log(data)
    return data;
}

export const getFolders = async(payload:GetFolderPayload) => {
    const { data } = await axiosInstace.get<Folder[]>(
        `/${ENDPOINT.GET_FOLDER}`,
        { params: { id_campanha: payload.id_campanha, id_pacote_pai: payload.id_pacote_pai} }
    )

    console.log(data)
    return data;
}

export const getFiles = async(payload:GetFilesPayload) => {
    const { data } = await axiosInstace.get<File[]>(
        `/${ENDPOINT.GET_FILES}`,
        { params: { id_campanha: payload.id_campanha} }
    )

    console.log(data)
    return data;
}

export const createFile = async(payload:NewFilePayload) => {

    const { data } = await axiosInstace.post<File>(
        `/${ENDPOINT.CREATE_FILE}`,
        payload,
        { params: { id_pacote_pai: payload.id_pacote_pai, tipo_arquivo: payload.tipo_arquivo} }
    )

    console.log(data)
    return data;
}

export const updateFile = async(payload:UpdateFilePayload) => {

    const { data } = await axiosInstace.put<File>(
        `/${ENDPOINT.UPDATE_FILE}`,
        payload,
        { params: { id_arquivo:payload.id_arquivo} }
    )

    console.log(data)
    return data;
}

export const deleteFile = async(id:number) => {

    const { data } = await axiosInstace.delete<string>(
        `/${ENDPOINT.DELETE_FILE}`,
        { params: { id_arquivo:id} }
    )

    console.log(data)
    return data;
}

export const createItem = async(payload:NewItemPayload) => {
    let campaignId = sessionStorage.getItem('currentCampaignId')

    const { data } = await axiosInstace.post<Item>(
        `/${ENDPOINT.CREATE_ITEM}`,
        payload,
        { params: { id_campanha:campaignId} }
    )

    console.log(data)
    return data;
}

export const getItem = async(id:number) => {
    //let campaignId = sessionStorage.getItem('currentCampaignId')

    const { data } = await axiosInstace.get<Item[]>(
        `/${ENDPOINT.GET_ITEM}`,
        { params: { id_campanha:id} }
    )

    console.log(data)
    return data;
}

export const deleteItem = async(id:number) => {

    const { data } = await axiosInstace.delete<string>(
        `/${ENDPOINT.DELETE_ITEM}`,
        { params: { id_item:id} }
    )

    console.log(data)
    return data;
}

export const updateItem = async(payload:UpdateItemPayload) => {

    const { data } = await axiosInstace.put<Item>(
        `/${ENDPOINT.UPDATE_ITEM}`,
        payload,
        { params: { id_item:payload.id} }
    )

    console.log(data)
    return data;
}