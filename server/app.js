import express from 'express';
import logger from "morgan";
import bodyParser from 'body-parser';

import router from './routes/index';

// set up the express app
const app = express();

// log requests to the console.
app.use(logger('dev'));

// parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

// Set environment port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});


export default app;