"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = __importDefault(require("../controller/orders.controller")); // Import your orders controller
const is_auth_middleware_1 = __importDefault(require("../middlewares/is_auth.middleware"));
const joi_utils_1 = require("../utils/joi.utils");
const joi_1 = __importDefault(require("joi"));
const is_auth_customer_middleware_1 = __importDefault(require("../middlewares/is_auth_customer.middleware"));
class OrdersRouter {
    constructor() {
        this.path = '/orders';
        this.router = (0, express_1.Router)();
        // Create a OrderssController for handling orders-related operations
        this.ordersController = new orders_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, (0, is_auth_middleware_1.default)(["moderator", "admin"]), this.ordersController.getOrders);
        this.router.get(`${this.path}/best/selling/products`, (0, is_auth_middleware_1.default)(["moderator"]), this.ordersController.getBestSellingProducts);
        this.router.get(`${this.path}/best/sellers`, (0, is_auth_middleware_1.default)(["moderator"]), this.ordersController.getbestSellers);
        this.router.get(`${this.path}/c/all`, is_auth_customer_middleware_1.default, this.ordersController.getCustomerOrders);
        this.router.get(`${this.path}/:id`, (0, is_auth_middleware_1.default)(["moderator", "admin"]), this.ordersController.getOrder);
        this.router.post(`${this.path}/pb`, [(0, joi_utils_1.validateRequestBody)(joi_1.default.object({
                "name": joi_1.default.string().required(),
                "phoneNumber": joi_1.default.string().required(),
                "products": joi_1.default.array().required(),
                "address": joi_1.default.string().required(),
            }))], this.ordersController.createPbOrders);
        this.router.post(`${this.path}/pb/form`, [(0, joi_utils_1.validateRequestBody)(joi_1.default.object({
                "name": joi_1.default.string().required(),
                "phoneNumber": joi_1.default.string().required(),
                "address": joi_1.default.string().required(),
            }))], this.ordersController.createPbFormOrders);
        this.router.post(`${this.path}`, [(0, is_auth_middleware_1.default)(["moderator", "admin"]), (0, joi_utils_1.validateRequestBody)(joi_1.default.object({
                "name": joi_1.default.string(),
                "phoneNumber": joi_1.default.number(),
                "products": joi_1.default.array().required(),
                "customer": joi_1.default.string(),
                "address": joi_1.default.string().required(),
                "isFullFill": joi_1.default.boolean().required()
            }))], this.ordersController.createOrders);
        // this.router.post(`${this.path}`, [isAuth(["moderator", "admin"]), validateRequestBody(
        //     Joi.object({
        //         "products": Joi.array().required(),
        //         "address": Joi.string().required(),
        //     })
        // )], this.ordersController.createOrders);
        this.router.patch(`${this.path}/:id`, [(0, is_auth_middleware_1.default)(["moderator", "admin"]), (0, joi_utils_1.validateRequestBody)(joi_1.default.object({
                "name": joi_1.default.string(),
                "phoneNumber": joi_1.default.number(),
                "products": joi_1.default.array(),
                "customer": joi_1.default.string(),
                "address": joi_1.default.string(),
                "isFullFill": joi_1.default.boolean(),
                "is_active": joi_1.default.boolean()
            }).or("name", "phoneNumber", "products", "address", "customer", "isFullFill", "is_active"))], this.ordersController.updateOrders);
        this.router.delete(`${this.path}/:id`, (0, is_auth_middleware_1.default)(["moderator", "admin"]), this.ordersController.deleteOrders);
    }
}
exports.default = OrdersRouter;
