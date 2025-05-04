import { SvelteKitAuth } from "@auth/sveltekit"
import { D1Adapter } from "@auth/d1-adapter"
import Google from "@auth/sveltekit/providers/google"

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
    return {
        providers: [
            Google({ clientId: event.platform.env.AUTH_GOOGLE_ID, clientSecret: event.platform.env.AUTH_GOOGLE_SECRET })],
        trustHost: true,
        secret: event.platform.env.AUTH_SECRET,
        adapter: D1Adapter(event.platform.env.DB),
        session: {
            strategy: "database",
            maxAge: 30 * 24 * 60 * 60, // 30 days
            updateAge: 24 * 60 * 60 // wait atleast 24 hours before writing to the db to extend the age of the session (once per day) 
          }
    }
  })