const Express = require("express");
const multer = require("multer");
const router = Express.Router();

// Vehicle Camera Format
// {
//     "unit_id": 1231,
//     "ch_no": 01,
//     "ch_location": "Bangkok, Thailand",
//     "realtime_url": "https://example.com/realtime",
//     "playback_url": "https://example.com/playback",
//     "create_at": "2025-02-11T14:30:00Z",    * From System
//     "create_by": "username",                * From System
//     "update_at": "2025-02-11T14:32:00Z",    * From System
//     "update_by": "username"                 * From System
// }

module.exports = router;