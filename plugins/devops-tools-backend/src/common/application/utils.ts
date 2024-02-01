export function extractConfigElementCode(name: string): string {
    try {
        const appCode: string = name.split('_')[0];
        if (appCode.match(/^(AW|NU).......$/)) {
            return appCode.replace(/...$/, '001');
        }
        else if (appCode.match(/^(AW|NU)....$/)) {
            return appCode + '001';
        }
        return appCode;
    } catch (error: any) {
        throw new Error(`Error extacting configuration element code code from repository name ${name}: ${error.message}`);
    }
}