var fss;
(function (fss) {
    var EventsContainer = (function () {
        function EventsContainer() {
            this.all = {};
        }
        EventsContainer.prototype.on = function (event, handler) {
            var handlers = this.all[event] = (this.all[event] || []);
            handlers.push(handler);
            return this;
        };
        EventsContainer.prototype.off = function (event, handler) {
            if (!fss.utils.defined(handler)) {
                delete this.all[event];
            }
            else {
                var h = this.all[event];
                var index = void 0;
                if (h && (index = h.indexOf(handler))) {
                    h.splice(index, 1);
                }
            }
            return this;
        };
        EventsContainer.prototype.fire = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var handlers = this.all[event] = (this.all[event] || []);
            return Promise.all.apply(Promise, handlers.map(function (h) {
                return h.apply(null, args);
            }));
        };
        return EventsContainer;
    }());
    fss.EventsContainer = EventsContainer;
})(fss || (fss = {}));
//# sourceMappingURL=EventsContainer.js.map