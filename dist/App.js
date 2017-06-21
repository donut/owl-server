"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const Hero_1 = require("./routes/Hero");
const graphql_1 = require("./graphql");
const Store_1 = require("./Store");
// Creates and configures an ExpressJS web server.
class App {
    // Run configuration methods on Express instance
    constructor() {
        this.store = Store_1.store;
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        // This is just to get up and running, and to make sure what we've got
        // is working so far. This function will change when we start to add
        // more API endpoints.
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello, World!'
            });
        });
        this.express.use('/', router);
        this.express.use('/api/v1/heroes', Hero_1.default);
        this.express.use('/graphql', graphql_1.default);
    }
}
exports.default = new App().express;
