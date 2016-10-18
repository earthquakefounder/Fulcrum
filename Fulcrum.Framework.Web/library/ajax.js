var fss;
(function (fss) {
    (function (HttpMethod) {
        HttpMethod[HttpMethod["GET"] = 0] = "GET";
        HttpMethod[HttpMethod["POST"] = 1] = "POST";
        HttpMethod[HttpMethod["PUT"] = 2] = "PUT";
        HttpMethod[HttpMethod["DELETE"] = 3] = "DELETE";
    })(fss.HttpMethod || (fss.HttpMethod = {}));
    var HttpMethod = fss.HttpMethod;
    var Ajax = (function () {
        function Ajax(baseUrl) {
            this.baseUrl = baseUrl;
        }
        Ajax.prototype.request = function (req) {
            var xhr = new XMLHttpRequest();
        };
        return Ajax;
    }());
    fss.Ajax = Ajax;
})(fss || (fss = {}));
//# sourceMappingURL=ajax.js.map