import {TenantEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type TenantRecordResults = [TenantEntity[], FieldPacket[]];

export class TenantRecord implements TenantEntity {
    nameandsurname: string;
    email: string;
    phone: string;
    nameandsurname2?: string;
    email2?: string;
    phone2?: string;

    constructor(obj: TenantEntity) {
        if (!obj.nameandsurname || obj.nameandsurname.length > 30) {
            throw new ValidationError('Musisz podać imię i nazwisko właściciela, nie mogą one łącznie przekraczać 30 znaków');
        }

        if (!obj.email || obj.email.length > 30) {
            throw new ValidationError('Musisz podać email najemcy, nie nie może on przekraczać 30 znaków');
        }

        if (!obj.phone || obj.phone.length > 30) {
            throw new ValidationError('Musisz podać email najemcy, nie nie może on przekraczać 30 znaków');
        }

        if (obj.nameandsurname2 || obj.nameandsurname.length > 30) {
            throw new ValidationError('Jeżeli istnieje także drugi najemca, podaj jego imię i nazwisko (max 30 znaków)');
        }

        if (obj.nameandsurname2 && obj.email2.length > 30) {
            throw new ValidationError('Jeżeli istnieje także drugi najemca, podaj jego email (max 30 znaków)');
        }

        if (obj.nameandsurname2 && obj.phone2.length > 30) {
            throw new ValidationError('Jeżeli istnieje także drugi najemca, podaj jego telefon (max 30 znaków)');
        }

        this.nameandsurname = obj.nameandsurname;
        this.email = obj.email;
        this.phone = obj.phone;
        this.nameandsurname2 = obj.nameandsurname2;
        this.email2 = obj.email2;
        this.phone2 = obj.phone2;
    }
    
    static async getOne(nameandsurname: string): Promise<TenantRecord | null> {
        const [result] = await pool.execute(
            "SELECT * FROM `tenants` WHERE `nameandsurname` = :nameandsurname", {
                nameandsurname,
            }
        ) as TenantRecordResults;
        return result.length === 0 ? null : new TenantRecord(result[0]);
    }

    static async findAll(nameandsurname: string): Promise<TenantEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `tenants` WHERE `nameandsurname` LIKE :search", {
            search: `%${nameandsurname}%`,
        }) as TenantRecordResults;

        return results.map(result => {
            const {
                nameandsurname, email, phone, nameandsurname2, email2, phone2, 
            } = result;

            return {
                nameandsurname, email, phone, nameandsurname2, email2, phone2, 
            };
        });
    }

    async insert(): Promise<void> {
        await pool.execute("INSERT INTO `tenants`(`nameandsurname`, `email`, `phone`, `nameandsurname2`, `email2`, `phone2`) VALUES(:nameandsurname, :email, :phone, :nameandsurname2, :email2, :phone2)", this);
    }

    async edit(): Promise<void> {
        await pool.execute("UPDATE `tenants` SET `phone` = :phone, `email` = :email, `nameandsurname2` = :nameandsurname2, `phone2` = :phone2, `email2` = :email2, WHERE `nameandsurname` = :nameandsurname", this
        );
    }

    async delete(): Promise<{}> {
        await pool.execute("DELETE FROM `tenants` WHERE `nameandsurname` = :nameandsurname", {
            nameandsurname: this.nameandsurname,
        });
        return {
            isDeleted: true,
        }
    }
}

