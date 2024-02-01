export interface CmdbProvider<T> {

    getElement(name: string): Promise<T>;

}