import PropertyInquiry  from "../routes/propertyInquiry.route.js"

export async function getAllPropertyInquiries(req, res, next) {
    try {
        const propertyInquiries = await PropertyInquiry.find()
        res.status(200).json(propertyInquiries)
    } catch (error) {
         res.status(500).json({ msg: 'Error getting all propertyinquiries' })
    }
}

export async function getSinglePropertyInquiry(req, res, next) {
    try {
        const propertyInquiry = await PropertyInquiry.findById(req.params.id);
        if (!propertyInquiry) {
            return res.status(404).json({ msg: 'PropertyInquiry not found'})
        } else {
            res.status(200).json(propertyInquiry)
        }
    } catch (error) {
        res.status(500).json({ msg: 'Error getting PropertyInquiry' });
    }  
}

export async function createPropertyInquiry(req,res, next) {
    try {
        const id = req.user.id
        const propertyInquiry = new PropertyInquiry({ ...req.body, userId: id })
        await propertyInquiry.save()
        res.status(201).json(propertyInquiry)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export async function updatePropertyInquiry(req, res, next) {
    try {
        const updatedPropertyInquiry = await PropertyInquiry.findByIdAndUpdate(req.params.id, req.body, { new: true})
        res.status(200).json(updatedPropertyInquiry)
    } catch (error) {
        res.status(400).json({ msg: error.message }) 
    }
}

export async function deletePropertyInquiry(req, res ,next) {
    try {
         await PropertyInquiry.findByIdAndDelete(req.paramas.id)
         res.status(200).json({ msg: "PropertyInquiry deleted successfully" })
    } catch (error) {
          res.status(500).json({ msg: error.message })
    }
}