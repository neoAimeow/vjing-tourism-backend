import { PaginationArgs } from "@/models/common";

export function initialPageVariable(pageSize?: number): PaginationArgs {
    return { first: pageSize || 10, before: undefined, after: undefined, last: undefined };
}

export function nextPageVariable<T>(items?: T[], pageSize?: number, id?: (item?: T) => string | undefined): PaginationArgs {
    const lastData = items ? items[items.length - 1] : undefined;
    const idStr = id && id(lastData);
    return {
        after: idStr || undefined,
        first: pageSize || 10,
        before: undefined,
        last: undefined,
    };
}
export function previousPageVariable<T>(items?: T[], pageSize?: number, id?: (item?: T) => string | undefined) {
    const firstData = items ? items[0] : undefined;
    const idStr = id && id(firstData);
    return {
        before: idStr || undefined,
        last: pageSize || 10,
        after: undefined,
        first: undefined,
    };
}
