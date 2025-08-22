import { useEffect, useState } from "react";
import { getProfile } from "../../lib/request";
import { ProfileResponse } from "../../utils/interfaces/interfaces";

export function useProfile(isAuthed: boolean) {
    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthed) return;
        (async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (err) {
                console.error("Profilni olishda xato:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, [isAuthed]);

    return { profile, loading };
}
