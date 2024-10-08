function assert(condition: boolean, message?: string): void {
    if (!condition) throw Error(message);
    return;
}

export {assert};