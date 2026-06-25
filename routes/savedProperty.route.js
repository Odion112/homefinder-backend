import express from 'express'
import { getAllSavedProperties, getSingleSavedProperty, createSavedProperty, updateSavedProperty, deleteSavedProperty }  from '../controllers/savedProperty.controller.js';

const router = express.Router();

router.get('/', getAllSavedProperties);

router.get('/:id', getSingleSavedProperty);

router.post('/', createSavedProperty);

router.patch('/:id', updateSavedProperty);

router.delete('/:id', deleteSavedProperty);

export default router;
