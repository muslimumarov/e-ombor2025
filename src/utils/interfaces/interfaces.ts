import {ReactNode} from "react";

export type UserRole = "omborchi" | "bugalter" | "boshliq" | "xarid" | "ishboshqaruvchi";


export interface ProtectedRouteProps {
    role?: UserRole; // agar route faqat bitta rol uchun bo‘lsa (masalan faqat "boshliq")
    children?: ReactNode; // ichidagi componentlar (private sahifa)
}

export interface ProfileResponse {
    id: number;
    username: string;
    role: UserRole;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    image_url: string | null;
}


export interface LoginResponse {
    access: string;
    refresh?: string;
}