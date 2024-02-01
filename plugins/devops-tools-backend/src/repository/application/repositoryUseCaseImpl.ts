import { RepositoryProvider } from "../infraestructure/data-providers/repositoryProvider";
import { WorkFlowProperties, RepositoryConfigs } from "../domain/model/repositoryConfigs";
import { repositoryUseCase } from "../domain/use-case/repositoryUseCase";
import { checkRepositoryName, getFeatureBranches } from "./utils";
import { repositoryProviderFactory } from "../infraestructure/data-providers/repositoryProviderFactory";
import { Branch, Repository } from "../domain/model/repository";

export class repositoryUseCaseImpl implements repositoryUseCase {

    private repositoryProvider: RepositoryProvider;

    constructor(client: string) {
        this.repositoryProvider = repositoryProviderFactory(client);
    }

    public async createRepository(repositoryName: string, gitWorkflow: string): Promise<Repository> {
        try {
            let repository = await this.repositoryProvider.getRepository(repositoryName);
            if (!repository) {
                await checkRepositoryName(repositoryName);
                repository = await this.repositoryProvider.createRepository(repositoryName);
                await this.createMainBranches(repository, gitWorkflow);
            }
            return repository;
        } catch (error: any) {
            throw new Error(`Can not create the repository: ${error.message}`);
        }
    }

    public async renameRepository(repositoryName: string, newRepositoryName: string): Promise<Repository> {
        try {
            let repository = await this.repositoryProvider.getRepository(repositoryName);
            if (!repository) {
                throw new Error(`The repository ${repositoryName} not exist.`);
            }
            await checkRepositoryName(newRepositoryName);
            repository.name = newRepositoryName;
            return await this.repositoryProvider.updateRepository(repository, repository.id as string);
        } catch (error: any) {
            throw new Error(`Could not rename the repository: ${error.message}`);
        }
    }


    public async deleteBranches(repositoryName: string, branchesToDelete: Array<string>): Promise<Array<Branch>> {
        try {
            let repository = await this.repositoryProvider.getRepository(repositoryName);
            if (!repository) {
                throw new Error(`The repository ${repositoryName} not exist.`);
            }
            branchesToDelete = await getFeatureBranches(branchesToDelete);
            if (branchesToDelete.length < 1) {
                throw new Error(`You can not delete the main branches`);
            }
            return await this.repositoryProvider.deleteBranches(branchesToDelete, repository.id as string);
        } catch (error: any) {
            throw new Error(`Could not delete branches: ${error.message}`);
        }

    }




    private async createMainBranches(repository: any, gitWorkflow: string): Promise<void> {
        try {
            const repoConfigs: RepositoryConfigs = await this.repositoryProvider.getRepositoryConfigs();
            const workFlow: WorkFlowProperties =
                Object.keys(repoConfigs.gitFlowBranches)
                    .flatMap(key => repoConfigs.gitFlowBranches[key])
                    .find(branch => branch.pattern && new RegExp(branch.pattern as string).test(repository.name))
                ??
                repoConfigs.gitFlowBranches[gitWorkflow];
            for (let branch of workFlow.branches) {
                await this.repositoryProvider.createBranch(branch, repository)
            }
        } catch (error: any) {
            throw new Error(`Falied the creation of branches - ${error.message}`);
        }
    }

}


