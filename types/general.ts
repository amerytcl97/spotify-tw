import { ReactElement, ReactNode } from "react";

export interface PageRoute {
    name: string;
    url: string;
    icon?: ReactNode | ReactElement;
}