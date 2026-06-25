import bcrypt from "bcryptjs";

export async function createHash(password) {
    try {
         const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return hash
    } catch (error) {
        throw new Error('Error creating hash')
    }
}

export async function compareHash(password, hash) {
    try {
         const isMatch = await bcrypt.compare(password, hash)
        return isMatch
    } catch (error) {
         throw new Error('Error comparing hash')
    }
}