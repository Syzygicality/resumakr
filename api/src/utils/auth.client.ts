const loginParams = new URLSearchParams({
    client_id: process.env.AUTH0_CLIENT_ID!,
    response_type: 'code',
    scope: 'openid profile email',
    redirect_uri: process.env.AUTH0_CALLBACK_URL!,
    audience: process.env.AUTH0_AUDIENCE!,
})

export const loginUrl = `https://${process.env.AUTH0_DOMAIN}/authorize?${loginParams.toString()}`

const returnTo = encodeURIComponent(process.env.APP_BASE_URL || "http://localhost:3000/auth/login");

export const logoutUrl = `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${returnTo}`;

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

export async function getManagementTokens() {
    const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            client_id: process.env.AUTH0_M2M_CLIENT_ID,
            client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
            audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
            grant_type: "client_credentials",
        }),
    });

    if (!response.ok) {
        const err = await response.text();
        console.error(err);
        throw new Error(`Auth0 token error: ${err}`);
    }

    return await response.json();
}

export async function deleteUser(accessToken: string, sub: string) {
    const response = await fetch(
        `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${encodeURIComponent(sub)}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!response.ok) throw new Error("Failed to delete Auth0 user")
}