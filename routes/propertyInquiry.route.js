import express from 'express'
import { getAllPropertyInquiries, getSinglePropertyInquiry, createPropertyInquiry, updatePropertyInquiry, deletePropertyInquiry } from '../controllers/propertyInquiry.controller.js';

const router = express.Router();

router.get('/', getAllPropertyInquiries);

router.get('/:id', getSinglePropertyInquiry);

router.post('/', createPropertyInquiry);

router.patch('/:id', updatePropertyInquiry);

router.delete('/:id', deletePropertyInquiry);

export default router;