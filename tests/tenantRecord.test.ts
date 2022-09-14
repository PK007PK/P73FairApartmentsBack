import { TenantRecord } from "../records/tenant.record";
import { defTestTenant2 } from "./test-data";


test('TenantRecord is created correctly', () => {
    const tenant = new TenantRecord(defTestTenant2);
    
    expect(tenant).toBeDefined();
    expect(tenant.nameandsurname).toBe(defTestTenant2.nameandsurname);
    expect(tenant.email).toBe(defTestTenant2.email);
    expect(tenant.phone).toBe(defTestTenant2.phone);
    expect(tenant.nameandsurname2).toBe(defTestTenant2.nameandsurname2);
    expect(tenant.email2).toBe(defTestTenant2.email2);
    expect(tenant.phone2).toBe(defTestTenant2.phone2);
});

describe('TenantRecord can be saved, loaded and deleted correctly', () => {
    test('TenantRecord is saved', async () => {
        const tenant = new TenantRecord(defTestTenant2);
        const {isInserted} = await tenant.insert();
        expect(isInserted).toBe(true);
        const tenantFromDB = await TenantRecord.getOne(defTestTenant2.nameandsurname);     
        expect(tenantFromDB.nameandsurname).toBe(defTestTenant2.nameandsurname);
    });

    test('TenantRecord is loaded', async () => {   
        const tenantFromDB = await TenantRecord.getOne(defTestTenant2.nameandsurname);     
        expect(tenantFromDB.nameandsurname).toBe(defTestTenant2.nameandsurname);
        expect(tenantFromDB.email).toBe(defTestTenant2.email);
        expect(tenantFromDB.phone).toBe(defTestTenant2.phone);
        expect(tenantFromDB.nameandsurname2).toBe(defTestTenant2.nameandsurname2);
        expect(tenantFromDB.email2).toBe(defTestTenant2.email2);
        expect(tenantFromDB.phone2).toBe(defTestTenant2.phone2);
    });

    test('TenantRecord is deleted', async () => {
        const tenantFromDB = await TenantRecord.getOne(defTestTenant2.nameandsurname);
        const {isDeleted} = await tenantFromDB.delete();
        expect(isDeleted).toBe(true);

        const tenantFromDBafterDeletion = await TenantRecord.getOne(defTestTenant2.nameandsurname);
        expect(tenantFromDBafterDeletion).toBeNull;
    });
});

