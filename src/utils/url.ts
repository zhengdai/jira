import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import {useMemo, useState} from "react";
import {cleanObject, subset} from "./index";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [stateKeys] = useState(keys);
    return [
        useMemo(
            () =>
                subset(Object.fromEntries(searchParams), stateKeys) as {
                    [key in K]: string;
                },
        [searchParams, stateKeys]
        ),
        (params: Partial<{[key in K]: unknown }>) => {
            const o = cleanObject({
                ...Object.fromEntries(searchParams),
                ...params,
            }) as URLSearchParamsInit;
            return setSearchParams(o);
        },
    ] as const;
}
