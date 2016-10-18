var fss;
(function (fss) {
    (function (HttpMethod) {
        HttpMethod[HttpMethod["GET"] = 0] = "GET";
        HttpMethod[HttpMethod["POST"] = 1] = "POST";
        HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
        HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
    })(fss.HttpMethod || (fss.HttpMethod = {}));
    var HttpMethod = fss.HttpMethod;
    fss.StatusCode = {
        OK: 200,
        BadRequest: 400,
        Unauthorized: 401,
        Forbidden: 403,
        ServerError: 500
    };
    var Ajax = (function () {
        function Ajax(baseUrl) {
            this.baseUrl = baseUrl;
            this.events = new fss.EventsContainer();
        }
        Ajax.prototype.request = function (req) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open(HttpMethod[req.method], req.url);
                var headers = req.headers || {};
                if (req.contentType)
                    headers['Content-Type'] = req.contentType;
                for (var key in headers)
                    xhr.setRequestHeader(key, headers[key]);
                xhr.onreadystatechange = function (event) {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if ((200 <= xhr.status && xhr.status <= 299) || xhr.status === 304) {
                            resolve(new AjaxResponse(xhr));
                        }
                        else {
                            reject({
                                statusCode: xhr.status,
                                error: xhr.responseText
                            });
                        }
                    }
                };
            }).catch(function (error) { return _this.events.fire(error.statusCode, error); });
        };
        Ajax.prototype.failure = function (statusCode, handler) {
            this.events.on(statusCode, handler);
            return this;
        };
        return Ajax;
    }());
    fss.Ajax = Ajax;
    var AjaxResponse = (function () {
        function AjaxResponse(xhr) {
            this.xhr = xhr;
        }
        Object.defineProperty(AjaxResponse.prototype, "statusCode", {
            get: function () { return this.xhr.status; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjaxResponse.prototype, "text", {
            get: function () { return this.xhr.responseText; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjaxResponse.prototype, "json", {
            get: function () {
                return fss.utils.defined(this.xhr.responseBody)
                    ? this.xhr.responseBody
                    : JSON.parse(this.xhr.responseText);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjaxResponse.prototype, "xml", {
            get: function () {
                return this.xhr.responseXML;
            },
            enumerable: true,
            configurable: true
        });
        return AjaxResponse;
    }());
})(fss || (fss = {}));
//# sourceMappingURL=ajax.js.map