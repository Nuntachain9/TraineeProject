require('dotenv').config();

const Express = require('express');
const Mongoclient = require('mongodb').MongoClient;

const vehicleAPI = require('./api/vehicle');
const loginAPI = require('./api/login');
const gps_dataAPI = require('./api/gps_data');

const authMiddleware = require('./middlewares/authMiddleware');

const app = Express();

app.use(Express.json());
app.use((req, res, next) => {
    if (req.path === '/api/gettoken/login') {
        return next();
    }
    authMiddleware(req, res, next);
})

app.use('/api/vehicle', vehicleAPI);
app.use('/api/gettoken', loginAPI);
app.use('/api/gps_data', gps_dataAPI);

const CONNECTION_STRING = process.env.DATABASE_URL;
const DATABASENAME = process.env.DATABASE_NAME;
const PORT = process.env.PORT;
let database;

async function connectToDB() {
    try {
        const client = await Mongoclient.connect(CONNECTION_STRING, { useUnifiedTopology: true });
        database = client.db(DATABASENAME);
        console.log("MongoDB Connection Successful");

        app.locals.database = database;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
    }
}

connectToDB();