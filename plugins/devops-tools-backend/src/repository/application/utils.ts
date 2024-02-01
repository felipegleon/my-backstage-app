import { AzureRepositoryProvider } from "../infraestructure/data-providers/azureRepositoryProvider";
import { CmdbHelixProvider } from "../../cmdb/infraestructure/cmdbHelixProvider";
import { extractConfigElementCode } from "../../common/application/utils";
import { RepositoryConfigs } from "../domain/model/repositoryConfigs";

export async function checkRepositoryName(repositoryName: string): Promise<void> {
    const repositoryProvider = new AzureRepositoryProvider()
    const repoConfigs: RepositoryConfigs = await repositoryProvider.getRepositoryConfigs();
    if (new RegExp(repoConfigs.namingStandard.exclude).test(repositoryName)) {
        throw new Error(`Repository name ${repositoryName} not allowed`);
    }
    if (new RegExp(repoConfigs.namingStandard.include).test(repositoryName)) {
        const cmdbProvider: CmdbHelixProvider = new CmdbHelixProvider();
        const uniqueCode: string = extractConfigElementCode(repositoryName);
        await cmdbProvider.getElement(uniqueCode);
    } else {
        throw new Error(`Repository name ${repositoryName} don't match with naming standard`);
    }
}


export async function getFeatureBranches(branches: Array<string>): Promise<Array<string>> {
    const repositoryProvider = new AzureRepositoryProvider()
    const repoConfigs: RepositoryConfigs = await repositoryProvider.getRepositoryConfigs();
    const mainBranchPatterns: Array<string> = Object.keys(repoConfigs.gitFlowBranches)
        .flatMap(key => repoConfigs.gitFlowBranches[key].branches.map(branch => `^.*${branch.name}$`))
    return branches.filter(branch => !mainBranchPatterns.some(pattern => new RegExp(pattern).test(branch)))
}