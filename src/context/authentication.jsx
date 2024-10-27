import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthen = create(
   persist(
      (set) => ({
         accessToken: "",
         setAccessToken: (newaccessToken) =>
            set(() => ({ accessToken: newaccessToken })),
         removeToken: () => set({ accessToken: "" }),

         role: "",
         setRole: (newUserRole) => set(() => ({ role: newUserRole })),
         removeRole: () => set({ role: "" }),
      }),
      {
         name: "authenToken",
      }
   )
);
