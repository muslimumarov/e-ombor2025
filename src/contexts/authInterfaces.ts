import {ProfileResponse} from "../utils/interfaces/interfaces.ts";

export interface AuthContextType {
    isAuthed: boolean;
    user: ProfileResponse | null;
    loading: boolean;
    login: (u: string, p: string) => Promise<ProfileResponse>;
    logout: () => Promise<void>;
}