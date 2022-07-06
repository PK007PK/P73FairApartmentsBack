import {ApartmentRecord} from "../records/apartment.record";
import {pool} from "../utils/db";
import {ApartmentEntity} from "../types";

const defaultObj = {
    name: 'Test Name',
    descriptionShort: 'blah',
    mainImgLink: 'aaa',
    price: 10,
    lat: 9,
    lon: 9,
};

afterAll(async () => {
    await pool.end();

});

test('AdRecord.getOne returns data from database for one entry.', async () => {

    const apartment = await ApartmentRecord.getOne('111');

    expect(apartment).toBeDefined();
    expect(apartment.id).toBe('111');
    expect(apartment.name).toBe('Hatka');

});

test('AdRecord.getOne returns null from database for unexisting entry.', async () => {

    const apartment = await ApartmentRecord.getOne('---');

    expect(apartment).toBeNull();

});

test('AdRecord.findAll returns array of found entries.', async () => {

    const apartments = await ApartmentRecord.findAll('');

    expect(apartments).not.toEqual([]);
    expect(apartments[0].id).toBeDefined();

});

test('AdRecord.findAll returns array of found entries when searching for "Do".', async () => {

    const apartments = await ApartmentRecord.findAll('Do');

    expect(apartments).not.toEqual([]);
    expect(apartments[0].id).toBeDefined();

});

test('AdRecord.findAll returns empty array when searching for something that does not exist.', async () => {

    const apartments = await ApartmentRecord.findAll('-----------------------------------------');

    expect(apartments).toEqual([]);

});

test('AdRecord.findAll returns smaller amount of data.', async () => {

    const apartments = await ApartmentRecord.findAll('');

    expect((apartments[0] as ApartmentEntity).descriptionShort).toBeUndefined();

});

test('AdRecord.insert returns new UUID.', async () => {
    const apartment = new ApartmentRecord(defaultObj);
    await apartment.insert();

    expect(apartment.id).toBeDefined();
    expect(typeof apartment.id).toBe('string');
});

test('AdRecord.insert inserts data to database.', async () => {

    const apartment = new ApartmentRecord(defaultObj);
    await apartment.insert();

    const foundApartment = await ApartmentRecord.getOne(apartment.id);

    expect(foundApartment).toBeDefined();
    expect(foundApartment).not.toBeNull();
    expect(foundApartment.id).toBe(foundApartment.id);

});
