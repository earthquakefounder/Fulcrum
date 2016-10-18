var fss;
(function (fss) {
    var DataSource = (function () {
        function DataSource(settings) {
            if (typeof settings.data === 'string' || (settings.data && typeof settings.data.source === 'string')) {
                var url = typeof settings.data === 'string'
                    ? settings.data
                    : (settings.data.source);
                this.requestMaker = ajax_request(url, typeof settings.data === 'string'
                    ? fss.HttpMethod.GET
                    : settings.data.method === 'POST'
                        ? fss.HttpMethod.POST
                        : fss.HttpMethod.GET);
            }
        }
        DataSource.prototype.fetch = function () {
        };
        return DataSource;
    }());
    fss.DataSource = DataSource;
    function ajax_request(url, method) {
    }
})(fss || (fss = {}));
//# sourceMappingURL=datasource.js.map