export function singleton<Value> (key:string, value:()=>Value):Value{

    const yolo = global as typeof globalThis & { _singletons?: Record<string, Value> };

    yolo._singletons ??= {};
    yolo._singletons[key] ??= value();

    return yolo._singletons[key];
}

