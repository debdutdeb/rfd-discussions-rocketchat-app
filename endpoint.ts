import {
    ApiEndpoint,
    type IApiRequest,
    type IApiEndpointInfo,
} from "@rocket.chat/apps-engine/definition/api";
import {
    IHttp,
    IRead,
    IModify,
    IPersistence,
} from "@rocket.chat/apps-engine/definition/accessors";

import { RfdDiscussionsApp } from "./RfdDiscussionsApp";
import { type UsersCache } from "./usercache";
import { settings } from "./settings";

export interface RfdCreatePayload {
    id: number;
    title: string;
    author: {
        email: string;
    };
}

class CreateDiscussion extends ApiEndpoint {
    public path = "discuss";

    public authRequired = true;

    constructor(
        public app: RfdDiscussionsApp,
        private readonly usersCache: UsersCache,
    ) {
        super(app);
    }

    public async post(
        request: IApiRequest,
        endpoint: IApiEndpointInfo,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
    ) {
        const {
            user,
            content: rfd,
            headers,
        }: {
            user?: IApiRequest["user"];
            content: RfdCreatePayload;
            headers: Record<string, string>;
        } = request;

        const token = headers["authorization"].split(" ")[1];
        if (token !== this.app.secret) {
        }

        const room = await read
            .getRoomReader()
            .getById(this.app.discussionRoomId);
        if (!room) {
            this.app.getLogger().info("room not found");
        }

        if (!user) {
            this.app.getLogger().info("user not authenticated");
        }

        if (!rfd) {
            this.app.getLogger().info("payload not found");
        }

        if (!rfd.id) {
            this.app.getLogger().info("RFD id not found");
        }

        if (!rfd.title) {
            this.app.getLogger().info("RFD title not found");
        }

        const me = await read.getUserReader().getAppUser();
        if (!me) {
            throw new Error("app user could not detected");
        }

        const author = await this.usersCache.findByEmail(rfd.author.email);
        if (!author) {
            this.app
                .getLogger()
                .error(
                    `no users exist in engineering room with email ${rfd.author.email}`,
                );
            return;
        }

        const title = `rfd(${author.username})-${rfd.id}-${rfd.title}`.replace(
            /\s|\./,
            "-",
        );

        await modify
            .getCreator()
            .finish(
                modify
                    .getCreator()
                    .startDiscussion()
                    .setCreator(me)
                    .setDisplayName(title)
                    .addMemberToBeAddedByUsername(author.username),
            );
    }
}
