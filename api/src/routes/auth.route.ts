import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { jwtDecode } from "jwt-decode";
import { BaseUser } from '../schemas/auth.schema';

interface CallbackQuery {
  code: string;
  state?: string; // optional, if you’re using state
}

export default async function authRoutes(app: FastifyInstance) {
  app.get('/login', async (request, reply) => {
    const params = new URLSearchParams({
      client_id: process.env.AUTH0_CLIENT_ID!,
      response_type: 'code',
      scope: 'openid profile email',
      redirect_uri: process.env.AUTH0_CALLBACK_URL!,
      audience: process.env.AUTH0_AUDIENCE!,
    }); 

    return reply.redirect(`https://${process.env.AUTH0_DOMAIN}/authorize?${params.toString()}`);
  });
  app.get('/callback', async (request: FastifyRequest<{ Querystring: CallbackQuery }>, reply: FastifyReply) => {
    const { code } = request.query;

    if (!code) {
    return reply.status(400).send({ error: 'Missing code' });
    }

    // Exchange code for tokens
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
    const tokens = await response.json();

    const idToken: any = jwtDecode(tokens.id_token);

    const users = request.server.mongo.db!.collection<BaseUser>("users");
    const user = await users.findOne({ _id : idToken.sub });

    if (!user) {
      await users.insertOne(
        {
          _id: idToken.sub!,
          name: idToken.name,
          email: idToken.email, 
          creation_date: new Date(),
          onboarded: false,
        }
      )
    }

    reply.send(tokens);
    });
}