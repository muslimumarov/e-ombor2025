import {create} from "zustand"
import  {persist, createJSONStorage} from "zustand/middleware";

type MenuStoreState = {
    menuOpen: boolean;
    setMenuOpen: (menuOpen: boolean) => void;
};

const useMenuStore = create<MenuStoreState>() (
    persist<MenuStoreState> (
        (set): MenuStoreState => ({
            menuOpen: false,
            setMenuOpen: (menuOpen) =>  set({ menuOpen}),
        }),
        {
            name: "menuStore",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
export default useMenuStore;