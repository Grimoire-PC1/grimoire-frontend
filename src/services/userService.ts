import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { SignInResponse } from "../interfaces/ServiceResponse";
import { SignInPayload } from "@/interfaces/ServicePayload";

export const authenticateUser = async () => {
    const { data } = await axiosInstace.post<string>(
        `/${ENDPOINT.SIGN_IN}`
    )
}

export const createUser = async (body: SignInPayload) => {

    const { data } = await axiosInstace.post<string>(
        `/${ENDPOINT.CREATE_NEW_USER}`,
        body
    );

    return data;
}

export const getUser = async (id: string) => {
    const { data } = await axiosInstace.get<SignInResponse>(
        `/${ENDPOINT.GET_USER_PLAYED_CAMPAIGNS}`
    );

    return data;
}

export const updateUser = async (id: string) => {
    const { data } = await axiosInstace.get<string>(
        `/${ENDPOINT.GET_CAMPAIGN_BY_ID}/${id}`
    )

    return data
}

export const deleteUser = async(id: string) => {
    const { data } = await axiosInstace.post<string>(
        `/${ENDPOINT.GET_USER_PLAYED_CAMPAIGNS}`,
    )

    return data;
}