import { AzureRepositoryProvider } from "./azureRepositoryProvider";
import { GitHubRepositoryProvider } from "./gitHubRepositoryProvider";
import { RepositoryProvider } from "./repositoryProvider";


export function repositoryProviderFactory(client: string): RepositoryProvider {

    switch (client) {
        case 'azGit':
            return new AzureRepositoryProvider();
        /*case 'gitHub':
            return new GitHubRepositoryProvider();
        */
        default:
            throw new Error(`Client ${client} is not identify`);
    }

}