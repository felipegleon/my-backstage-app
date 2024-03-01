import { CmdbProvider } from "./cmdbProvider";
import { ConfigElement, Instance } from "../domain/helix";

export class CmdbHelixProvider implements CmdbProvider<Instance> {

    constructor() { }

    public async getElement(name: string): Promise<Instance> {
        const url: string = 'https://bancolombia-qa-restapi.onbmc.com/api';
        const username: string = 'vsts';
        const password: string = '3@!*qJUg8GZ6';
        const token: string = await this.getToken(url, username, password);
        const qualification: string = `'ClassId' = "BMC_APPLICATION" AND 'Name' LIKE "%${name}%"`;
        const urlElement: string = `${url}/cmdb/v1.0/instances/BMC.ASSET/BMC.CORE/BMC_BaseElement?num_matches=true&qualification=${qualification}`;
        try {
            const optionalParams = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `AR-JWT ${token}`,
                },
            };
            const response = await fetch(urlElement, optionalParams);
            if (response.status !== 200) {
                throw new Error(`Fail request to BMC Helix with status code ${response.status} - ${response.statusText}`);
            }

            const configElementHelix: ConfigElement = await response.json() as ConfigElement;

            if (configElementHelix.instances.length > 0) {
                return configElementHelix.instances[0];
            }

            throw new Error(`The App code ${name} does not have elements associate in Helix [BMC_APPLICATION]`);
        } catch (error: any) {
            throw new Error(`Error getting element from Helix: ${error.message}`);
        }
    }

    private async getToken(url: string, userHelix: string, passHelix: string): Promise<string> {
        const urlLogin: string = `${url}/jwt/login`;
        try {
            const response = await fetch(
                urlLogin,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `username=${userHelix}&password=${passHelix}`,
                }
            );

            if (response.status !== 200) {
                throw new Error(`Fail request to BMC Helix with status code ${response.status} - ${response.statusText}`);
            }

            return await response.text() as string;
        } catch (error: any) {
            throw new Error(`Can not get the auth token from Helix - ${error.message}`);
        }
    }

}