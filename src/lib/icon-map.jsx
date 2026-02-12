import {
    DashboardCircleIcon,
    UserGroupIcon,
    UserAdd01Icon,
    Settings02Icon,
} from "hugeicons-react";

export const getIcon = (iconName) => {
    switch (iconName) {
        case "dashboard":
            return DashboardCircleIcon;
        case "employees":
            return UserGroupIcon;
        case "add-employee":
            return UserAdd01Icon;
        case "settings":
            return Settings02Icon;
        default:
            return DashboardCircleIcon;
    }
};
