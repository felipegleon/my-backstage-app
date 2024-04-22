import { DiscoveryApi } from "@backstage/core-plugin-api";

export class DevopsToolsClient implements DevopsToolsBackendApi {

    private readonly discoveryApi: DiscoveryApi;

    constructor(options: { discoveryApi: DiscoveryApi }) {
        this.discoveryApi = options.discoveryApi;
    }


    async createRepository(body: any): Promise<any> {
        try {

            const url = `${await this.discoveryApi.getBaseUrl('devops-tools')}/repository/create`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('An error occurred while making the API request:', error);
        }
    }
}