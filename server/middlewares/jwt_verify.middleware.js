const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function verifyToken(req,res,next) {
  // return new Promise((resolve, reject) => {
  //   if (!token) {
  //     reject({ status: 401, error: 'Unauthorized' });
  //   }

  //   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
  //     if (err) {
  //       if (err.name === 'TokenExpiredError') {
  //         reject({ status: 401, error: 'Token expired' });
  //       } else {
  //         reject({ status: 401, error: 'Invalid token' });
  //       }
  //     } else {
  //       resolve(decoded);
  //     }
  //   });
  // });
  const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token,process.env.SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });
        req.user = user;
        next();
    });
}

module.exports = { verifyToken };
