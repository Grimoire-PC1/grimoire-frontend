import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { GetSystemsResponse } from "../interfaces/ServiceResponse";
import { SheetSubTab, SheetTab, System, SystemMechanic, SystemRule} from "@/interfaces/Models";
import { CreateSheetSubTabPayload, CreateSheetTabPayload, NewMechanicPayload, NewRulePayload, TemporarySystemPayload, TemporaryUpdateSystemPayload, UpdateMechanicPayload, UpdateRulePayload, UpdateSheetSubTabPayload, UpdateSheetTabPayload, UpdateSystemPayload } from "@/interfaces/ServicePayload";

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
    console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
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

export const getSystemSheetTemplateTabs = async() =>{
    let systemId = sessionStorage.getItem('systemId')
    const { data } = await axiosInstace.get<SheetTab[]>(
        `/${ENDPOINT.GET_SYSTEM_SHEET_TABS}`,
        { params: { id_sistema: systemId} }
    )
    return data;
}

export const getSystemSheetTemplateSubTabs = async(id_aba_ficha:number) =>{
    let systemId = sessionStorage.getItem('systemId')
    const { data } = await axiosInstace.get<SheetSubTab[]> (
        `/${ENDPOINT.GET_SYSTEM_SHEET_SUB_TABS}`,
        { params: { id_sistema: systemId, id_aba_ficha:id_aba_ficha}}
    )
    return data
}

export const createSheetTemplateTab = async(payload:CreateSheetTabPayload) =>{
    let systemId = sessionStorage.getItem('systemId')
    console.log("ENTREI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    const { data } = await axiosInstace.post<SheetTab>(
        `/${ENDPOINT.CREATE_SHEET_TAB}`,
        payload,
        { params: { id_sistema: systemId} }
    )

    return data;
}

export const updateSheetTemplateTab = async(payload:UpdateSheetTabPayload) =>{
    const { data } = await axiosInstace.put<UpdateSheetTabPayload>(
        `/${ENDPOINT.UPDATE_SHEET_TAB}`,
        payload,
        { params: { id_aba_ficha: payload.id_aba_ficha} }
    )

    return data;
}

export const deleteSheetTemplateTab = async(id:number) =>{
    const { data } = await axiosInstace.delete<string>(
        `/${ENDPOINT.DELETE_SHEET_TAB}`,
        { params: { id_aba_ficha: id} }
    )

    return data;
}

export const createSheetTemplateSubTab = async(payload:CreateSheetSubTabPayload) =>{
    const { data } = await axiosInstace.post<CreateSheetSubTabPayload>(
        `/${ENDPOINT.CREATE_SHEET_SUB_TAB}`,
        payload,
        { params: { id_aba_ficha: payload.id_aba_ficha, tipo_sub_aba: payload.tipo_sub_aba_ficha} }
    )

    return data;
}

export const updateSheetTemplateSubTab = async(payload:UpdateSheetSubTabPayload) =>{
    const { data } = await axiosInstace.put<UpdateSheetSubTabPayload>(
        `/${ENDPOINT.UPDATE_SHEET_SUB_TAB}`,
        payload,
        { params: { id_sub_aba_ficha: payload.id_sub_aba_ficha} }
    )

    return data;
}

export const deleteSheetTemplateSubTab = async(id:number) =>{
    const { data } = await axiosInstace.delete<string>(
        `/${ENDPOINT.DELETE_SHEET_SUB_TAB}`,
        { params: { id_sub_aba_ficha: id} }
    )

    return data;
}