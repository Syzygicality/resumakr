import { User } from "../types/user.types";

import { Db } from "mongodb";

export async function getUserCollection(db: Db, sub: string) {
    return await db.collection<User>("users").findOne({ _id: sub })
}

export async function deleteUserCollection(db: Db, sub: string) {
    await db.collection<User>("users").deleteOne({ _id: sub });
}

export async function deleteUserAuth0(sub: string) {
    const tokenRes = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
            grant_type: "client_credentials",
        }),
    });

    if (!tokenRes.ok) throw new Error("Failed to obtain Auth0 management token");

    const { access_token } = await tokenRes.json();

    const deleteRes = await fetch(
        `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(sub)}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );

    if (!deleteRes.ok) throw new Error("Failed to delete Auth0 user");
}