import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
    {

        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

    },
    {
        title: "All Employees",
        path: "/AllEmployees",
        icon: <IoIcons.IoIosPaper />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
        title: "System Config",
        path: "/System Config",
        icon: <FaIcons.FaEnvelopeOpenText />,

        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: "Page Management",
                path: "/pageManagement",
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: "Section Management",
                path: "/Section-Mgt/All-Sections",
                icon: <IoIcons.IoIosPaper />,
            },
        ],
    },
    {
        title: "User Config",
        path: "/User Config",
        icon: <FaIcons.FaEnvelopeOpenText />,

        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,

        subNav: [
            {
                title: "User Role Management",
                path: "/AllUserRoleManagement",
                icon: <IoIcons.IoIosPaper />,
            },
            {
                title: "User Management",
                path: "/User-Mgt/All-Users",
                icon: <IoIcons.IoIosPaper />,
            },
        ],
    }

];