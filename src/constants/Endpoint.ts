export const ENDPOINT = {
    ME: "me",
    SIGN_IN: "authentication/authenticate",

    CREATE_NEW_USER: "user/register",
    UPDATE_USER: "user/update",
    GET_USER: "user/get",
    DELETE_USER: "user/delete",

    CREATE_NEW_CAMPAIGN: "campaign/register",
    GET_USER_CREATED_CAMPAIGNS: "createdCampaigns",
    GET_USER_PLAYED_CAMPAIGNS: "playedCampaigns",
    GET_CAMPAIGN_BY_ID: "campaign/get",
    UPDATE_CAMPAIGN: "campaign/update",

    CREATE_NEW_CHARACTER: "createNewCharacter",
    GET_USER_CHARACTERS: "characters",
    GET_USER_CREATED_SYSTEMS: "createdSystems",
    GET_CHARACTER_BY_ID: "characterById",

    CREATE_NEW_SYSTEM: "engine/register",
    GET_USER_SYSTEM: "systems",
    GET_PUBLIC_SYSTEMS: "engine/get-public",
    GET_SYSTEM_BY_ID: "engine/get", 
    UPDATE_SYSTEM: "engine/update",
} as const;