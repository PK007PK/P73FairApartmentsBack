import { OwnerRecord } from "../records/owner.record";
import { defTestOwner2 } from "../tests/test-data";

test('OwnerRecord is created correctly', () => {
    const owner = new OwnerRecord(defTestOwner2);
    
    expect(owner).toBeDefined();
    expect(owner.nameandsurname).toBe(defTestOwner2.nameandsurname);
    expect(owner.email).toBe(defTestOwner2.email);
    expect(owner.phone).toBe(defTestOwner2.phone);
});

describe('OwnerRecord can be saved, loaded and deleted correctly', () => {
    test('OwnerRecord is saved', async () => {
        const owner = new OwnerRecord(defTestOwner2);
        const {isInserted} = await owner.insert();
        expect(isInserted).toBe(true);
        
        const ownerFromDB = await OwnerRecord.getOne(defTestOwner2.nameandsurname);     
        expect(ownerFromDB.nameandsurname).toBe(defTestOwner2.nameandsurname);
    });

    test('OwnerRecord is loaded', async () => {   
        const ownerFromDB = await OwnerRecord.getOne(defTestOwner2.nameandsurname);     
        expect(ownerFromDB.nameandsurname).toBe(defTestOwner2.nameandsurname);
        expect(ownerFromDB.email).toBe(defTestOwner2.email);
        expect(ownerFromDB.phone).toBe(defTestOwner2.phone);
    });

    test('OwnerRecord is deleted', async () => {
        const ownerFromDB = await OwnerRecord.getOne(defTestOwner2.nameandsurname);
        const {isDeleted} = await ownerFromDB.delete();
        expect(isDeleted).toBe(true);

        const ownerFromDBafterDeletion = await OwnerRecord.getOne(defTestOwner2.nameandsurname);
        expect(ownerFromDBafterDeletion).toBeNull;
    });
});
