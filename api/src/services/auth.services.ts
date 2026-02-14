import { BaseUser, IdToken } from "../types/auth.types";

import { Db } from "mongodb";

export async function getTokens(code: string) {
    const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code,
        redirect_uri: process.env.AUTH0_CALLBACK_URL,
        }),
    });
    return await response.json()
}

export async function checkNewUser(db: Db, idToken: IdToken) {
    const users = db.collection<BaseUser>("users");
    const user = await users.findOne({ _id : idToken.sub });

    if (!user) {
        await users.insertOne({
            _id: idToken.sub!,
            name: idToken.name,
            email: idToken.email, 
            creation_date: new Date(),
            onboarded: false,
        });
    }
}