import { deleteUser, getManagementTokens } from "../helpers/auth.client";
import { User, UserPatch } from "../types/user.types";

import { Db } from "mongodb";

export async function getPartialUserEntry(db: Db, sub: string) {
    return await db.collection<User>("users").findOne({ _id: sub });
}

export async function getFullUserEntry(db: Db, sub: string) {
    return await db.collection<User>("users").findOne({ _id: sub });
}

export async function updateUserEntry(db: Db, sub: string, body: UserPatch) {
    await db.collection<User>("users").updateOne(
        { _id: sub },
        {$set: body},
        { upsert: true }
    )
    return await db.collection<User>("users").findOne({ _id: sub })
}

export async function deleteUserEntry(db: Db, sub: string) {
    await db.collection<User>("users").deleteOne({ _id: sub });
}

export async function deleteUserAuth0(sub: string) {
    const { access_token } = await getManagementTokens();
    await deleteUser(access_token, sub);
}