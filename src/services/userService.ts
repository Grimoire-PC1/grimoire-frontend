import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { SignInResponse } from "../interfaces/ServiceResponse";
import { SignInPayload, SignUpPayload } from "@/interfaces/ServicePayload";

export const authenticateUser = async (credentials: SignInPayload) => {
    const encodedCredentials: string = btoa(`${credentials.login}:${credentials.senha}`);
    const authorization = `Basic ${encodedCredentials}`
    console.log(authorization)
    const { data } = await axiosInstace.post<string>(
        `/${ENDPOINT.SIGN_IN}`,
        {},
        { headers: { Authorization: authorization }, withCredentials:true }
    )
    sessionStorage.setItem("grimoireToken", data)
}

export const createUser = async (body: SignUpPayload) => {

    const { data } = await axiosInstace.post<string>(
        `/${ENDPOINT.CREATE_NEW_USER}`,
        body
    );

    return data;
}

export const getUser = async () => {
    const { data } = await axiosInstace.get<SignInResponse>(
        `/${ENDPOINT.GET_USER}`
    );
    
    return data;
}

export const getUserId = async () => {
    const { data } = await axiosInstace.get<SignInResponse>(
        `/${ENDPOINT.GET_USER}`
    );
    
    return data.id;
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