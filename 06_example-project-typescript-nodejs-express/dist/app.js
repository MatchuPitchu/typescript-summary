"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// instead of using types express.Request etc. later, import directly concrete types that were installed via npm
const express_1 = __importDefault(require("express"));
// middleware that parses all incoming requests and extracts any json data it finds in there 
// to then populate the body key on req obj (-> req.body) with parsed json data
const body_parser_1 = require("body-parser");
const todos_1 = __importDefault(require("./routes/todos"));
const app = express_1.default();
app.use(body_parser_1.json());
// all requests of imported todoRoutes are available on '/todos/...'
app.use('/todos', todos_1.default);
// error handling middleware function
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000);
