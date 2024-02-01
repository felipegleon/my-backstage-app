import { WebApi, getPersonalAccessTokenHandler } from "azure-devops-node-api";
import { IReleaseApi } from "azure-devops-node-api/ReleaseApi";
import { IPolicyApi } from "azure-devops-node-api/PolicyApi";
import { IBuildApi } from "azure-devops-node-api/BuildApi";
import { ICoreApi } from "azure-devops-node-api/CoreApi";
import { IGitApi } from "azure-devops-node-api/GitApi";

function getApi(): WebApi {
    try {
        const serverUrl: string = 'serverUrl';
        const token: string = 'token';
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
        this.projectId = 'projectId';
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


