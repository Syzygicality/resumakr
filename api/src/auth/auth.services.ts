import { IdToken } from "../auth/auth.types";
import { User } from "../user/user.types";

import { Db } from "mongodb";

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