const express = require("express");
const morganMiddleware = require("./middlewares/morgan.middleware");

// The morgan middleware does not need this.
// This is for a manual log
const logger = require("./utils/logger");

const app = express();
app.use( express.json() );
// Add the morgan middleware
app.use(morganMiddleware);

app.all( '/', ( req, res ) => {
    try {
        logger.info(JSON.stringify(req.body));
        return res.send(req.body);
    }catch (e) {
        logger.error(e);
        return res.sendStatus(500);
    }
 
 } );
 
app.get("/api/status", (req, res) => {
    logger.info("Checking the API status: Everything is OK");
    res.status(200).send({
        status: "UP",
        message: "The API is up and running!"
    });
});

// Startup
app.listen(3000, () => {
    logger.info('Server is running on port 3000');
});