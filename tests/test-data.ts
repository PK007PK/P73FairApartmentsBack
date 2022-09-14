import { NewApartmentEntity, OwnerEntity, TenantEntity } from "../types";

export const defTestOwner: OwnerEntity = {
    nameandsurname: "Nazwisko właściciela",
    email: "Email właściciela",
    phone: "12345678910",
}

export const defTestOwner2: OwnerEntity = {
    ...defTestOwner,
    nameandsurname: "Nazwisko właściciela2",
}

export const defTestTenant: TenantEntity = {
    nameandsurname: "Nazwisko najemcy",
    email: "Email najemcy",
    phone: "12345678910",
    nameandsurname2: "Nazwisko najemcy2",
    email2: "Email najemcy2",
    phone2: "12345678910",
}

export const defTestTenant2: TenantEntity = {
    ...defTestTenant,
    nameandsurname: "Nazwisko najemcy2",
}

export const defTestApartmentData: NewApartmentEntity = {
    name: 'Test apartment',
    adress: 'Test address',
    status: 1,
    mainImgLink: "https://images.unsplash.com/photo-1480074568708-e7…fHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
    lat: 12.1212,
    lon: 13.1212,
    descriptionShort: "DescriptionShort. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel.",
    space: 54,
    floor: 4,
    kitchenDesc: "KitchenDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.",
    roomsDesc: "RoomsDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.",
    otherSpacesDesc: "OtherSpacesDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.",
    instalationDesc: "InstalationDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.",
    administrationCosts: 550,
    otherCostsDesc: "OtherCostsDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.",
    owner: defTestOwner.nameandsurname,
    currentTenant: defTestTenant.nameandsurname,
};