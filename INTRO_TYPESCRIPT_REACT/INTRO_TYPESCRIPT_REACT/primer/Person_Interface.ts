// Person_Interface.ts
export interface person {
    name: string;
    surnmame: string;
    dateOfBirth: number;
    placeOfBirth: string;
    id: number;

    toString(): string
}
export interface player extends person {
    height: number;
    weight: number;
    injured: boolean;

    toString(): string
}

export interface functionar extends person {
    role: string;
    validity: number;

    toString(): string
}
