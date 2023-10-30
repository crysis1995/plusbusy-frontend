import {useLocation} from "react-router-dom";

export default function useCurrentLocation(path?: string) {
    const data = useLocation();
    const isActive = data.pathname === path
    return {isActive, cssClass: "text-blue-600 underline underline-offset-4"}
}