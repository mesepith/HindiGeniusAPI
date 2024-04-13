"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
// src/entity/Chat.ts
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Chat = class Chat {
};
exports.Chat = Chat;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Chat.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User),
    __metadata("design:type", User_1.User)
], Chat.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'session_id' }),
    __metadata("design:type", String)
], Chat.prototype, "sessionId", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Chat.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Chat.prototype, "response", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Chat.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Chat.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Chat.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'service_by', nullable: true }),
    __metadata("design:type", String)
], Chat.prototype, "serviceBy", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'ai_model', nullable: true }),
    __metadata("design:type", String)
], Chat.prototype, "aiModel", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'prompt_tokens', nullable: true }),
    __metadata("design:type", Number)
], Chat.prototype, "promptTokens", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'completion_tokens', nullable: true }),
    __metadata("design:type", Number)
], Chat.prototype, "completionTokens", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'total_tokens', nullable: true }),
    __metadata("design:type", Number)
], Chat.prototype, "totalTokens", void 0);
exports.Chat = Chat = __decorate([
    (0, typeorm_1.Entity)('chats')
], Chat);
//# sourceMappingURL=Chat.js.map