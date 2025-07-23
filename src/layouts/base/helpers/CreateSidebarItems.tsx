import {SidebarItemProps} from "flowbite-react";
import {HiChartPie} from "react-icons/hi";
import {FaWarehouse} from "react-icons/fa6";
import {ReactNode} from "react";

import {
    BookCopyIcon,
    BookOpenText,
    BotMessageSquareIcon,
    ChartBarStackedIcon,
    FileStackIcon,
    Globe,
    HandshakeIcon,
    LayoutTemplateIcon,
    MessageCircleQuestion,
    MonitorIcon,
    Newspaper,
    SendToBackIcon,
    ShieldCheckIcon,
    ShieldEllipsis,
    TicketsPlaneIcon,
    UsersRound
} from "lucide-react";

interface SidebarItems extends Omit<SidebarItemProps, "children" | "label" | "icon"> {
    children?: SidebarItems[];
    label?: ReactNode;
    badge?: number;
    icon?: ReactNode;
    // roles?: UserRole[];
}

const createSidebarItems = (t: (text: string) => string): SidebarItems[] => [
    {
        label: t('monitoring'),
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
        label: t("departments"),
        icon: < FaWarehouse/>,
        href: "/department",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("sections"),
        icon: <LayoutTemplateIcon/>,
        href: "/section",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("positions"),
        icon: <BookCopyIcon/>,
        href: "/position",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("management"),
        icon: <MonitorIcon/>,
        href: "/management",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("news"),
        icon: <Newspaper/>,
        href: "/news",
        badge: 3,
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("categories"),
        icon: <ChartBarStackedIcon/>,
        href: "/category",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("articles"),
        icon: <BookOpenText/>,
        href: "/articles",
        labelType: "Pro",
        labelColor: "dark",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("recommendations"),
        icon: <MessageCircleQuestion/>,
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
        label: t("vacancies"),
        icon: <TicketsPlaneIcon/>,
        href: "/vacancy",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("partners"),
        icon: <HandshakeIcon/>,
        href: "/partner",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT],
    },
    {
        label: t("services"),
        icon: <Globe/>,
        href: "/services",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CONTENT, UserRole.ACCOUNTING],
    },
    {
        label: t("orders"),
        icon: <SendToBackIcon/>,
        href: "/order",
        // roles: [UserRole.SUPER_ADMIN, UserRole.ACCOUNTING],
    },
    {
        label: t("incident"),
        icon: <ShieldEllipsis/>,
        href: "/events",
        // roles: [UserRole.SUPER_ADMIN, UserRole.MONITORING],
    },
    {
        label: t("chat"),
        icon: <BotMessageSquareIcon/>,
        href: "/chat",
        // roles: [UserRole.SUPER_ADMIN, UserRole.MONITORING, UserRole.CONTENT],
    },
    {
        label: t("certification"),
        icon: <ShieldCheckIcon/>,
        href: "/certification",
        // roles: [UserRole.SUPER_ADMIN, UserRole.CERTIFICATION],
    },
    {
        label: t("systemUsers"),
        icon: <UsersRound/>,
        href: "/user",
        // roles: [UserRole.SUPER_ADMIN],
    },
]
export default createSidebarItems;