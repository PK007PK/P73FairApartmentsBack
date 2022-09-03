import {Router, Response, Request} from "express";
import {ApartmentRecord} from "../records/apartment.record";
import { ValidationError } from "../utils/errors";

export const apartmentRouter = Router()

    .get('/search/:name?', async (req: Request, res: Response) => {
        const apartments = await ApartmentRecord.findAll(req.params.name ?? '');
        res.json(apartments);
    })

    .get('/:id', async (req: Request, res: Response) => {
        const apartment = await ApartmentRecord.getOnePublic(req.params.id);

        if (!apartment) {
            throw new ValidationError('No such apartment');
        }

        res.json(apartment);
    })

    .post('/add/', async (req: Request, res: Response) => {
        const apartment = new ApartmentRecord(req.body);
        await apartment.insert();
        res.json(apartment);
    })

    .post('/update/', async (req: Request, res: Response) => {
        const data = req.body
        const newApartmentRecord = new ApartmentRecord(data);
        await newApartmentRecord.edit();
        res.json(newApartmentRecord);
    })

    .delete('/delete/', async (req: Request, res: Response) => {
        const {id} = req.body
        if (!id) {
            throw new ValidationError('Id was not sent');
        }

        const apartment = await ApartmentRecord.getOnePublic(id);

        if (!apartment) {
            throw new ValidationError('No such apartment');
        }

        const deleteStatus = await apartment.delete();
        res.json(deleteStatus);

        res.end();
    });
;
