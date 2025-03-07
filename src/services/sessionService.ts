import { ENDPOINT } from "@/constants/Endpoint";
import axiosInstace from "./axios";
import { NewSessionPayload } from "@/interfaces/ServicePayload";
import { Session } from "@/interfaces/Models";

export const createSession = async(payload: NewSessionPayload) => {
    console.log(payload)
    const { data } = await axiosInstace.post<NewSessionPayload>(
        `/${ENDPOINT.CREATE_SESSION}`,
        payload,
        { params: { id_campanha: payload.id_campanha, tipo_sessao: payload.tipo_sessao} }
    )

    console.log(data)
    return data;
}

export const getCampaignSessions = async() =>{
    let campaign = sessionStorage.getItem('currentCampaignId')
    const { data } = await axiosInstace.get<Session[]>(
        `/${ENDPOINT.GET_CAMPAIGN_SESSIONS}`,
        { params: { id_campanha: campaign} }
    )
    console.log(data)
    return data;
}