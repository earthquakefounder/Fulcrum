var fss;
(function (fss) {
    var utils;
    (function (utils) {
        function defined(obj) {
            return obj !== null && obj !== undefined;
        }
        utils.defined = defined;
        function arrayLike(obj) {
            return (Array.isArray(obj) ||
                (!!obj &&
                    typeof obj === "object" &&
                    typeof (obj.length) === "number" &&
                    (obj.length === 0 ||
                        (obj.length > 0 &&
                            (obj.length - 1) in obj))));
        }
        utils.arrayLike = arrayLike;
    })(utils = fss.utils || (fss.utils = {}));
})(fss || (fss = {}));
//# sourceMappingURL=utils.js.map