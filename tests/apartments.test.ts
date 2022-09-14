import {ApartmentRecord} from "../records/apartment.record";
import { FullApartmentEntity } from "../types";
import {pool} from "../utils/db";

const defTestTenant = {}
const defTestOwner = {}

const defTestApartmentData = {
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
};

test('ApartmentRecord.getOnePublic returns data from database for one entry.', async () => {
    const apartment = await ApartmentRecord.getOnePublic('111');
    expect(apartment).toBeDefined();
    expect(apartment.id).toBe('111');
    expect(apartment.name).toBe('Hatka');
});

test('ApartmentRecord is created corectly', () => {
    const apartment = new ApartmentRecord(defTestApartmentData);
    
    expect(apartment).toBeDefined();
    expect(apartment.name).toBe('Test apartment');
    expect(apartment.adress).toBe('Test address');
    expect(apartment.status).toBe(1);
    expect(apartment.lat).toBe(12.1212);
    expect(apartment.lon).toBe(13.1212);
    expect(apartment.mainImgLink).toBe("https://images.unsplash.com/photo-1480074568708-e7…fHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80");
    expect(apartment.descriptionShort).toBe("DescriptionShort. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel.");
    expect(apartment.space).toBe(54);
    expect(apartment.floor).toBe(4);
    expect(apartment.kitchenDesc).toBe("KitchenDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.");
    expect(apartment.roomsDesc).toBe("RoomsDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.");
    expect(apartment.otherSpacesDesc).toBe("OtherSpacesDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.");
    expect(apartment.instalationDesc).toBe("InstalationDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.");
    expect(apartment.administrationCosts).toBe(550);
    expect(apartment.otherCostsDesc).toBe("OtherCostsDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.");
});

test('Owner is created, saved into db, read and deleted from corectly', () => {

});

test('Tenant is created, saved into db, read and deleted from corectly', () => {

});

test('ApartmentRecord created, saved into db, read and deleted from database corectly', async () => {
    const apartment2 = new ApartmentRecord(defTestApartmentData);
    await apartment2.insert();

    const resp = await ApartmentRecord.findAll('Test apartment');
    const {id} = resp[0];
    console.log("id:", id);
    
    const apartment3 = await ApartmentRecord.getOneFull(id);
    console.log(apartment3);
    // expect(apartment3).toBeDefined();
    // expect(apartment3.name).toBe('Test apartment');
    // expect(apartment3.adress).toBe('Test address');
    // expect(apartment3.status).toBe(1);
    // expect(apartment3.lat).toBe(12.1212);
    // expect(apartment3.lon).toBe(13.1212);
    // expect(apartment3.mainImgLink).toBe("https://images.unsplash.com/photo-1480074568708-e7…fHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80");
    // expect(apartment3.descriptionShort).toBe("DescriptionShort. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel.");
    // expect(apartment3.space).toBe(54);
    // expect(apartment3.floor).toBe(4);
    // expect(apartment3.kitchenDesc).toBe("KitchenDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.");
    // expect(apartment3.roomsDesc).toBe("RoomsDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.");
    // expect(apartment3.otherSpacesDesc).toBe("OtherSpacesDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.");
    // expect(apartment3.instalationDesc).toBe("InstalationDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.");
    // expect(apartment3.administrationCosts).toBe(550);
    // expect(apartment3.otherCostsDesc).toBe("OtherCostsDesc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis rhoncus congue. Duis lectus felis, mattis sit amet iaculis eu, convallis ac purus. Curabitur ultrices mauris quam, eu rutrum sapien vestibulum vel. Sed quis posuere libero. Suspendisse sed lorem eu eros ultricies dapibus sit amet at augue. Nunc lacinia mauris vel massa pulvinar dictum. Nulla facilisi. Nam sit amet blandit justo. Nulla facilisi.");
    
    // apartment3.delete();
    // expect(apartment3).toBeUndefined();
});
// test('AdRecord.getOne returns null from database for unexisting entry.', async () => {
//     const apartment = await ApartmentRecord.getOnePublic('---');
//     expect(apartment).toBeNull();

// });

// test('AdRecord.findAll returns array of found entries.', async () => {
//     const apartments = await ApartmentRecord.findAll('');
//     expect(apartments).not.toEqual([]);
//     expect(apartments[0].id).toBeDefined();

// });

// test('AdRecord.findAll returns array of found entries when searching for "Do".', async () => {
//     const apartments = await ApartmentRecord.findAll('Do');
//     expect(apartments).not.toEqual([]);
//     expect(apartments[0].id).toBeDefined();

// });

// test('AdRecord.findAll returns empty array when searching for something that does not exist.', async () => {
//     const apartments = await ApartmentRecord.findAll('-----------------------------------------');
//     expect(apartments).toEqual([]);

// });

// test('AdRecord.findAll returns smaller amount of data.', async () => {
//     const apartments = await ApartmentRecord.findAll('');
//     expect((apartments[0] as FullApartmentEntity).descriptionShort).toBeUndefined();

// });

// test('AdRecord.insert returns new UUID.', async () => {
//     const apartment = new ApartmentRecord(defTestApartmentData);
//     await apartment.insert();
//     expect(apartment.id).toBeDefined();
//     expect(typeof apartment.id).toBe('string');
// });

// test('AdRecord.insert inserts data to database.', async () => {
//     const apartment = new ApartmentRecord(defTestApartmentData);
//     await apartment.insert();
//     const foundApartment = await ApartmentRecord.getOnePublic(apartment.id);
//     expect(foundApartment).toBeDefined();
//     expect(foundApartment).not.toBeNull();
//     expect(foundApartment.id).toBe(foundApartment.id);
// });
