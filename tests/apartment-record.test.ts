import { ApartmentRecord } from "../records/apartment.record"

const defObject = {
    name: 'Test name',
    descriptionShort: 'Blalla',
    id: '123',
    lat: 19,
    lon: 12,
    price: 10,
    mainImgLink: '24213423423',
};

test('Can build AdRecord', ()=>{
    const apartment = new ApartmentRecord(defObject)

    expect(apartment.name).toBe('Test name');
    expect(apartment.descriptionShort).toBe('Blalla');
} )

test('Validates invalid price', ()=>{
    expect(()=> new ApartmentRecord({
        ...defObject,
        price: -3,
    })).toThrow('Cena nie może być mniejsza niż 0 lub większa niż 9 999 999.')
})