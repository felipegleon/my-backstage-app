import { Branch, Repository } from "../model/repository";

export interface repositoryUseCase {

    createRepository(repositoryName: string, gitWorkflow: string): Promise<Repository>;

    renameRepository(repositoryName: string, newRepositoryName: string): Promise<Repository>;

    deleteBranches(repositoryName: string, branches: Array<string>): Promise<Array<Branch>>;

}