import express, {json, Router} from "express";
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import rateLimit from 'express-rate-limit'
import { apartmentRouter } from "./routers/apartment.router";
import { ownerRouter } from "./routers/owner.router";
import { tenantRouter } from "./routers/tenant.router";
import {config} from "./config/config";

const app = express();

app.use(cors({
    origin: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://fairapartments.netlify.app',
}));

app.use(json());
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}));

const router = Router();

router.use('/apartment', apartmentRouter);
router.use('/owner', ownerRouter);
router.use('/tenant', tenantRouter);

app.use('/api', router);

// app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
});
