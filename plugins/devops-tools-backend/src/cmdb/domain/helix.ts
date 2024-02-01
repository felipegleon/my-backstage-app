export interface ConfigElement {
    instances: Instance[]
}

export interface Instance {
    instance_id: string
    class_name_key: ClassNameKey
    dataset_id: string
    attributes: Attributes
}

interface ClassNameKey {
    name: string
    namespace: string
}

interface Attributes {
    Company: string,
    ClassId: string,
    ApplicationCode: string,
    Name: string,
    ManufacturerName: string,
    Description: string,
    ModelNumber: string,
    Type: string
}