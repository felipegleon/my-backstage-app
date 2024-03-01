import { WebApi, getPersonalAccessTokenHandler } from "azure-devops-node-api";
import { IReleaseApi } from "azure-devops-node-api/ReleaseApi";
import { IPolicyApi } from "azure-devops-node-api/PolicyApi";
import { IBuildApi } from "azure-devops-node-api/BuildApi";
import { ICoreApi } from "azure-devops-node-api/CoreApi";
import { IGitApi } from "azure-devops-node-api/GitApi";

function getApi(): WebApi {
    try {
        const serverUrl: string = 'https://dev.azure.com/grupobancolombia';
        const token: string = 'nlcls6nokfsu4d3g3fxgrljokmljkekltrv3bk4p242ellmjvjiq';
        const authHandler = getPersonalAccessTokenHandler(token);
        const option = {
            socketTimeout: 2147483647,
            allowRetries: true,
            maxRetries: 5,
            ignoreSslError: true,
        };
        const webApi: WebApi = new WebApi(serverUrl, authHandler, option);
        return webApi;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export class AzureClient {
    private static instance: AzureClient;

    private webApi: WebApi;
    private projectId: string;

    private constructor() {
        this.webApi = getApi();
        this.projectId = 'b267af7c-3233-4ad1-97b3-91083943100d';
    }

    public static getInstance(): AzureClient {
        if (!AzureClient.instance) {
            AzureClient.instance = new AzureClient();
        }
        return AzureClient.instance;
    }

    public getProjectId(): string {
        return this.projectId;
    }

    public getServerUrl(): string {
        return this.webApi.serverUrl;
    }

    public getWebApi(): WebApi {
        return this.webApi;
    }

    public async getGitApi(): Promise<IGitApi> {
        return await this.webApi.getGitApi();
    }

    public async getBuildApi(): Promise<IBuildApi> {
        return await this.webApi.getBuildApi();
    }

    public async getPolicyApi(): Promise<IPolicyApi> {
        return await this.webApi.getPolicyApi();
    }

    public async getReleaseApi(): Promise<IReleaseApi> {
        return await this.webApi.getReleaseApi();
    }

    public async getCoreApi(): Promise<ICoreApi> {
        return await this.webApi.getCoreApi();
    }
}


