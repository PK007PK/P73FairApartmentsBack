import {Router, Response, Request} from "express";
import {OwnerRecord} from "../records/owner.record";
import { ValidationError } from "../utils/errors";

export const ownerRouter = Router()

    .get('/search/:name?', async (req: Request, res: Response) => {
        const owners = await OwnerRecord.findAll(req.params.name ?? '');
        res.json(owners);
    })

    .get('/:nameandsurname', async (req: Request, res: Response) => {
        const owner = await OwnerRecord.getOne(req.params.nameandsurname);

        if (!owner) {
            throw new ValidationError('No such owner');
        }

        res.json(owner);
    })

    .post('/add/', async (req: Request, res: Response) => {
        const owner = new OwnerRecord(req.body);
        await owner.insert();
        res.json(owner);
    })

    .post('/update/', async (req: Request, res: Response) => {
        const data = req.body
        const newOwnerRecord = new OwnerRecord(data);
        await newOwnerRecord.edit();
        res.json(newOwnerRecord);
    })

    .delete('/delete/', async (req: Request, res: Response) => {
        const {nameandsurname} = req.body

        if (!nameandsurname) {
            throw new ValidationError('Name and surname was not sent');
        }

        const owner = await OwnerRecord.getOne(nameandsurname);

        if (!nameandsurname) {
            throw new ValidationError('No such owner');
        }

        const isDeleted = owner && await owner.delete();
        res.json(isDeleted);
    });
;
