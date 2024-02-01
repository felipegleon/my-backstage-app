import { Branch, Repository } from "../../domain/model/repository";
import { BranchProperties, RepositoryConfigs } from "../../domain/model/repositoryConfigs";

export interface RepositoryProvider {

    getRepository(repositoryName: string): Promise<Repository | undefined>;

    createRepository(repositoryName: string): Promise<Repository>;

    updateRepository(repository: Repository, repositorId: string): Promise<Repository>;

    getBranches(repositoryId: string): Promise<Array<Branch>>;

    createBranch(branch: BranchProperties, repository: Repository): Promise<any>;

    deleteBranches(branches: Array<string>, repositoryId: string): Promise<Array<Branch>>;

    createPush(push: any, repositoryId: string): Promise<any>;

    getRepositoryConfigs(): Promise<RepositoryConfigs>;

}