import {
    UserGroupIcon,
    UserAdd01Icon,
} from "hugeicons-react";

export const getIcon = (iconName) => {
    switch (iconName) {
        case "employees":
            return UserGroupIcon;
        case "add-employee":
            return UserAdd01Icon;
        default:
            return UserGroupIcon;
    }
};
