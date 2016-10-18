var fss;
(function (fss) {
    var http;
    (function (http) {
        function request() {
        }
        http.request = request;
    })(http = fss.http || (fss.http = {}));
})(fss || (fss = {}));
//# sourceMappingURL=http.js.map