import {ApartmentRecord} from "../records/apartment.record";
import { OwnerRecord } from "../records/owner.record";
import { TenantRecord } from "../records/tenant.record";
import { defTestApartmentData, defTestApartmentData2, defTestOwner, defTestTenant } from "../tests/test-data";

let idForTest: string;

afterAll(async () => {
    const apartmentFromDB = await ApartmentRecord.getOneFull(idForTest);
    apartmentFromDB && await apartmentFromDB.delete();

    const owner = await OwnerRecord.getOne(defTestOwner.nameandsurname);
    owner && owner.delete();

    const tenant = await TenantRecord.getOne(defTestTenant.nameandsurname);
    tenant && tenant.delete();
});

describe('Apartment can be saved into db, loaded from db, modified and deleted correctly', () => {
    test('Apartment can be saved', async () => {
        const owner = new OwnerRecord(defTestOwner);
        await owner.insert();

        const tenant = new TenantRecord(defTestTenant);
        await tenant.insert();

        const apartment = new ApartmentRecord(defTestApartmentData);
        const {id} = await apartment.insert();
        idForTest = id;
        
        const apartmentFromDB = await ApartmentRecord.getOneFull(id);     
        expect(apartmentFromDB.name).toBe(defTestApartmentData.name);
    });

    test('Apartment can be loaded', async () => {   
        const apartmentFromDB = await ApartmentRecord.getOneFull(idForTest);    
        expect(apartmentFromDB.name).toBe(defTestApartmentData.name);
        expect(apartmentFromDB.adress).toBe(defTestApartmentData.adress);
        expect(apartmentFromDB.status).toBe(defTestApartmentData.status);
        expect(apartmentFromDB.lat).toBe(defTestApartmentData.lat);
        expect(apartmentFromDB.lon).toBe(defTestApartmentData.lon);
        expect(apartmentFromDB.mainImgLink).toBe(defTestApartmentData.mainImgLink);
        expect(apartmentFromDB.descriptionShort).toBe(defTestApartmentData.descriptionShort);
        expect(apartmentFromDB.space).toBe(defTestApartmentData.space);
        expect(apartmentFromDB.floor).toBe(defTestApartmentData.floor);
        expect(apartmentFromDB.kitchenDesc).toBe(defTestApartmentData.kitchenDesc);
        expect(apartmentFromDB.roomsDesc).toBe(defTestApartmentData.roomsDesc);
        expect(apartmentFromDB.otherSpacesDesc).toBe(defTestApartmentData.otherSpacesDesc);
        expect(apartmentFromDB.instalationDesc).toBe(defTestApartmentData.instalationDesc);
        expect(apartmentFromDB.administrationCosts).toBe(defTestApartmentData.administrationCosts);
        expect(apartmentFromDB.otherCostsDesc).toBe(defTestApartmentData.otherCostsDesc);
        expect(apartmentFromDB.owner).toBe(defTestApartmentData.owner);
        expect(apartmentFromDB.currentTenant).toBe(defTestApartmentData.currentTenant);
    });

    test('Apartment can be modified', async () => {   
        const updatedData = {
            ...defTestApartmentData2,
            id: idForTest,
        }

        const modifiedApartment = new ApartmentRecord(updatedData);
        await modifiedApartment.edit();
        
        const apartmentFromDB = await ApartmentRecord.getOneFull(idForTest);  
        
        expect(apartmentFromDB.name).toBe(defTestApartmentData2.name);
        expect(apartmentFromDB.adress).toBe(defTestApartmentData2.adress);
        expect(apartmentFromDB.status).toBe(defTestApartmentData2.status);
        expect(apartmentFromDB.lat).toBe(defTestApartmentData2.lat);
        expect(apartmentFromDB.lon).toBe(defTestApartmentData2.lon);
        expect(apartmentFromDB.mainImgLink).toBe(defTestApartmentData2.mainImgLink);
        expect(apartmentFromDB.descriptionShort).toBe(defTestApartmentData2.descriptionShort);
        expect(apartmentFromDB.space).toBe(defTestApartmentData2.space);
        expect(apartmentFromDB.floor).toBe(defTestApartmentData2.floor);
        expect(apartmentFromDB.kitchenDesc).toBe(defTestApartmentData2.kitchenDesc);
        expect(apartmentFromDB.roomsDesc).toBe(defTestApartmentData2.roomsDesc);
        expect(apartmentFromDB.otherSpacesDesc).toBe(defTestApartmentData2.otherSpacesDesc);
        expect(apartmentFromDB.instalationDesc).toBe(defTestApartmentData2.instalationDesc);
        expect(apartmentFromDB.administrationCosts).toBe(defTestApartmentData2.administrationCosts);
        expect(apartmentFromDB.otherCostsDesc).toBe(defTestApartmentData2.otherCostsDesc);
        expect(apartmentFromDB.owner).toBe(defTestApartmentData2.owner);
        expect(apartmentFromDB.currentTenant).toBe(defTestApartmentData2.currentTenant);
    });

    test('ApartmentRecord can be deleted', async () => {
        const apartmentFromDB = await ApartmentRecord.getOneFull(idForTest);
        const {isDeleted} = await apartmentFromDB.delete();
        expect(isDeleted).toBe(true);

        const apartmentFromDBafterDeletion = await ApartmentRecord.getOneFull(defTestApartmentData.name);
        expect(apartmentFromDBafterDeletion).toBeNull;

        const owner = await OwnerRecord.getOne(defTestOwner.nameandsurname);
        owner.delete();

        const tenant = await TenantRecord.getOne(defTestTenant.nameandsurname);
        tenant.delete();
    });
});
