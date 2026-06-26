import express from 'express'
import { getAllProperties, getSingleProperty, updateProperty, deleteProperty, createProperty } from '../controllers/property.controller.js';
import { checkRoles, getPayloadFromToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getAllProperties);

router.get('/:id', getSingleProperty);

router.post('/', getPayloadFromToken, checkRoles, createProperty);

router.patch('/:id',getPayloadFromToken, checkRoles, updateProperty);

router.delete('/:id',getPayloadFromToken, checkRoles, deleteProperty);

export default router;