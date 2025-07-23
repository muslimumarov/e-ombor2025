import {useTranslation } from "react-i18next";
import {useCallback, useMemo} from "react";
import {useLocation} from "react-router-dom";
import createSidebarItems from "../helpers/CreateSidebarItems.tsx";

export const useSidebar = () => {
    const {t} = useTranslation();
    const {pathname} = useLocation();
    const sidebarItems = useMemo(() => createSidebarItems(t), [t]);
    const isActive = useCallback(
        (path: string) => pathname.search(path) > -1,
        [pathname]
    );
    return {
        sidebarItems,
        isActive,
    }
}