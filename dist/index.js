"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const controller_1 = require("./controller/controller");
const environment_1 = require("./environment");
var Service = require('node-windows').Service;
const express = (0, express_1.default)();
const mongoose = mongoose_1.default;
const bodyParser = body_parser_1.default;
const cors = cors_1.default;
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = environment_1.environment.mongoDBUrl ? environment_1.environment.mongoDBUrl : 'mongodb+srv://sasi358459:Sasi358459@cluster0.h2vvopf.mongodb.net/?';
            const dbConnect = yield mongoose.connect(url, {});
            if (dbConnect) {
                console.log('mongo connected');
                setRoutes();
                hostServer();
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
function setRoutes() {
    const controller = new controller_1.Controller();
    express.get('/', (req, res) => {
        res.send('hello');
    });
    express.get('getAllUser');
    express.get('/getAllProducts/:id', controller.getAllProducts);
    express.post('/login', controller.createUserCollection);
    express.put('/updateUser/:id', controller.updateLogin);
    express.post('/products', controller.postProduct);
    express.put('/editProducts/:productsId/:productItemIndex', controller.editProducts);
    express.delete('/deleteProducts/:productsId/:productItemIndex', controller.deleteProducts);
}
function hostServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = environment_1.environment.PORT ? environment_1.environment.PORT : 3000;
        const server = yield express.listen(port);
        if (server) {
            console.log(`server started at ${port}`);
        }
    });
}
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(Service);
    const allowedOrigins = /^https?:\/\/\w+(\.\w+)*(:[0-9]+)?(\/.*)?$/;
    express.use(cors({
        origin: allowedOrigins
    }));
    express.use(bodyParser.urlencoded({ extended: false }));
    express.use(bodyParser.json());
    mongoose.set('strictQuery', true);
    dbConnect();
});
exports.init = init;
(0, exports.init)();
//# sourceMappingURL=index.js.map