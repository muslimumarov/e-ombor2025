import { Avatar, Dropdown, Spinner } from "flowbite-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getProfile, ProfileResponse } from "../../lib/api";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";

const Profile = () => {
    const { t } = useTranslation();
    const { logout, isAuthed } = useAuthStore();
    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthed) return; // token bo‘lmasa API chaqirmaymiz
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

    if (!isAuthed) return null; // login bo‘lmagan bo‘lsa umuman chiqmaydi

    return (
        <div className="relative inline-block">
            <Dropdown
                arrowIcon
                inline
                label={
                    loading ? (
                        <Spinner size="sm" />
                    ) : (
                        <Avatar
                            bordered
                            img={profile?.image_url || "/profile.png"}
                            alt={profile ? `${profile.first_name} ${profile.last_name}` : "User"}
                            rounded
                        />
                    )
                }
                className="absolute left-[-50px] top-[40px] w-40"
            >
                <Dropdown.Header>
          <span className="block text-sm">
            {profile
                ? `${profile.first_name} ${profile.last_name}`
                : t("userNotFound")}
          </span>
                    <span className="block truncate text-sm font-medium">
            {profile?.email || t("emailNotFound")}
          </span>
                </Dropdown.Header>
                <Dropdown.Item href={"/settings"}>{t("settings")}</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                    onClick={() => {
                        logout();
                        toast.info(t("logout"));
                    }}
                    className="text-red-600"
                >
                    {t("logout")}
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default Profile;
