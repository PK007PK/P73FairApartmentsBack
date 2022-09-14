export interface PublicApartmentEntity {
    id: string;
    name: string;
    adress?: string;
    status?: number;
    mainImgLink: string;
    currentAgreement?: string;
    lat: number;
    lon: number;
    descriptionShort: string;
    space?: number;
    floor?: number;
    kitchenDesc?: string;
    roomsDesc?: string;
    otherSpacesDesc?: string;
    instalationDesc?: string;
    administrationCosts?: number;
    otherCostsDesc?: string;
}

export interface FullApartmentEntity extends PublicApartmentEntity {
    currentTenant?: string;
    owner?: string;
}

export interface NewApartmentEntity extends Omit<FullApartmentEntity, 'id'> {
    id?: string;
}
