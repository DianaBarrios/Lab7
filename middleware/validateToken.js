const TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';

function validateToken(req, res, next){
    console.log("Inside the middleware");

    let auth = req.headers.authorization;
    let headerK = req.get('book-api-key');
    let queryK = req.query.apiKey;

    if(!auth && !queryK && !headerK){
        res.statusMessage = "You need to send the apikey";
        return res.status(401).end();
    }

    if(auth && auth !== `Bearer ${TOKEN}`){
        res.statusMessage = "The apiKey val in auth is invalid";
        return res.status(401).end();
    }

    if(headerK && headerK !== TOKEN){
        res.statusMessage = "The apiKey val in header is invalid";
        return res.status(401).end();
    }

    if(queryK && queryK !== TOKEN){
        res.statusMessage = "The apiKey val in query is invalid";
        return res.status(401).end();
    }

    next();
}

module.exports = validateToken;