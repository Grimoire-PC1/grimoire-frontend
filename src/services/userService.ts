import { ENDPOINT } from "../constants/Endpoint";
import axiosInstace from "./axios";
import { SignInResponse } from "../interfaces/ServiceResponse";
import { SignInPayload, SignUpPayload } from "@/interfaces/ServicePayload";

export const authenticateUser = async (credentials: SignInPayload) => {
    console.log(credentials)
    const { data } = await axiosInstace.post<string>(
        `/${ENDPOINT.SIGN_IN}`,
        credentials
    )
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