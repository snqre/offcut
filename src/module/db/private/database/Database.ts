interface Database {
    get(key: string): Promise<unknown>;
    set(key: string, item: unknown): Promise<void>;
}

export type {Database};