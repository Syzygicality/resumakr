import { deleteUser, getManagementTokens } from "../utils/auth.client";
import { User, UserPatch } from "./user.types";

import { Db } from "mongodb";

export async function retrieveUser(db: Db, sub: string) {
    return await db.collection<User>("users").findOne({ _id: sub })!;
}

export async function updateUser(db: Db, sub: string, body: UserPatch) {
    await db.collection<User>("users").updateOne(
        { _id: sub },
        {$set: body},
        { upsert: true }
    )
    return await db.collection<User>("users").findOne({ _id: sub })
}

export async function destroyUserMongo(db: Db, sub: string) {
    await db.collection<User>("users").deleteOne({ _id: sub });
}

export async function destroyUserAuth0(sub: string) {
    const { access_token } = await getManagementTokens();
    await deleteUser(access_token, sub);
}