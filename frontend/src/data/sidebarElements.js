import { LayoutGrid, LineChart, PlusCircle, Settings, Home, PieChart, Plus, Wallet } from "lucide-react";

export const sidebarElements = [
    {
        id: 1,
        label: "Dashboard",
        icon: LayoutGrid,
        type: "link",
        path: "/dashboard"
    },
    {
        id: 3,
        label: "Add Entry",
        icon: PlusCircle,
        type: "button",
        action: "onAddEntry",
        special: true
    },
    {
        id: 5,
        label: "Settings",
        icon: Settings,
        type: "link",
        path: "/settings"
    }
];
