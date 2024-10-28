import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthen = create(
   persist(
      (set) => ({
         accessToken: "",
         setAccessToken: (newaccessToken) =>
            set(() => ({ accessToken: newaccessToken })),
         removeAccessToken: () => set({ accessToken: "" }),

         role: "customer",
         setRole: (newUserRole) => set(() => ({ role: newUserRole })),
         removeRole: () => set({ role: "customer" }),
      }),
      {
         name: "authenToken",
      }
   )
);
