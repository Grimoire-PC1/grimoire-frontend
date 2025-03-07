import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { GetSystemsResponse } from "../interfaces/ServiceResponse";
import { System, SystemRule} from "@/interfaces/Models";
import { TemporarySystemPayload, UpdateSystemPayload } from "@/interfaces/ServicePayload";

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

export const updateSystem = async (updatedSystem: UpdateSystemPayload) => {
  
    const { data } = await axiosInstace.put<GetSystemsResponse>(
      `/${ENDPOINT.UPDATE_SYSTEM}/${updatedSystem.systemId}`,
      {
        systemId: updatedSystem.systemId,
        name: updatedSystem.name,
        image: updatedSystem.image,
        description: updatedSystem.description
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