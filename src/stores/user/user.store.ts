import { create } from "zustand";
import { UserState } from "./user.state";
import { UserActions } from "./user.actions";

export const useUserStore = create<UserState & UserActions>()((set) => ({

}));
