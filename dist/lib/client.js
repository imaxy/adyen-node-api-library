"use strict";
/*
 *                       ######
 *                       ######
 * ############    ####( ######  #####. ######  ############   ############
 * #############  #####( ######  #####. ######  #############  #############
 *        ######  #####( ######  #####. ######  #####  ######  #####  ######
 * ###### ######  #####( ######  #####. ######  #####  #####   #####  ######
 * ###### ######  #####( ######  #####. ######  #####          #####  ######
 * #############  #############  #############  #############  #####  ######
 *  ############   ############  #############   ############  #####  ######
 *                                      ######
 *                               #############
 *                               ############
 *
 * Adyen NodeJS API Library
 *
 * Copyright (c) 2019 Adyen B.V.
 * This file is open source and available under the MIT license.
 * See the LICENSE file for more info.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("./config"));
var httpURLConnectionClient_1 = __importDefault(require("./httpClient/httpURLConnectionClient"));
var Client = /** @class */ (function () {
    function Client(options) {
        if (options.config) {
            this._config = options.config;
        }
        else {
            this._config = new config_1.default();
        }
        if (options.environment) {
            this.setEnvironment(options.environment, options.liveEndpointUrlPrefix);
            if (options.username && options.password && options.applicationName) {
                this._config.username = options.username;
                this._config.password = options.password;
                this._config.applicationName = options.applicationName;
            }
            if (options.apiKey) {
                this._config.apiKey = options.apiKey;
            }
        }
        if (options.httpClient) {
            this._httpClient = options.httpClient;
        }
    }
    Client.prototype.setEnvironment = function (environment, liveEndpointUrlPrefix) {
        this._config.environment = environment;
        if (environment === "TEST") {
            this._config.endpoint = Client.ENDPOINT_TEST;
            this._config.marketPayEndpoint = Client.MARKETPAY_ENDPOINT_TEST;
            this._config.hppEndpoint = Client.HPP_TEST;
            this._config.checkoutEndpoint = Client.CHECKOUT_ENDPOINT_TEST;
            this._config.terminalApiCloudEndpoint = Client.TERMINAL_API_ENDPOINT_TEST;
        }
        else if (environment === "LIVE") {
            this._config.endpoint = Client.ENDPOINT_LIVE;
            this._config.marketPayEndpoint = Client.MARKETPAY_ENDPOINT_LIVE;
            this._config.hppEndpoint = Client.HPP_LIVE;
            if (liveEndpointUrlPrefix) {
                this._config.endpoint =
                    "" + Client.ENDPOINT_PROTOCOL + liveEndpointUrlPrefix + Client.ENDPOINT_LIVE_SUFFIX;
                this._config.checkoutEndpoint =
                    "" + Client.ENDPOINT_PROTOCOL + liveEndpointUrlPrefix + Client.CHECKOUT_ENDPOINT_LIVE_SUFFIX;
            }
            else {
                this._config.endpoint = Client.ENDPOINT_LIVE;
                this._config.checkoutEndpoint = undefined;
            }
        }
    };
    Object.defineProperty(Client.prototype, "httpClient", {
        get: function () {
            if (!this._httpClient) {
                this._httpClient = new httpURLConnectionClient_1.default();
            }
            return this._httpClient;
        },
        set: function (httpClient) {
            this._httpClient = httpClient;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (config) {
            this._config = config;
        },
        enumerable: true,
        configurable: true
    });
    Client.prototype.setApplicationName = function (applicationName) {
        this.config.applicationName = applicationName;
    };
    Client.prototype.setTimeouts = function (connectionTimeoutMillis, readTimeoutMillis) {
        this.config.connectionTimeoutMillis = connectionTimeoutMillis;
        this.config.readTimeoutMillis = readTimeoutMillis;
    };
    Client.ENDPOINT_TEST = "https://pal-test.adyen.com";
    Client.ENDPOINT_LIVE = "https://pal-live.adyen.com";
    Client.ENDPOINT_LIVE_SUFFIX = "-pal-live.adyenpayments.com";
    Client.HPP_TEST = "https://test.adyen.com/hpp";
    Client.HPP_LIVE = "https://live.adyen.com/hpp";
    Client.MARKETPAY_ENDPOINT_TEST = "https://cal-test.adyen.com/cal/services";
    Client.MARKETPAY_ENDPOINT_LIVE = "https://cal-live.adyen.com/cal/services";
    Client.API_VERSION = "v49";
    Client.RECURRING_API_VERSION = "v30";
    Client.MARKETPAY_ACCOUNT_API_VERSION = "v4";
    Client.MARKETPAY_FUND_API_VERSION = "v3";
    Client.MARKETPAY_NOTIFICATION_API_VERSION = "v1";
    Client.LIB_NAME = "adyen-node-api-library";
    Client.LIB_VERSION = "1.0.0";
    Client.CHECKOUT_ENDPOINT_TEST = "https://checkout-test.adyen.com/checkout";
    Client.CHECKOUT_ENDPOINT_LIVE_SUFFIX = "-checkout-live.adyenpayments.com/checkout";
    Client.CHECKOUT_API_VERSION = "v49";
    Client.BIN_LOOKUP_PAL_SUFFIX = "/pal/servlet/BinLookup/";
    Client.BIN_LOOKUP_API_VERSION = "v40";
    Client.CHECKOUT_UTILITY_API_VERSION = "v1";
    Client.TERMINAL_API_ENDPOINT_TEST = "https://terminal-api-test.adyen.com";
    Client.TERMINAL_API_ENDPOINT_LIVE = "https://terminal-api-live.adyen.com";
    Client.ENDPOINT_PROTOCOL = "https://";
    return Client;
}());
exports.default = Client;
//# sourceMappingURL=client.js.map