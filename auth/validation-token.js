const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken : (request, response, next) => {
        let token = request.get("authorization");
        if(token)
        {
            token = token.slice(7);
            verify(token, process.env.SECRET_KEY, (error, decoded) => {
                if(error)
                {
                     response.json({
                        success: 0,
                        message : "Invalid Token. Please login again"
                    });
                }
                else
                {
                    next();
                }
            });
        }
        else{
            response.json(
                {
                    success : 0,
                    message : "Access denied! user is not authorised"
                }
            );
        }
    }
}