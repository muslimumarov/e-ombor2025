import {UserRole} from "../interfaces/interfaces.ts";

export function routeByRole(role: UserRole): string {
    switch (role) {
        case "omborchi":
            return "/omborchi";
        case "bugalter":
            return "/bugalter";
        case "boshliq":
            return "/boshliq";
        case "xarid":
            return "/xarid";
        case "ishboshqaruvchi":
            return "/ishboshqaruvchi";
        default:
            return "/login";
    }
}
