import {ApartmentEntity, NewApartmentEntity, SimpleApartmentEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

type ApartmentRecordResults = [ApartmentEntity[], FieldPacket[]];

export class ApartmentRecord implements ApartmentEntity {
    public id: string;
    public name: string;
    public mainImgLink?: string;
    public descriptionShort: string;
    public price: number;
    public lat: number;
    public lon: number;

    constructor(obj: NewApartmentEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa apartamentu nie może być pusta, ani przekraczać 100 znaków.');
        }

        if (obj.descriptionShort.length > 1000) {
            throw new ValidationError('Krótki opis nie może przekraczać 1000 znaków.');
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 lub większa niż 9 999 999.');
        }

         if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia.');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.descriptionShort = obj.descriptionShort;
        this.price = obj.price;
        this.mainImgLink = obj.mainImgLink;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }
    
    static async getOne(id: string): Promise<ApartmentRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `apartments` WHERE `id` = :id", {
            id,
        }) as ApartmentRecordResults;

        return results.length === 0 ? null : new ApartmentRecord(results[0]);
    }

    static async findAll(name: string): Promise<SimpleApartmentEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `apartments` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as ApartmentRecordResults;

        return results.map(result => {
            const {
                id, name, lat, lon, price, descriptionShort, mainImgLink
            } = result;

            return {
                id, name, lat, lon, price, descriptionShort, mainImgLink
            };
        });
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!');
        }

        await pool.execute("INSERT INTO `apartments`(`id`, `name`, `descriptionShort`, `price`, `mainImgLink`, `lat`, `lon`) VALUES(:id, :name, :descriptionShort, :price, :mainImgLink, :lat, :lon)", this);
    }

    async edit(): Promise<void> {
        await pool.execute("UPDATE `apartments` SET `name` = :name, `descriptionShort` = :descriptionShort, `price` = :price, `mainImgLink` = :mainImgLink, `lat` = :lat, `lon` = :lon WHERE `id` = :id", {
            id: this.id,
            name: this.name,
            descriptionShort: this.descriptionShort,
            price: this.price,
            mainImgLink: this.mainImgLink,
            lat: this.lat,
            lon: this.lon,
        });
    }

    async delete(): Promise<{}> {
        await pool.execute("DELETE FROM `apartments` WHERE `id` = :id", {
            id: this.id,
        });
        return {
            isDeleted: true,
        }
    }
}
