import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { GetSystemsResponse } from "../interfaces/ServiceResponse";
import { System, SystemMechanic, SystemRule} from "@/interfaces/Models";
import { NewMechanicPayload, NewRulePayload, TemporarySystemPayload, TemporaryUpdateSystemPayload, UpdateMechanicPayload, UpdateRulePayload, UpdateSystemPayload } from "@/interfaces/ServicePayload";

export const getAllUserCreatedSystems = async () => {

    const { data } = await axiosInstace.get<GetSystemsResponse>(
        `/${ENDPOINT.GET_SYSTEM_BY_ID}`
    );

    const arrayedSystems: System[] = [];
    data.forEach((item) => {
        arrayedSystems.push(item);
    }) 

    console.log(arrayedSystems)
    return arrayedSystems;
}

export const getAllPublicSystems = async () => {

    const { data } = await axiosInstace.get<GetSystemsResponse>(
        `/${ENDPOINT.GET_PUBLIC_SYSTEMS}`
    );

    const arrayedSystems: System[] = [];
    data.forEach((item) => {
        arrayedSystems.push(item);
    }) 

    return arrayedSystems;
}

export const createNewSystem = async(temporarySystemPayload: TemporarySystemPayload) => {
    const { data } = await axiosInstace.post<System>(
        `/${ENDPOINT.CREATE_NEW_SYSTEM}`,
        temporarySystemPayload.payload,
        { params: { tipo_sistema: temporarySystemPayload.systemType} }
    )

    return data;
}

export const updateSystem = async (updatedSystem: TemporaryUpdateSystemPayload) => {
    const { data } = await axiosInstace.put<GetSystemsResponse>(
      `/${ENDPOINT.UPDATE_SYSTEM}?id_sistema=${updatedSystem.id_sistema}&tipo_sistema=${updatedSystem.tipo_sistema}`,
      {
        novo_nome: updatedSystem.payload.novo_nome,
        id_nova_foto: updatedSystem.payload.id_nova_foto,
        nova_descricao: updatedSystem.payload.nova_descricao
      }
    );
  
    return data;
};

export const getSystemById = async (systemId: string) => {
    const { data } = await axiosInstace.get<System>(
        `/${ENDPOINT.GET_SYSTEM_BY_ID}/${systemId}`
    )

    return data
}

export const getSystemRules = async() =>{
    let systemId = sessionStorage.getItem('systemId')
    const { data } = await axiosInstace.get<SystemRule[]>(
        `/${ENDPOINT.GET_SYSTEM_RULES}?id_sistema=${systemId}`
    )

    return data;
}

export const createRule = async(payload:NewRulePayload) =>{
    const { data } = await axiosInstace.post<NewRulePayload>(
        `/${ENDPOINT.CREATE_SYSTEM_RULE}`,
        payload,
    )

    return data;
}

export const updateRule = async(payload:UpdateRulePayload) =>{
    const { data } = await axiosInstace.put<UpdateRulePayload>(
        `/${ENDPOINT.UPDATE_SYSTEM_RULE}`,
        payload,
        { params: { id_regra: payload.id_regra} }
    )

    return data;
}

export const deleteRule = async(id:number) =>{
    const { data } = await axiosInstace.delete<UpdateRulePayload>(
        `/${ENDPOINT.DELETE_SYSTEM_RULE}`,
        { params: { id_regra: id} }
    )

    return data;
}

export const getSystemMechanics = async() =>{
    let systemId = sessionStorage.getItem('systemId')
    const { data } = await axiosInstace.get<SystemMechanic[]>(
        `/${ENDPOINT.GET_MECHANICS}`,
        { params: { id_sistema: systemId} }
    )
    return data;
}

export const createMechanic = async(payload:NewMechanicPayload) =>{
    let systemId = sessionStorage.getItem('systemId')
    const { data } = await axiosInstace.post<NewMechanicPayload>(
        `/${ENDPOINT.CREATE_MECHANIC}`,
        payload,
        { params: { id_sistema: systemId} }
    )

    return data;
}

export const updateMechanic = async(payload:UpdateMechanicPayload) =>{
    const { data } = await axiosInstace.put<UpdateMechanicPayload>(
        `/${ENDPOINT.UPDATE_MECHANIC}`,
        payload,
        { params: { id_mecanica: payload.id_mecanica} }
    )

    return data;
}

export const deleteMechanic = async(id:number) =>{
    const { data } = await axiosInstace.delete<string>(
        `/${ENDPOINT.DELETE_MECHANIC}`,
        { params: { id_mecanica: id} }
    )
    return data;
}