"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const Todos_1 = __importDefault(require("../models/Todos"));
const uuid_1 = require("uuid");
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get('/api/todos', async (req, res) => {
    try {
        const todos = await Todos_1.default.find();
        console.log(todos);
        res.send(todos);
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to fetch todos' });
    }
});
app.post('/api/todo', async (req, res) => {
    try {
        const todo = await Todos_1.default.create({
            id: (0, uuid_1.v4)(),
            title: req.body.title,
            completed: false
        });
        res.send(todo);
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to create todo' });
    }
});
app.delete('/api/delete/:id', async (req, res) => {
    try {
        const todo = await Todos_1.default.findByIdAndDelete(req.params.id);
        res.send(todo);
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to delete todo' });
    }
});
app.put('/api/complete/:id', async (req, res) => {
    try {
        const todo = await Todos_1.default.findByIdAndUpdate(req.params.id, {
            completed: req.body.completed
        }, { new: true });
        res.send(todo);
    }
    catch (error) {
        res.status(500).send({ error: 'Failed to update todo' });
    }
});
const connectToDB = async () => {
    try {
        mongoose_1.default.set('strictQuery', true);
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB!');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};
const startServer = () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
const init = async () => {
    await connectToDB();
    startServer();
};
init();
//# sourceMappingURL=index.js.map