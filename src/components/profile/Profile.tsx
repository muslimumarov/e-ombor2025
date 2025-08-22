    import {Avatar, Dropdown, Spinner} from "flowbite-react";
    import {useTranslation} from "react-i18next";
    import {toast} from "react-toastify";
    import {useAuthStore} from "../../store/authStore";
    import {useProfile} from "./useProfilhook.ts";

    const Profile = () => {
        const {t} = useTranslation();
        const {logout, isAuthed} = useAuthStore();
        const {profile, loading} = useProfile(isAuthed);

        if (!isAuthed) return null;

        return (
            <div className="relative inline-block">
                <Dropdown

                    inline
                    label={
                        loading ? (
                            <Spinner size="sm"/>
                        ) : (
                            <Avatar
                                bordered
                                img={profile?.image_url || "/images/profile.png"}
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
                        <span className="block truncate text-sm font-medium ">
                {profile?.email || t("emailNotFound")}
              </span>
                    </Dropdown.Header>

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
