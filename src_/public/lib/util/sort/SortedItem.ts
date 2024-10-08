export type SortedItem<T> = {
    item(): T;
    distance(): bigint;
}

export function SortedItem<T>(_item: T, _distance: bigint): SortedItem<T> {

    /***/ {
        return {item, distance};
    }

    function item(): T {
        return _item;
    }

    function distance(): bigint {
        return _distance;
    }
}