"use client";

import {Sidebar, Tooltip} from "flowbite-react";
import {twMerge} from "tailwind-merge";
import useMenuStore from "../../../store/useMenuStore.ts";
import {useSidebar} from "../hooks/useSidebar.tsx";
import {Link} from "react-router-dom";

const MySidebar = () => {
    const {menuOpen} = useMenuStore();
    const {sidebarItems, isActive} = useSidebar();

    return (
        <Sidebar
            theme={{
                root: {
                    inner:
                        "h-full overflow-y-auto overflow-x-hidden rounded-r-lg bg-gray-50 px-3 py-2 dark:bg-dark-primary",
                },
                item: {
                    active: "bg-gray-100 dark:bg-gray-700",
                },
            }}
            className={twMerge([
                "absolute z-50 mt-20 h-screen border-r border-gray-300/50 transition-all duration-300 ease-in-out sm:relative",
                menuOpen ? "w-[300px]" : "ml-[-70px] w-[70px] sm:ml-auto",
            ])}
        >
            <Sidebar.Items className={""}>
                <Sidebar.ItemGroup className="text-center">
                    {sidebarItems
                        // .filter(
                        //     (item) => !item.roles || (item.roles && hasAccess(item.roles)),
                        // )
                        .map((item, index) => (
                            <div key={index}>
                                {item.children ? (
                                    <Sidebar.Collapse label={item.label as string}>
                                        {item.children.map((child, childIndex) => (
                                            <Sidebar.Item key={childIndex} href={child.href}>
                                                <div className="flex items-center gap-2 text-sm capitalize [&>svg]:size-7">
                                                    {menuOpen ? (
                                                        child.icon
                                                    ) : (
                                                        <Tooltip content={child.label} placement="right">
                                                            {child.icon}
                                                        </Tooltip>
                                                    )}
                                                    {menuOpen && child.label}
                                                </div>
                                            </Sidebar.Item>
                                        ))}
                                    </Sidebar.Collapse>
                                ) : (
                                    <Sidebar.Item
                                        active={isActive(item.href as string)}
                                        as={Link}
                                        to={item.href}
                                        className="px-0"
                                    >
                                        <div className="flex items-center justify-between gap-2 text-gray-600 dark:text-white">
                                            <div className="flex items-center gap-2 text-sm capitalize [&>svg]:size-7">
                                                {menuOpen ? (
                                                    item.icon
                                                ) : (
                                                    <Tooltip content={item.label} placement="right">
                                                        {item.icon}
                                                    </Tooltip>
                                                )}
                                                {menuOpen && item.label}
                                            </div>
                                            {/*{item.badge && menuOpen && (*/}
                                            {/*  <span className="rounded-full bg-blue-500 px-2 py-1 text-xs text-white">*/}
                                            {/*    {item.badge}*/}
                                            {/*  </span>*/}
                                            {/*)}*/}
                                        </div>
                                    </Sidebar.Item>
                                )}
                            </div>
                        ))}
                </Sidebar.ItemGroup>
            </Sidebar.Items>

        </Sidebar>
    );
};

export default MySidebar;
