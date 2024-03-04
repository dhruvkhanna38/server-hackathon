"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIHelper = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const typechat_1 = require("typechat");
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../.env') });
class OpenAIHelper {
    constructor() {
        this.messages = new Array();
        this.model = (0, typechat_1.createLanguageModel)(process.env);
        this.schema = fs_1.default.readFileSync(path_1.default.join(__dirname, './ActionSchema.ts'), 'utf8');
        this.translator = (0, typechat_1.createJsonTranslator)(this.model, this.schema, 'ActionSchema');
        this.translator.stripNulls = true;
    }
}
exports.OpenAIHelper = OpenAIHelper;
