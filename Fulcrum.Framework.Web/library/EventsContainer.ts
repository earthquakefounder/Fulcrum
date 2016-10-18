namespace fss {
    export class EventsContainer {
        private all = {};
        on(event: any, handler: Function) {
            let handlers = this.all[event] = (this.all[event] || []);
            handlers.push(handler);
            return this;
        }

        off(event: any, handler?: Function) {
            if (!utils.defined(handler)) {
                delete this.all[event];
            } else {
                let h = this.all[event];
                let index;
                if (h && (index = h.indexOf(handler))) {
                    h.splice(index, 1);
                }
            }

            return this;
        }

        fire(event: any, ...args: any[]) : Promise<any> {
            let handlers = this.all[event] = (this.all[event] || []);

            return Promise.all.apply(Promise, handlers.map((h) => {
                return h.apply(null, args);
            }));
        }
    }
}