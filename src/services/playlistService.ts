import { ENDPOINT } from "@/constants/Endpoint";
import axiosInstace from "./axios";
import { PlaylistSubTab, PlaylistTab } from "@/interfaces/Models";
import { CreatePlaylistSubTabPayload, CreateSheetTabPayload, UpdatePlaylistTabPayload } from "@/interfaces/ServicePayload";


export const getPlaylistTabs = async() =>{
    let campaignId = sessionStorage.getItem('currentCampaignId')
    const { data } = await axiosInstace.get<PlaylistTab[]>(
        `/${ENDPOINT.GET_PLAYLIST_TABS}`,
        { params: { id_campanha: campaignId} }
    )
    return data;
}


export const getPlaylistSubTabs = async(id_playlist:number) =>{
    let campaignId = sessionStorage.getItem('currentCampaignId')
    const { data } = await axiosInstace.get<PlaylistSubTab[]>(
        `/${ENDPOINT.GET_PLAYLIST_SUB_TABS}`,
        { params: { id_campanha: campaignId, id_playlist:id_playlist} }
    )
    return data;
}


export const createPlaylistTab = async(payload:CreateSheetTabPayload) =>{
    let campaignId = sessionStorage.getItem('currentCampaignId')
    const { data } = await axiosInstace.post<PlaylistTab>(
        `/${ENDPOINT.CREATE_PLAYLIST_TAB}`,
        payload,
        { params: { id_campanha: campaignId} }
    )

    return data;
}

export const updatePlaylistTab = async(payload:UpdatePlaylistTabPayload) =>{
    const { data } = await axiosInstace.put<UpdatePlaylistTabPayload>(
        `/${ENDPOINT.UPDATE_PLAYLIST_TAB}`,
        payload,
        { params: { id_playlist: payload.id} }
    )

    return data;
}

export const deletePlaylistTab = async(id:number) =>{
    const { data } = await axiosInstace.delete<string>(
        `/${ENDPOINT.DELETE_PLAYLIST_TAB}`,
        { params: { id_playlist: id} }
    )

    return data;
}

export const createPlaylistSubTab = async(payload:CreatePlaylistSubTabPayload) =>{
    const { data } = await axiosInstace.post<CreatePlaylistSubTabPayload>(
        `/${ENDPOINT.CREATE_PLAYLIST_SUB_TAB}`,
        payload,
        { params: { id_playlist: payload.id_playlist} }
    )

    return data;
}

export const deletePlaylistSubTab = async(id:number) =>{
    const { data } = await axiosInstace.delete<string>(
        `/${ENDPOINT.DELETE_PLAYLIST_SUB_TAB}`,
        { params: { id: id} }
    )

    return data;
}