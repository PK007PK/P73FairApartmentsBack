import { ApartmentRecord } from "../records/apartment.record"

const defTestApartmentData = {
    id: 'testDefObject',
    name: 'Test apartment',
    adress: 'Test address',
    status: 1,
    mainImgLink: "https://images.unsplash.com/photo-1480074568708-e7…fHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
    lat: 12.1212,
    lon: 13.1212,
    descriptionShort: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue.",
    space: 54,
    floor: 4,
    kitchenDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.",
    roomsDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.",
    otherSpacesDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.",
    instalationDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.",
    administrationCosts: 550,
    otherCostsDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.",
};

test('Can build ApartmentRecord', ()=>{
    const apartment = new ApartmentRecord(defTestApartmentData)
    expect(apartment.name).toBe('Test apartment');
    expect(apartment.descriptionShort).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue.');
} )

test('Validates invalid floor', ()=>{
    expect(()=> new ApartmentRecord({
        ...defTestApartmentData,
        floor: -3,
    })).toThrow('Piętro musi być liczbą, nie może być mniejsze od zera');
})