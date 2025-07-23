import {Avatar, Dropdown} from "flowbite-react";
import {useTranslation} from "react-i18next";
import user from "../../../public/images/profile.png"

const Profile = () => {
    const {t} = useTranslation();

    return (
        <div className=" relative inline-block">
            <Dropdown
                arrowIcon={true}
                inline
                label={
                    <Avatar
                        bordered
                        img={user}
                        className="no-co no-copy h-[20px] object-cover"
                        alt={""}
                        rounded
                    />
                }
                className="absolute left-[-50px]  top-[40px] w-40"
            >

                <Dropdown.Header>
                    <span className="block text-sm">{t("userNotFound")}</span>
                    <span className="block truncate text-sm font-medium">
            {t("emailNotFound")}
          </span>
                </Dropdown.Header>
                <Dropdown.Item href={"/settings"}>{t("settings")}</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item className="text-red-600">
                    {t("logout")}
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default Profile;
