"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var genApi_1 = require("../genApi");
(0, genApi_1.getApi)('mber/updateTrainNumberPosition')
    // getApi('photo/insertTrainNumberPhoto')
    // getApi('/photo/listPlPhoto')
    // getApi('/vessel/listByPage')
    .then(function (rst) {
    console.log('-----------------------------', rst);
});
