export interface RepositoryConfigs {

    namingStandard: NamingStandard;
    gitFlowBranches: GitFlowBranches;
}

export interface NamingStandard {
    include: string;
    exclude: string;
}

export interface GitFlowBranches {
    [key: string]: WorkFlowProperties;
}

export interface WorkFlowProperties {
    pattern?: string;
    branches: Array<BranchProperties>;
}

export interface BranchProperties {
    name: string;
    isDefault: boolean;
}
