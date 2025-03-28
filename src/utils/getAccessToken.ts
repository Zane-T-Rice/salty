import * as dotenv from "dotenv";
import { exec as exec2 } from "child_process";
import { promisify } from "util";
const exec = promisify(exec2);
dotenv.config();

export const getAccessToken = async (): Promise<string> => {
  try {
    // get access token from Auth0
    const curl = `curl --request POST \
       --url ${process.env.ACCESS_TOKEN_URL} \
       --header 'content-type: application/json' \
       --data '{"client_id":"${process.env.AUTH_CLIENT_ID}","client_secret":"${process.env.AUTH_CLIENT_SECRET}","audience":"${process.env.AUTH_AUDIENCE}","grant_type":"client_credentials"}'`;

    const accessToken: { access_token: string } = JSON.parse((await exec(curl)).stdout);

    return accessToken.access_token;
  } catch (e) {
    return "";
  }
};
