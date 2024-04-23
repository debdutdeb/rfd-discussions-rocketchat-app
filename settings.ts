import {
    type ISetting,
    SettingType,
} from "@rocket.chat/apps-engine/definition/settings";

type _SettingId =
    | "DiscussionRoomId"
    | "AdminUsernames"
    | "EngineeringRoom"
    | "Secret";

export type SettingId = `RFDD_${_SettingId}`;

export type SettingLabel = `RFDD_${_SettingId}_label`;
export type SettingDescription = `RFDD_${_SettingId}_description`;
export type SettingAlert = `RFDD_${_SettingId}_alert`;

// help me not type anything
export type IAppSetting = ISetting & {
    id: SettingId;
    i18nLabel: SettingLabel;
    i18nDescription?: SettingDescription;
    i18nAlert?: SettingAlert;
};

export const settings: Record<_SettingId, IAppSetting> = {
    DiscussionRoomId: {
        id: "RFDD_DiscussionRoomId",
        type: SettingType.ROOM_PICK,
        packageValue: "",
        public: false,
        required: true,
        i18nLabel: "RFDD_DiscussionRoomId_label",
        i18nDescription: "RFDD_DiscussionRoomId_description",
    },
    AdminUsernames: {
        id: "RFDD_AdminUsernames",
        i18nLabel: "RFDD_AdminUsernames_label",
        i18nDescription: "RFDD_AdminUsernames_description",
        packageValue: "",
        public: false,
        required: false,
        type: SettingType.STRING,
    },
    EngineeringRoom: {
        id: "RFDD_EngineeringRoom",
        i18nLabel: "RFDD_EngineeringRoom_label",
        i18nDescription: "RFDD_EngineeringRoom_description",
        public: false,
        required: true,
        type: SettingType.ROOM_PICK,
        packageValue: "",
    },
    Secret: {
        id: "RFDD_Secret",
        packageValue: "",
        required: true,
        i18nLabel: "RFDD_Secret_label",
        type: SettingType.PASSWORD,
        public: false,
    },
};
