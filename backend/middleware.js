const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

function authMiddleware(req, res, next) {
    //retrieve the token from the headers
    const authHeader = req.headers.authorization;
    //check if the desired token is present
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({});
    }

    const reqToken = authHeader.split(' ')[1]
    
    try {
        const decoded = jwt.verify(reqToken, jwtSecret)
        if(decoded.userId) {
            req.userId = decoded.userId
            next()
        } else {
            return res.status(403).json({})
        }
    } catch(err) {
        return res.status(403).json({})
    }
}

module.exports = authMiddleware


// // Alt:-
// const authHeader = req.headers['authorization']
// const reqToken = authHeader && authHeader.split(' ')[1]  //right side expression's result is assigned if the left side expression is truthy/valid. If it's falsy, then null/undefined gets storred. https://chatgpt.com/c/67765448-16d8-8009-a61e-9f3bbb707337
// if(reqToken == null) {
//     return res.status(403).json({})
// }