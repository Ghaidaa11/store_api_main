"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var orderHandler_1 = __importDefault(require("./handlers/orderHandler"));
var productHandler_1 = __importDefault(require("./handlers/productHandler"));
var app = (0, express_1.default)();
var address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.use('/users', userRoutes_1.default);
app.use('/orders', orderHandler_1.default);
app.use('/products', productHandler_1.default);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports.default = app;
