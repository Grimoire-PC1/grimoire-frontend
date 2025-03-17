export const ENDPOINT = {
    ME: "me",
    SIGN_IN: "authentication/authenticate",

    CREATE_NEW_USER: "user/register",
    UPDATE_USER: "user/update",
    GET_USER: "user/get",
    DELETE_USER: "user/delete",

    CREATE_NEW_CAMPAIGN: "campaign/register",
    GET_USER_CREATED_CAMPAIGNS: "campaign/get",
    GET_USER_PLAYED_CAMPAIGNS: "campaign/get-participating",
    GET_CAMPAIGN_BY_ID: "campaign/get",
    UPDATE_CAMPAIGN: "campaign/update",
    DELETE_CAMPAIGN: "campaign/delete",

    CREATE_NEW_CHARACTER: "character/register",
    GET_USER_CHARACTERS: "character/get/user",

    GET_USER_CREATED_SYSTEMS: "createdSystems",
    GET_CHARACTER_BY_ID: "characterById",

    CREATE_NEW_SYSTEM: "engine/register",
    GET_USER_SYSTEM: "systems",
    GET_PUBLIC_SYSTEMS: "engine/get-public",
    GET_SYSTEM_BY_ID: "engine/get", 
    UPDATE_SYSTEM: "engine/update",
    DELETE_SYSTEM: "engine/delete",

    GET_SYSTEM_RULES: "engine-rule/get",
    CREATE_SYSTEM_RULE: "engine-rule/register",
    UPDATE_SYSTEM_RULE: "engine-rule/update",
    DELETE_SYSTEM_RULE: "engine-rule/delete",

    CREATE_SESSION: "session/register",
    UPDATE_SESSION: "session/update",
    GET_CAMPAIGN_SESSIONS: "session/get/campaign",
    DELETE_SESSION: "session/delete",

    GET_MECHANICS: "mechanic/get",
    CREATE_MECHANIC: "mechanic/register",
    UPDATE_MECHANIC: "mechanic/update",
    DELETE_MECHANIC: "mechanic/delete",

    GET_CAMPAIGN_CHARACTERS: "character/get/campaign",
    GET_CAMPAIGN_OTHER_CHARACTERS: "character/get/campaign/others",
    CREATE_CHARACTER: "character/register",
    UPDATE_CHARACTER: "character/update",
    DELETE_CHARACTER: "character/delete",

    GET_SYSTEM_SHEET_TABS: "character-sheet-template/get/tab",
    GET_CAMPAIGN_SHEET_TABS: "character-sheet-template/get/tab/campaign",
    GET_SYSTEM_SHEET_SUB_TABS: "character-sheet-template/get/sub-tab",
    GET_CAMPAIGN_SHEET_SUB_TABS: "character-sheet-template/get/sub-tab/campaign",
    CREATE_SHEET_TAB: "character-sheet-template/register/tab",
    UPDATE_SHEET_TAB: "character-sheet-template/update/tab",
    DELETE_SHEET_TAB: "character-sheet-template/delete/tab",
    CREATE_SHEET_SUB_TAB: "character-sheet-template/register/sub-tab",
    UPDATE_SHEET_SUB_TAB: "character-sheet-template/update/sub-tab",
    DELETE_SHEET_SUB_TAB: "character-sheet-template/delete/sub-tab",

    GET_SHEET_CONTENT: "character-sheet-content/get",
    UPDATE_SHEET_CONTENT: "character-sheet-content/update",
    CREATE_SHEET_CONTENT: "character-sheet-content/register",

    LEAVE_CAMPAIGN: "participant/delete",

    CREATE_FOLDER: "campaign-package/register",
    CREATE_CHARACTER_FOLDER: "campaign-package/register/character",
    DELETE_FOLDER: "campaign-package/delete",
    UPDATE_FOLDER: "campaign-package/update",
    GET_FOLDER: "campaign-package/get",
    
    GET_FILES: "campaign-package/file/get",
    CREATE_FILE: "campaign-package/file/register",
    DELETE_FILE: "campaign-package/file/delete",
    UPDATE_FILE: "campaign-package/file/update",

    CREATE_ITEM: "item/register",
    GET_ITEM: "item/get",
    UPDATE_ITEM: "item/update",
    DELETE_ITEM: "item/delete",
} as const;