import jwt from 'jsonwebtoken'

export async function getPayloadFromToken(req, res, next) {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1]
            if (token) {
                const payload = await jwt.verify(token, process.env.JWT_SECRET)
                req.user = payload
                next()
            } else {
                res.status(401).json({ msg: "You need to login" })
            }
        } else {
            throw new Error("You need to login")
        }

    } catch (error) {
        res.status(401).json({ msg: error.message })
    }

}

export async function onlyAllowAdmin(req, res, next) {
    try {
        const role = req.user.role
        if (role === "admin") {
            next()
        } else {
            res.status(403).json({ msg: "Only for admins" })
        }
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

export async function checkRoles(req, res, next) {
        try {
        const role = req.user.role
        if (role === "admin" || role ==="landlord") {
            next()
        } else {
            res.status(403).json({ msg: "Only for admins and landlords" })
        }
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}