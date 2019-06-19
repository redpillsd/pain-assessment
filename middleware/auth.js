const jwt       = require('jsonwebtoken');
const config    = require('config');

module.exports = auth = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        // Get token from header
        const token = req.header('x-auth-token');

        // Check if not token
        if(!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            
            req.user = decoded.user;

            // Verify if user is active
            if(!req.user.active) {
                return res.status(401).json({ msg: 'User Inactive' });
            }

            // Verify user role
            if(roles.length && !roles.includes(req.user.role)) {
                return res.status(401).json({ msg: 'User Unauthorized' });
            }

            next();
        } catch(err) {
            res.status(401).json({ msg: 'Token is not valid'});
        }
    }
}
