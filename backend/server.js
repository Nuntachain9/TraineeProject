require('dotenv').config();

const Express = require('express');
const Mongoclient = require('mongodb').MongoClient;
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userAPI = require('./api/users');
const gps_dataAPI = require('./api/gps_data');
const vendorAPI = require('./api/vendors');
const vehicleAPI = require('./api/vehicle');
const vehicle_cameraAPI = require('./api/vehicle_camera');

const authMiddleware = require('./middlewares/authMiddleware');

const app = Express();
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));
app.use(Express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    if (req.path === '/api/users/login') {
        return next();
    }
    
    authMiddleware(req, res, next);
});

app.use('/api/users', userAPI);
app.use('/api/gps_data', gps_dataAPI);
app.use('/api/vendors', vendorAPI);
app.use('/api/vehicles', vehicleAPI);
app.use('/api/vehicle_cam', vehicle_cameraAPI);

const CONNECTION_STRING = process.env.DATABASE_URL;
const DATABASENAME = process.env.DATABASE_NAME;
const PORT = process.env.PORT;
let database;

Mongoclient.connect(CONNECTION_STRING, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.error("MongoDB Connection Failed:", error);
        return;
    }

    database = client.db(DATABASENAME);
    console.log("MongoDB Connection Successful");

    app.locals.database = database;

    app.listen(PORT, () => {
        console.log("Server is running on port 5038");
    });
});