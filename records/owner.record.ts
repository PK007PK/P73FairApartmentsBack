import {OwnerEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type OwnerRecordResults = [OwnerEntity[], FieldPacket[]];

export class OwnerRecord implements OwnerEntity {
    nameandsurname: string;
    email: string;
    phone: string;

    constructor(obj: OwnerEntity) {
        if (!obj.nameandsurname || obj.nameandsurname.length > 30) {
            throw new ValidationError('Musisz podać imię i nazwisko właściciela, nie mogą one łącznie przekraczać 30 znaków');
        }

        if (!obj.email || obj.email.length > 30) {
            throw new ValidationError('Musisz podać email właściciela, nie nie może on przekraczać 30 znaków');
        }

        if (!obj.phone || obj.phone.length > 15) {
            throw new ValidationError('Musisz podać telefon właściciela, nie nie może on przekraczać 15 znaków');
        }

        this.nameandsurname = obj.nameandsurname;
        this.email = obj.email;
        this.phone = obj.phone;
    }
    
    static async getOne(nameandsurname: string): Promise<OwnerRecord | null> {
        const [result] = await pool.execute(
            "SELECT * FROM `owners` WHERE `nameandsurname` = :nameandsurname", {
                nameandsurname,
            }
        ) as OwnerRecordResults;
        return result.length === 0 ? null : new OwnerRecord(result[0]);
    }

    static async findAll(nameandsurname: string): Promise<OwnerEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `owner` WHERE `nameandsurname` LIKE :search", {
            search: `%${nameandsurname}%`,
        }) as OwnerRecordResults;

        return results.map(result => {
            const {
                nameandsurname, email, phone
            } = result;

            return {
                nameandsurname, email, phone
            };
        });
    }

    async insert(): Promise<{isInserted: boolean}> {
        const [result, ] = await pool.execute("INSERT INTO `owners`(`nameandsurname`, `email`, `phone`) VALUES(:nameandsurname, :email, :phone)", this);
        const {affectedRows}: any = result;
        return {
            isInserted: Boolean(affectedRows),
        }
    }

    async edit(): Promise<{isEdited: boolean}> {
        const [result, ] = await pool.execute("UPDATE `owners` SET `phone` = :phone, `email` = :email, WHERE `nameandsurname` = :nameandsurname", this
        );
        const {affectedRows}: any = result;
        return {
            isEdited: Boolean(affectedRows),
        }
    }

    async delete(): Promise<{isDeleted: boolean}> {
        const [result,] = await pool.execute("DELETE FROM `owners` WHERE `nameandsurname` = :nameandsurname", {
            nameandsurname: this.nameandsurname,
        });
        
        const {affectedRows}: any = result;
        
        return {
            isDeleted: Boolean(affectedRows),
        }
    }
}

