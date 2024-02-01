import { AzureClient } from '../../../common/infraestructure/azureClient';
import { BranchProperties, RepositoryConfigs } from '../../domain/model/repositoryConfigs';
import { RepositoryProvider } from "./repositoryProvider";
import { IGitApi } from 'azure-devops-node-api/GitApi';
import {
    GitRef,
    GitPush,
    GitRefUpdate,
    GitRepository,
    ItemContentType,
    VersionControlChangeType,
    GitRepositoryCreateOptions,
    GitRefUpdateResult
} from 'azure-devops-node-api/interfaces/GitInterfaces';
import repositoryConfig from '../../../remoteConfig.json';
import { Branch, Repository } from '../../domain/model/repository';

export class AzureRepositoryProvider implements RepositoryProvider {

    public async getRepository(repositoryName: string): Promise<Repository | undefined> {
        try {
            const client: AzureClient = AzureClient.getInstance();
            const gitApi: IGitApi = await client.getGitApi();
            const azureGit: GitRepository = await gitApi.getRepository(repositoryName, client.getProjectId());
            return azureGit ? this.mapperAzureGitToRepository(azureGit) : undefined;
        } catch (error: any) {
            throw new Error(`Process error getting azure repository: ${error.message}`);
        }
    }

    public async createRepository(repositoryName: string): Promise<Repository> {
        try {
            const client: AzureClient = AzureClient.getInstance();
            const gitApi: IGitApi = await client.getGitApi();
            const createOptions: GitRepositoryCreateOptions = <GitRepositoryCreateOptions>{ name: repositoryName };
            const azureGit: GitRepository = await gitApi.createRepository(createOptions, client.getProjectId());
            return this.mapperAzureGitToRepository(azureGit)
        } catch (error: any) {
            throw new Error(`Process error creating azure repository: ${error.message}`);
        }
    }

    public async updateRepository(repository: Repository, repositoryId: string): Promise<Repository> {
        try {
            const client: AzureClient = AzureClient.getInstance();
            const gitApi: IGitApi = await client.getGitApi();
            const azureGit: GitRepository = this.mapperRepositoryToAzureGit(repository)
            const azureGitUpdated: GitRepository = await gitApi.updateRepository(azureGit, repositoryId, client.getProjectId());
            return this.mapperAzureGitToRepository(azureGitUpdated)
        } catch (error: any) {
            throw new Error(`Process error updating repository: ${error.message}`);
        }
    }

    public async getBranches(repositoryId: string): Promise<Array<Branch>> {
        try {
            const client: AzureClient = AzureClient.getInstance();
            const gitApi: IGitApi = await client.getGitApi();
            const azureRefs: Array<GitRef> = await gitApi.getRefs(repositoryId, client.getProjectId());
            return azureRefs.map(ref => ({ id: ref.objectId as string, name: ref.name as string }))
        } catch (error: any) {
            throw new Error(`Process error getting azure branches: ${error.message}`);
        }
    }


    public async createBranch(branch: BranchProperties, repository: Repository): Promise<GitPush> {
        try {
            const push: GitPush = {
                commits: [{
                    author: { name: 'DevOps Team' },
                    comment: 'Init project from DevOpsTools extension',
                    changes: [{
                        changeType: VersionControlChangeType.Add,
                        item: { path: `/README.md` },
                        newContent: { content: 'Project Readmi', contentType: ItemContentType.RawText }
                    }]
                }],
                refUpdates: [{ name: `refs/heads/${branch.name}`, oldObjectId: '0000000000000000000000000000000000000000' }],
                repository: { id: repository.id as string, name: repository.name }
            }
            const client: AzureClient = AzureClient.getInstance();
            const gitApi: IGitApi = await client.getGitApi();
            return await gitApi.createPush(push, repository.id as string, client.getProjectId());
        } catch (error: any) {
            throw new Error(`Process error doing push to azure repository: ${error.message}`);
        }
    }

    public async deleteBranches(branches: Array<string>, repositoryId: string): Promise<Array<Branch>> {
        try {
            const refs: Array<GitRefUpdate> = branches.map(branch => ({
                name: `refs/heads/${branch}`,
                oldObjectId: "0000000000000000000000000000000000000000",
                newObjectId: "0000000000000000000000000000000000000000"
            }));
            const client: AzureClient = AzureClient.getInstance();
            const gitApi: IGitApi = await client.getGitApi();
            const refsDeleted: Array<GitRefUpdateResult> = await gitApi.updateRefs(refs, repositoryId, client.getProjectId());
            return refsDeleted.map(ref => ({ id: ref.newObjectId as string ?? ref.oldObjectId as string, name: ref.name as string }))
        } catch (error: any) {
            throw new Error(`Process error updating azure branches: ${error.message}`);
        }
    }

    public async createPush(push: GitPush, repositoryId: string): Promise<GitPush> {
        try {
            const client: AzureClient = AzureClient.getInstance();
            const gitApi: IGitApi = await client.getGitApi();
            return await gitApi.createPush(push, repositoryId, client.getProjectId());
        } catch (error: any) {
            throw new Error(`Process error doing push to azure repository: ${error.message}`);
        }
    }


    public async getRepositoryConfigs(): Promise<RepositoryConfigs> {
        return repositoryConfig;
    }


    private mapperRepositoryToAzureGit(repository: Repository): GitRepository {
        return {
            id: repository.id as string,
            name: repository.name
        }
    }

    private mapperAzureGitToRepository(repository: GitRepository): Repository {
        return {
            id: repository.id as string,
            name: repository.name as string
        }
    }
}   