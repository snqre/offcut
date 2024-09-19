import {Sorter} from "./Sorter";
import {SortedItem} from "./SortedItem";
import Levenshtein from "fast-levenshtein";

export function StringSorter(): Sorter<string> {

    /***/ {
        return {getDistance, sort};
    }

    function getDistance(item0: string, item1: string): bigint {
        return BigInt(Levenshtein.get(item0, item1));
    }

    function sort(item: string, items: string[]): SortedItem<string>[] {
        return items
            .map(i => ({item: i, distance: getDistance(item, i)}))
            .sort((a, b) => (a.distance < b.distance ? -1 : 1))
            .map(item => SortedItem(item.item, item.distance));
    }
}