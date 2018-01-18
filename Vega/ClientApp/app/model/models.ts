// These interfaces will be each moved into its own .ts file later

export interface KeyValuePair {

    id: number;
    name: string;

}

export interface Contact {

    name: string;
    phone: string;
    email: string;

}


export interface Vehicle {

    id: number;
    model: KeyValuePair;
    make: KeyValuePair;
    owner: KeyValuePair;
    isRegistered: boolean;
    features: KeyValuePair[];
    contact: Contact;
    lastUpdate: String;

}

export interface SaveVehicle {

    id: number;
    modelId: number;
    makeId: number;
    ownerId: number;
    isRegistered: boolean;
    features: number[];
    contact: Contact;

}