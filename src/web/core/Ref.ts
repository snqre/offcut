import type {EventSubscription} from "fbemitter";
import type {MaybeAsync} from "@web/util/MaybeAsync";
import {EventEmitter} from "fbemitter";

export type RefListenAction<T> = (now: T, old: T) => MaybeAsync<void>;
export type RefDeleteAction = () => void;
export type Ref<T> =
    & {
    get(): T;
    set(item: T): void;
    mount(listener: RefListenAction<T>): RefDeleteAction;
};
export function Ref<T>(_item: T): Ref<T> {
    let _e: EventEmitter = new EventEmitter();
    /***/ {
        return ({get, set, mount});
    }
    function get(): T {
        return (_item);
    }
    function set(item: T): void {
        let now: T = item;
        let old: T = get();
        _item = now;
        _e.emit("change", now, old);
        return;
    }
    function mount(listener: RefListenAction<T>): RefDeleteAction {
        let subscription: EventSubscription = _e.addListener("change", listener);
        return (() => subscription.remove());
    }
}