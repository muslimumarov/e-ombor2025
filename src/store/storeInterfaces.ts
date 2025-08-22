import {ProfileResponse} from "../utils/interfaces/interfaces.ts";

export interface AuthState {
    user: ProfileResponse | null;
    accessToken: string | null;
    isAuthed: boolean;
    loading: boolean;

    setAccess: (token: string | null) => void;
    setUser: (user: ProfileResponse | null) => void;
    setLoading: (val: boolean) => void;

    login: (username: string, password: string) => Promise<ProfileResponse>;
    logout: () => Promise<void>;
    loadProfile: () => Promise<void>;
    refresh: () => Promise<void>;
    bootstrap: () => Promise<void>;
}