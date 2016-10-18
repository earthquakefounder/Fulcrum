namespace fss.backend.helpers {
    export function combine(...parts: string[]) {
        if (!parts.length)
            return null;

        if (parts.length === 1)
            return parts[0];

        var url = parts[0];

        if (url[url.length - 1] !== '/')
            url += '/';

        for (let i = 1; i < parts.length; i++) {
            let part = parts[i];

            if (part[0] === '/')
                part = part.substr(1);

            url += part;

            if (url[url.length - 1] !== '/')
                url += '/';
        }

        return url;
    }

    export function appendQueryString(url: string, obj: any) {
        if (!utils.arrayLike(obj) && typeof obj !== 'object')
            return url;

        if (url.indexOf('?') < 0)
            url += '?';
        else if (url[url.length - 1] !== '?' && url[url.length - 1] !== '&')
            url += '&';

        for (let key in obj) {
            if (utils.defined(obj[key])) {
                let queryparameter = `${key}=${obj[key]}`;

                url += queryparameter + '&';
            }
        }

        if(url[url.length - 1] === '&')
            url = url.slice(0, -1);

        return url;
    }
}