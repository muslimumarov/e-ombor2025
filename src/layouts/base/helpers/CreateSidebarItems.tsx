import {SidebarItemProps} from "flowbite-react";
import {HiChartPie} from "react-icons/hi";
import {FaWarehouse} from "react-icons/fa6";
import {ReactNode} from "react";

import {ArrowLeft, ArrowRight, FileStackIcon, UsersRound} from "lucide-react";

interface SidebarItems extends Omit<SidebarItemProps, "children" | "label" | "icon"> {
    children?: SidebarItems[];
    label?: ReactNode;
    badge?: number;
    icon?: ReactNode;
    // roles?: UserRole[];
}

const createSidebarItems = (t: (text: string) => string): SidebarItems[] => [
    {
        label: t('Nazorat'),
        icon: <HiChartPie/>,
        href: "/dashboard",
        // roles: [
        //     UserRole.Aparat,
        //     UserRole.CONTENT,
        //     UserRole.ACCOUNTING,
        //     UserRole.MONITORING,
        // ],
    },
    {
        label: t("Kirim"),
        icon: < ArrowRight/>,
        href: "/department",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("Chiqim"),
        icon: <ArrowLeft/>,
        href: "/section",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("1-Koprikqurilish otryadi"),
        icon: <FaWarehouse/>,
        href: "/position",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("2-Ko'prikqurilish otryadi"),
        icon: <FaWarehouse/>,
        href: "/management",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("13-Ko'prikqurilish otryadi"),
        icon: <FaWarehouse/>,
        href: "/news",
        badge: 3,
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("14-Ko'prikqurilish otryadi"),
        icon: <FaWarehouse/>,
        href: "/category",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("67-Ko'prikqurilish otryadi"),
        icon: <FaWarehouse/>,
        href: "/articles",
        labelType: "Pro",
        labelColor: "dark",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("Ko‘prikqurilishbutlash"),
        icon: <FaWarehouse/>,
        href: "/recommendation",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },

    {
        label: t("document"),
        icon: <FileStackIcon/>,
        href: "/document",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("systemUsers"),
        icon: <UsersRound/>,
        href: "/user",
        // roles: [UserRole.SUPER_ADMIN],
    },
]
export default createSidebarItems;