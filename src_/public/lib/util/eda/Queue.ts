import type {Item} from "./Item";

export type Queue
    =
    & {
        next(): Item;
        stack(item: Item): void;
    };

export function Queue(): Queue {
    let _inner: Item[];

    /***/ {
        _inner = [];
        return {next, stack};
    }
    
    function next(): Item {
        let item: Item | null = _inner.shift() ?? null;
        if (!item) throw Error("queueIsEmpty");
        return item;
    }

    function stack(item: Item): void {
        _inner.push(item);
        return;
    }
}