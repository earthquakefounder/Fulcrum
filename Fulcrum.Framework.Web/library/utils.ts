namespace fss.utils {
    export function defined(obj: any) {
        return obj !== null && obj !== undefined;
    }

    export function arrayLike(obj: any) {
        return (
            Array.isArray(obj) ||
            (!!obj &&
                typeof obj === "object" &&
                typeof (obj.length) === "number" &&
                (obj.length === 0 ||
                    (obj.length > 0 &&
                        (obj.length - 1) in obj)
                )
            )
        );
    }
}