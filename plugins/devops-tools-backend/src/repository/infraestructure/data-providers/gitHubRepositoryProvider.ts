import { Repository, Branch } from "../../domain/model/repository";
import { BranchProperties, RepositoryConfigs } from "../../domain/model/repositoryConfigs";
import { RepositoryProvider } from "./repositoryProvider";


export class GitHubRepositoryProvider implements RepositoryProvider {

    getRepository(repositoryName: string): Promise<Repository> {
        throw new Error("Method not implemented.");
    }
    createRepository(repositoryName: string): Promise<Repository> {
        throw new Error("Method not implemented.");
    }
    updateRepository(repository: Repository, repositorId: string): Promise<Repository> {
        throw new Error("Method not implemented.");
    }
    getBranches(repositoryId: string): Promise<Branch[]> {
        throw new Error("Method not implemented.");
    }
    createBranch(branch: BranchProperties, repository: Repository): Promise<any> {
        throw new Error("Method not implemented.");
    }
    deleteBranches(branches: string[], repositoryId: string): Promise<Branch[]> {
        throw new Error("Method not implemented.");
    }
    createPush(push: any, repositoryId: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    getRepositoryConfigs(): Promise<RepositoryConfigs> {
        throw new Error("Method not implemented.");
    }

}