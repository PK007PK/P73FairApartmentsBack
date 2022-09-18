import {Router, Response, Request} from "express";
import {TenantRecord} from "../records/tenant.record";
import { ValidationError } from "../utils/errors";

export const tenantRouter = Router()

    .get('/search/:name?', async (req: Request, res: Response) => {
        const tenants = await TenantRecord.findAll(req.params.name ?? '');
        res.json(tenants);
    })

    .get('/:nameandsurname', async (req: Request, res: Response) => {
        const tenant = await TenantRecord.getOne(req.params.nameandsurname);

        if (!tenant) {
            throw new ValidationError('No such tenant');
        }

        res.json(tenant);
    })

    .post('/add/', async (req: Request, res: Response) => {
        const tenant = new TenantRecord(req.body);
        await tenant.insert();
        res.json(tenant);
    })

    .post('/update/', async (req: Request, res: Response) => {
        const data = req.body
        const newTenantRecord = new TenantRecord(data);
        await newTenantRecord.edit();
        res.json(newTenantRecord);
    })

    .delete('/delete/', async (req: Request, res: Response) => {
        const {nameandsurname} = req.body

        if (!nameandsurname) {
            throw new ValidationError('Name and surname was not sent');
        }

        const tenant = await TenantRecord.getOne(nameandsurname);

        if (!nameandsurname) {
            throw new ValidationError('No such tenant');
        }

        const isDeleted = tenant && await tenant.delete();
        res.json(isDeleted);
    });
;
