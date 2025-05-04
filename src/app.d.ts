// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces


declare global {
	namespace App {

        interface Platform {
            env: {
				AUTH_GOOGLE_ID: string;
				AUTH_GOOGLE_SECRET: string;
				AUTH_SECRET: string;
				DB: D1Database;
			}
            cf: CfProperties
            ctx: ExecutionContext
        }
    }
}

export {};