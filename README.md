# salty

### Dependencies

##### Required

```sh
node --version
v16.13.1

npm --version
6.14.14
```

```sh
# Fill these out in a file named .env in the root of the project.
# They are pulled in at runtime by the dotenv package.
# Your .env file should not be commited and should already be ignored by .gitignore.

TOKEN=
CLIENT_ID=
GUILD_ID=

# Jellyfin API Key
JELLYFIN_URL=
API_KEY=

# The directory where YouTube videos should be downloaded.
YOUTUBE_DIRECTORY=
YOUTUBE_DIRECTORY_JELLYFIN_ID=

# The url to the server-manager-service, including port number
SERVER_MANAGER_SERVICE_URL=

# OAuth2.0 Client Credentials
CLIENT_ID=
CLIENT_SECRET=
AUDIENCE=
```

### Deploy Slash Commands To Server

```sh
(cd src/ && node deploy-commands.js)
```

### How to Build

```sh
npm install
npm run build
```

### How to Start

```sh
npm start
```
