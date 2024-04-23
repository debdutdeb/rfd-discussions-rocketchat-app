import { type IUser } from "@rocket.chat/apps-engine/definition/users";

import { RfdDiscussionsApp } from "./RfdDiscussionsApp";

export class UsersCache {
    private _users = [] as IUser[];

    private _ttl = 60 * 60 * 1000; // 1 hour

    private _fetchedWhen: Date | null;

    constructor(private readonly app: RfdDiscussionsApp) { }

    private get users(): Promise<IUser[]> {
        if (
            this._fetchedWhen &&
            Date.now() - this._fetchedWhen.getTime() < this._ttl
        ) {
            return Promise.resolve(this._users);
        }

        return new Promise((resolve) =>
            this.app
                .getAccessors()
                .reader.getRoomReader()
                .getMembers(this.app.engineeringRoomId)
                .then((members) => {
                    this._users = members;
                    resolve(members);
                }),
        );
    }

    public async findByEmail(email: string): Promise<IUser | undefined> {
        const members = await this.users;

        return members.find(
            (member) =>
                member.emails[0].address === email && member.emails[0].verified,
        );
    }
}
