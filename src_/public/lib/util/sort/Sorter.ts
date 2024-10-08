import {SortedItem} from "./SortedItem";

export type Sorter<T> = {
    getDistance(item0: T, item1: T): bigint;
    sort(item: T, items: T[]): SortedItem<T>[];
}