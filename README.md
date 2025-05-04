# Sveltekit w/ D1 database and Auth
This is a template project built with Sveltekit, Cloudflare workers and a D1 database with an Auth systems provided by AuthJS. The biggest problem with setting up any Auth for D1 databases is that the support with Sveltekit is poor and outdated. This is a working starter template with AuthJS ready to go. PLEASE read the guide below on how to get things functioning


# Necessary steps
## Environment variables
For some reason when working with AuthJS and D1 databases only .dev.vars is respected and actually read. The documentation doesn't state this anywhere. Just fill in the format below into your file for this template to work.
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_SECRET=

## Fixing a broken package
The @auth/core/lib/utils/env.js file has a bug with it in how AuthJS passes environmental variables to it. Essentially whatever the default method for doing that isn't working when used with D1 databases. 

My solution is to change the package each time. I will implement a patch thing properly via node once this gets fleshed out more, and submit a push request / raise an issue on the github.
```javascript 
const sanitizedUrl = url.toString().replace(/\/$/, "");
    if (basePath) {
        // remove leading and trailing slash
        const sanitizedBasePath = basePath.basePath.replace(/(^\/|\/$)/g, "") ?? "";
        return new URL(`${sanitizedUrl}/${sanitizedBasePath}/${action}`);
    }
    return new URL(`${sanitizedUrl}/${action}`);
```

## Setting up URL and wrangler
Go ahead and run wrangler login if you haven't already. Change the wrangler.jsonc to the name of your worker and the database_id and database_name to that of your D1's ID. If my memory is correct you'll need to create a token / env for your D1 that has read write permissions first. This sets it to push to your worker url. Edit the wrangler.jsonc as needed, but leave the bindings.

### Add secrets to your worker
Go to your worker's settings and go to variables / secrets. Click add. For each line the the .dev.vars, add a 'secret' (not text) to your worker with the title being before the equal sign, and the value being after the equal sign. 

## Favicon
For some reason AuthJS's login provider page requires you to have a favicon.ico instead of a .png. This differs from sveltekit's .png system. Honestly not sure why, but make sure to have both unless you want a console error. 

## Upload your database schema
In src/lib/schema is a copy of the database schema. You can add to it, but **those 4 tables are essential**. 
```
wrangler d1 execute forum-db --local --file .\src\lib\server\schema-migration.sql
wrangler d1 execute forum-db --remote --file .\src\lib\server\schema-migration.sql
```
