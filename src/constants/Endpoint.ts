export const ENDPOINT = {
    ME: "me",
    SIGN_IN: "signin",
    
    CREATE_NEW_CAMPAIGN: "createNewCampaign",
    GET_USER_CREATED_CAMPAIGNS: "createdCampaigns",
    GET_USER_PLAYED_CAMPAIGNS: "playedCampaigns",
    GET_CAMPAIGN_BY_ID: "getCampaignById",
    UPDATE_CAMPAIGN: "updateCampaign",

    CREATE_NEW_CHARACTER: "createNewCharacter",
    GET_USER_CHARACTERS: "characters",
    GET_USER_CREATED_SYSTEMS: "createdSystems",
    GET_CHARACTER_BY_ID: "characterById",

    CREATE_NEW_SYSTEM: "createNewSystem",
    GET_USER_SYSTEM: "systems",
    GET_PUBLIC_SYSTEMS: "publicSystems",
    GET_SYSTEM_BY_ID: "getSystemById", 
    UPDATE_SYSTEM: "updateSystem",
} as const;