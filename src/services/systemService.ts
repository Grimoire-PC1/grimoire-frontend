import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { GetSystemsResponse } from "../interfaces/ServiceResponse";
import { System } from "@/interfaces/Models";
import { CreateNewSystemPayload, UpdateSystemPayload } from "@/interfaces/ServicePayload";

export const getAllUserCreatedSystems = async () => {

    const { data } = await axiosInstace.get<GetSystemsResponse>(
        `/${ENDPOINT.GET_USER_CREATED_SYSTEMS}`
    );

    var arrayedSystems: System[] = [];
    data.forEach((item) => {
        arrayedSystems.push(item);
    }) 

    return arrayedSystems;
}

export const getAllPublicSystems = async () => {

    const { data } = await axiosInstace.get<GetSystemsResponse>(
        `/${ENDPOINT.GET_PUBLIC_SYSTEMS}`
    );

    var arrayedSystems: System[] = [];
    data.forEach((item) => {
        arrayedSystems.push(item);
    }) 

    return arrayedSystems;
}

export const createNewSystem = async(newSystem: CreateNewSystemPayload) => {
    const { data } = await axiosInstace.post<System>(
        `/${ENDPOINT.CREATE_NEW_SYSTEM}`,
        newSystem
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