import { retrieveUser } from "../user/user.services";
import { HTTPError, http } from "../utils/http";

import { Db } from "mongodb";

export async function retrieveKeyStatus(db: Db, sub: string) {
    const user = await retrieveUser(db, sub);
    if (!user?.APIKey) return {"keyExists": false};
    return {"keyExists": true, "keyStatus": user.APIKey.disabled}
}

export async function createKey(db: Db, sub: string) {
    const user = await retrieveUser(db, sub);
}