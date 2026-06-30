import Property from '../models/property.model.js'

export async function getAllProperties(req, res, next) {
    try {
        const properties = await Property.find()
        res.status(200).json(properties)
    } catch (error) {
        res.status(500).json({ msg: 'Error getting all properties' })
    }
}

export async function getSingleProperty(req, res, next) {
    try {
        const property = await Property.findById(req.params.id); 
        if (!property) {
            return res.status(404).json({ msg: 'Property not found' })
        } else {
              res.status(200).json(property)
        }
      
    } catch (error) {
        res.status(500).json({ msg: 'Error getting property' });
    }
}

export async function listProperty(req, res, next) {
    try {
       const id = req.user.id
       const property = new Property({ ...req.body, userId: id})
       await property.save()
       res.status(201).json(property)
    } catch (error) {
         res.status(500).json({ msg: error.message })
    }
}

export async function updateProperty(req, res, next) {
    try {
        const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedProperty)
    } catch (error) {
         res.status(400).json({ msg: error.message })
    }
}

export async function deleteProperty(req, res, next) {
    try {
        await Property.findByIdAndDelete(req.params.id)
        res.status(200).json({ msg: "Property deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}