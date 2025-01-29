import { Campaign, Character, User } from "../../interfaces/Models";

export type UserState = {
  user?: User;
  createdCampaigns: Campaign[];
  playedCampaigns: Campaign[];
  characters: Character[];
};
