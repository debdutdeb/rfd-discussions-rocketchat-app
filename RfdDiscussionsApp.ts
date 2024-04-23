import {
    IAppAccessors,
    ILogger,
    IConfigurationExtend,
    IEnvironmentRead,
    IConfigurationModify,
    IRead,
    IHttp,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { ISetting } from "@rocket.chat/apps-engine/definition/settings";

import { settings } from "./settings";

export class RfdDiscussionsApp extends App {
    public secret: string;
    public discussionRoomId: string;
    public engineeringRoomId: string;

    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async initialize(
        _configurationExtend: IConfigurationExtend,
        _environmentRead: IEnvironmentRead,
    ): Promise<void> { }

    public async onEnable(
        environment: IEnvironmentRead,
        _configurationModify: IConfigurationModify,
    ): Promise<boolean> {
        const getValue = (setting: ISetting): Promise<string | any> =>
            new Promise((resolve) =>
                environment
                    .getSettings()
                    .getValueById(setting.id)
                    .then((value) =>
                        resolve(
                            typeof value === "string" ? value.trim() : value,
                        ),
                    ),
            );

        this.discussionRoomId = await getValue(settings.DiscussionRoomId);
        this.engineeringRoomId = await getValue(settings.EngineeringRoom);
        this.secret = await getValue(settings.Secret);

        return Boolean(this.secret);
    }

    public async onSettingUpdated(
        setting: ISetting,
        _configurationModify: IConfigurationModify,
        _read: IRead,
        _http: IHttp,
    ): Promise<void> {
        switch (setting.id) {
            case settings.DiscussionRoomId.id:
                this.discussionRoomId = setting.value;
            case settings.DiscussionRoomId.id:
                this.discussionRoomId = setting.value;
            case settings.DiscussionRoomId.id:
                this.discussionRoomId = setting.value;
        }
    }
}
