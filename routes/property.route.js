import express from 'express'
import { getAllProperties, getSingleProperty, listProperty, updateProperty, deleteProperty } from '../controllers/property.controller.js';

const router = express.Router();

router.get('/', getAllProperties);

router.get('/:id', getSingleProperty);

router.post('/', listProperty);

router.patch('/:id', updateProperty);

router.delete('/:id', deleteProperty);

export default router;