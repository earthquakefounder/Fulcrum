namespace fss {
    interface IAjaxRequest {
        url: string,
        method: HttpMethod,
        headers?: { [key: string]: string },
        contentType?: string
    }

    interface IAjaxResponse {
        statusCode: number,
        text: string,
        json: any,
        xml: any
    }

    interface IAjaxFailure {
        statusCode: number,
        error: string
    }

    export enum HttpMethod {
        GET,
        POST,
        PUT,
        DELETE
    }

    export var StatusCode = {
        OK: 200,
        BadRequest: 400,
        Unauthorized: 401,
        Forbidden: 403,
        ServerError: 500
    }

    export class Ajax {
        private events: EventsContainer = new EventsContainer();

        constructor(private baseUrl?: string) { }

        request(req: IAjaxRequest): Promise<IAjaxResponse> {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();

                xhr.open(HttpMethod[req.method], req.url);

                let headers = req.headers || {};

                if (req.contentType)
                    headers['Content-Type'] = req.contentType;

                for (let key in headers)
                    xhr.setRequestHeader(key, headers[key]);

                xhr.onreadystatechange = (event) => {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if ((200 <= xhr.status && xhr.status <= 299) || xhr.status === 304) {
                            resolve(new AjaxResponse(xhr));
                        } else {
                            reject({
                                statusCode: xhr.status,
                                error: xhr.responseText
                            });
                        }
                    }
                };
            }).catch((error: IAjaxFailure) => this.events.fire(error.statusCode, error));
        }

        failure(statusCode: number, handler: (error: IAjaxFailure) => void) {
            this.events.on(statusCode, handler);
            return this;
        }
    }

    class AjaxResponse implements IAjaxResponse {
        constructor(private xhr: XMLHttpRequest) { }

        get statusCode() { return this.xhr.status; }
        get text() { return this.xhr.responseText; }
        get json() {
            return utils.defined(this.xhr.responseBody)
                ? this.xhr.responseBody
                : JSON.parse(this.xhr.responseText);
        }
        get xml() {
            return this.xhr.responseXML;
        }
    }
}