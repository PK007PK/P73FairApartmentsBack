import {PublicApartmentEntity, NewApartmentEntity, FullApartmentEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

type FullApartmentRecordResults = [FullApartmentEntity[], FieldPacket[]];
type PublicApartmentRecordResults = [PublicApartmentEntity[], FieldPacket[]];

export class ApartmentRecord implements FullApartmentEntity {
    id: string;
    name: string;
    adress?: string;
    status?: number;
    mainImgLink: string;
    owner?: string;
    currentTenant?: string;
    currentAgreement?: string;
    lat: number;
    lon: number;
    descriptionShort: string;
    space?: number;
    floor?: number;
    kitchenDesc?: string;
    roomsDesc?: string;
    otherSpacesDesc?: string;
    instalationDesc?: string;
    administrationCosts?: number;
    otherCostsDesc?: string;

    constructor(obj: NewApartmentEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa apartamentu nie może być pusta, ani przekraczać 100 znaków.');
        }

        if (!obj.adress || obj.adress.length > 100) {
            throw new ValidationError('Adres nie może być pusty, ani przekraczać 100 znaków.');
        }

        if (!obj.status || typeof obj.status !== 'number' ) {
            throw new ValidationError('Status nie może być pusty i musi być numerem');
        }

        if (obj.mainImgLink.length > 150) {
            throw new ValidationError('Długość linku nie może przekraczać 150 znaków.');
        }

        if (obj.currentTenant?.length > 30) {
            throw new ValidationError('Długość identyfikatora najemcy nie może przekraczać 30 znaków.');
        }

        if (obj.owner?.length > 30) {
            throw new ValidationError('Długość identyfikatora właściciela nie może przekraczać 30 znaków.');
        }

        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia.');
        }

        if (obj.descriptionShort.length > 255) {
            throw new ValidationError('Krótki opis nie może przekraczać 255 znaków.');
        }

        if (typeof obj.space !== 'number' || obj.space < 0) {
            throw new ValidationError('Powierzchnia musi być liczbą, nie może być mniejsza od zera');
        }

        if (typeof obj.floor !== 'number' || obj.floor < 0) {
            throw new ValidationError('Piętro musi być liczbą, nie może być mniejsze od zera');
        }

        if (obj.kitchenDesc.length > 1000) {
            throw new ValidationError('Opis kuchni nie może przekraczać 1000 znaków');
        }

        if (obj.roomsDesc.length > 1000) {
            throw new ValidationError('Opis pokojów nie może przekraczać 1000 znaków');
        }

        if (obj.otherSpacesDesc.length > 1000) {
            throw new ValidationError('Opis pozostałych pomieszczeń nie może przekraczać 1000 znaków');
        }

        if (obj.instalationDesc.length > 1000) {
            throw new ValidationError('Opis instalacji nie może przekraczać 1000 znaków');
        }

        if (typeof obj.administrationCosts !== 'number' || obj.administrationCosts > 9999) {
            throw new ValidationError('Koszty administracyjne muszą być liczbą i nie mogą być większe niż 9999.');
        }

        if (obj.instalationDesc.length > 1000) {
            throw new ValidationError('Opis pozostałych kosztów nie może przekraczać 1000 znaków');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.adress = obj.adress;
        this.status = obj.status;
        this.mainImgLink = obj.mainImgLink;
        this.owner = obj.owner;
        this.currentTenant = obj.currentTenant;
        this.currentAgreement = obj.currentAgreement;
        this.lat = obj.lat;
        this.lon = obj.lon;
        this.descriptionShort = obj.descriptionShort;
        this.space = obj.space;
        this.floor = obj.floor;
        this.kitchenDesc = obj.kitchenDesc;
        this.roomsDesc = obj.roomsDesc;
        this.otherSpacesDesc = obj.otherSpacesDesc;
        this.instalationDesc = obj.instalationDesc;
        this.administrationCosts = obj.administrationCosts;
        this.otherCostsDesc = obj.otherCostsDesc;
    }
    
    static async getOnePublic(id: string): Promise<ApartmentRecord | null> {
        const [result] = await pool.execute(
            "SELECT * FROM `apartments` INNER JOIN `apartments-details` ON `apartments`.`id` = `apartments-details`.`id` WHERE `apartments`.`id` = :id", {
            id,
            }
        ) as PublicApartmentRecordResults;
        return result.length === 0 ? null : new ApartmentRecord(result[0]);
    }

    static async getOneFull(id: string): Promise<ApartmentRecord | null> {
        const [result] = await pool.execute(
            "SELECT * FROM `apartments` LEFT JOIN `apartments-details` ON `apartments`.`id` = `apartments-details`.`id` LEFT JOIN `apartments-restricted` ON `apartments`.`id` = `apartments-restricted`.`id` WHERE `apartments`.`id` = :id", {
            id,
            }
        ) as FullApartmentRecordResults;
        return result.length === 0 ? null : new ApartmentRecord(result[0]);
    }

    static async findAll(name: string): Promise<PublicApartmentEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `apartments` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as PublicApartmentRecordResults;

        return results.map(result => {
            const {
                id, name, lat, lon, descriptionShort, mainImgLink
            } = result;

            return {
                id, name, lat, lon, descriptionShort, mainImgLink
            };
        });
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!');
        }
        await pool.execute("INSERT INTO `apartments`(`id`, `name`, `adress`, `status`, `mainImgLink`) VALUES(:id, :name, :adress, :status, :mainImgLink)", this);
        await pool.execute("INSERT INTO `apartments-details`(`id`, `lat`, `lon`, `descriptionShort`, `space`, `floor`, `kitchenDesc`, `roomsDesc`, `otherSpacesDesc`, `instalationDesc`, `administrationCosts`, `otherCostsDesc`) VALUES(:id, :lat, :lon, :descriptionShort, :space, :floor, :kitchenDesc, :roomsDesc, :otherSpacesDesc, :instalationDesc, :administrationCosts, :otherCostsDesc)", this);
        await pool.execute("INSERT INTO `apartments-RESTRICTED`(`id`, `owner`, `currentTenant`, `currentAgreement`) VALUES(:id, :owner, :currentTenant, :currentAgreement)", this);
    }

    async edit(): Promise<void> {
        await pool.execute("UPDATE `apartments` SET `name` = :name, `adress` = :adress, `status` = :status, `mainImgLink` = :mainImgLink, WHERE `id` = :id; UPDATE `apartments-details` SET `lat` = :lat, `lon` = :lon, `descriptionShort` = :descriptionShort, `space` = :space, `floor` = :floor, `kitchenDesc` = :kitchenDesc, `roomsDesc` = :roomsDesc, `otherSpacesDesc` = :otherSpacesDesc, `instalationDesc` = :instalationDesc, `administrationCosts` = :administrationCosts, `otherCostsDesc` = :otherCostsDesc  WHERE `id` = :id", this
        );
    }

    async delete(): Promise<{}> {
        await pool.execute("DELETE FROM `apartments` WHERE `id` = :id; DELETE FROM `apartments-details` WHERE `id` = :id", {
            id: this.id,
        });
        return {
            isDeleted: true,
        }
    }
}

