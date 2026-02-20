import { IdToken } from "../types/auth.types";
import { User } from "../types/user.types";

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

const newUserFactory = (sub: string, name: string, email: string) => {
    return {
        _id: sub,
        name: name,
        email: email, 
        creationDate: new Date(),
        tags: new Array(),
        links: new Array(),
        sections: new Array(),
        resumes: new Array()
    }
}

export async function checkNewUser(db: Db, idToken: IdToken) {
    const users = db.collection<User>("users");
    const user = await users.findOne({ _id : idToken.sub });
    if (!user) await users.insertOne(newUserFactory(idToken.sub!, idToken.name, idToken.email));
}