export const ENDPOINT = {
    ME: "me",
    SIGN_IN: "signin",
    GET_USER_CREATED_CAMPAIGNS: "createdCampaigns",
    GET_USER_PLAYED_CAMPAIGNS: "playedCampaigns",
    GET_CAMPAIGN_BY_ID: "getCampaignById",
    GET_USER_CHARACTERS: "characters",
    GET_USER_CREATED_SYSTEMS: "createdSystems",
    GET_CHARACTER_BY_ID: "characterById",
    GET_PUBLIC_SYSTEMS: "publicSystems",
    GET_SYSTEM_BY_ID: "getSystemById", 
    UPDATE_CAMPAIGN: "updateCampaign",
    UPDATE_SYSTEM: "updateSystem",
} as const;