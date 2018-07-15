const token = require('../token')

// token.js, to save in env file
const SECRET = 'i am a secret';

const verifyToken = async(req, res, next) => {
  const authHeader = req.get('authorization');

  if (!authHeader) {
      next(new Error('unauthorized'));
  }

  const _token = authHeader.split('Bearer ')[1];

  try {
      const decoded = await token.verify(_token, SECRET);
      req.token = decoded;
      next();
  } catch (e) {
      next(new Error('unauthorized'));
  }
}


module.exports = {
  verifyToken
}