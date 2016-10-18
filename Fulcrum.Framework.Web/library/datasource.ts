namespace fss {
    interface DataSourceSettings {
        data: string | Array<any> | Function | DataSource_DataSettings
    }

    interface DataSource_DataSettings {
        source: string | Function,
        requestTransform?: Function,
        method?: 'GET' | 'POST'
    }

    export class DataSource {
        private requestMaker: (...args: any[]) => Promise<any>;

        constructor(settings: DataSourceSettings) {
            if (typeof settings.data === 'string' || (settings.data && typeof (<DataSource_DataSettings>settings.data).source === 'string')) {
                let url: string = typeof settings.data === 'string'
                    ? <string>settings.data
                    : <string>((<DataSource_DataSettings>settings.data).source);

                this.requestMaker = ajax_request(
                    url,
                    typeof settings.data === 'string'
                        ? HttpMethod.GET
                        : (<DataSource_DataSettings>settings.data).method === 'POST'
                            ? HttpMethod.POST
                            : HttpMethod.GET
                );
            }
        }

        fetch() {
            
        }
    }

    function ajax_request(url: string, method: HttpMethod) {

    }
}