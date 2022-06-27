import {Router} from "express";
import {ApartmentRecord} from "../records/apartment.record";

export const apartmentRouter = Router()

    .get('/search/:name?', async (req, res) => {
        const apartments = await ApartmentRecord.findAll(req.params.name ?? '');
        res.json(apartments);
    })

    .get('/:id', async (req, res) => {
        const apartment = await ApartmentRecord.getOne(req.params.id);
        res.json(apartment);
    })

    .post('/', async (req, res) => {
        const apartment = new ApartmentRecord(req.body);
        await apartment.insert();
        res.json(apartment);
    })
;
