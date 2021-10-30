import {URLSearchParamsInit, useSearchParams} from "react-router-dom";
import {useMemo} from "react";
import {cleanObject, subset} from "./index";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return [
        useMemo(
            () =>
                subset(Object.fromEntries(searchParams), keys) as {
                    [key in K]: string;
                },
        [searchParams]
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
