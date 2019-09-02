import {err, ok, Result} from "./result";

export const throwless = <T, E>(fn: () => T): Result<T, E> => {
    try{
        return ok(fn());
    } catch (e) {
        return err(e);
    }
};

export const throwlessAsync = async <T, E>(fn: () => T): Promise<Result<T, E>> => {
    try{
        const returnValue = await fn();
        return Promise.resolve(ok(returnValue));
    } catch (e) {
        return Promise.resolve(err(e));
    }
};