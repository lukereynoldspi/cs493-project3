const jwt = require("jsonwebtoken")
requireAuthentication(req, res, next) {
    const authHeader = req.get('Authorization') || '';
    const authHeaderParts = authHeader.split(' ');

    const token = authHeaderParts[0] === 'Bearer' ? authHeaderParts[1] : null;

    try {
      const payload = jwt.verify(token, secretKey);
      req.user = payload.sub;
      next();
    } catch (err) {
      res.status(401).json({
        error: "Invalid authentication token provided."
      });
    }
  }
  
exports.requireAuthentication = requireAuthentication;