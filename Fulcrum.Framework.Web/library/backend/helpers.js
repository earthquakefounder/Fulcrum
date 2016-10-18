var fss;
(function (fss) {
    var backend;
    (function (backend) {
        var helpers;
        (function (helpers) {
            function combine() {
                var parts = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    parts[_i - 0] = arguments[_i];
                }
                if (!parts.length)
                    return null;
                if (parts.length === 1)
                    return parts[0];
                var url = parts[0];
                if (url[url.length - 1] !== '/')
                    url += '/';
                for (var i = 1; i < parts.length; i++) {
                    var part = parts[i];
                    if (part[0] === '/')
                        part = part.substr(1);
                    url += part;
                    if (url[url.length - 1] !== '/')
                        url += '/';
                }
                return url;
            }
            helpers.combine = combine;
            function appendQueryString(url, obj) {
                if (!fss.utils.arrayLike(obj) && typeof obj !== 'object')
                    return url;
                if (url.indexOf('?') < 0)
                    url += '?';
                else if (url[url.length - 1] !== '?' && url[url.length - 1] !== '&')
                    url += '&';
                for (var key in obj) {
                    if (fss.utils.defined(obj[key])) {
                        var queryparameter = key + "=" + obj[key];
                        url += queryparameter + '&';
                    }
                }
                if (url[url.length - 1] === '&')
                    url = url.slice(0, -1);
                return url;
            }
            helpers.appendQueryString = appendQueryString;
        })(helpers = backend.helpers || (backend.helpers = {}));
    })(backend = fss.backend || (fss.backend = {}));
})(fss || (fss = {}));
//# sourceMappingURL=helpers.js.map