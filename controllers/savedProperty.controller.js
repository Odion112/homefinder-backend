import SavedProperty from "../routes/savedProperty.route.js"

export async function getAllSavedProperties(req, res, next) {
    try {
        const savedProperties = await SavedProperty.find()
        res.status(200).json(savedProperties)
    } catch (error) {
         res.status(500).json({ msg: 'Error getting all savedproperties' })
    } 
}

export async function getSingleSavedProperty(req, res, next) {
    try {
        const savedProperty = await SavedProperty.findById(req.params.id);
        if (!savedProperty) {
            return res.status(404).json({ msg: 'SavedProperty not found' })
        } else {
            res.status(200).json(savedProperty)
        }
    } catch (error) {
        res.status(500).json({ msg: 'Error getting SavedProperty' }); 
    }   
}

export async function createSavedProperty(req, res, next) {
    try {
      const id = req.user.id
      const savedProperty = new SavedProperty({ ...req.body, userId: id })
      await savedProperty.save()
      res.status(201).json(savedProperty)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export async function updateSavedProperty(req, res, next) {
    try {
        const updatedSavedProperty = await SavedProperty.findByIdAndUpdate(req.params.id, req.body, { new: true })
         res.status(200).json(updatedSavedProperty)
    } catch (error) {
         res.status(400).json({ msg: error.message })
    }
}

export async function deleteSavedProperty(req, res, next) {
    try {
        await SavedProperty.findByIdAndDelete(req.paramas.id)
        res.status(200).json({ msg: "SavedProperty deleted successfully" })
    } catch (error) {
          res.status(500).json({ msg: error.message })
    }
}