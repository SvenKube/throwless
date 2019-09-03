import {Option, some, none} from "./option";

export const emptyOk = <E>(): Result<void, E> => new Ok(undefined);
export const emptyErr = <T>(): Result<T, void> => new Err(undefined);

export const ok = <T, E>(value: T): Result<T, E> => new Ok(value);
export const err = <T, E>(error: E): Result<T, E> => new Err(error);

export interface Result<T, E> {
    isErr(): boolean;
    isOk(): boolean;

    ok(): Option<T>;
    err(): Option<E>;

    map<U>(fn: (value: T) => U): Result<U, E>;
    mapErr<F>(fn: (error: E) => F): Result<T, F>;

    mapOrElse<U>(fnMap: (value: T) => U, fnOrElse: (error: E) => U): U;

    and<U>(res: Result<U, E>): Result<U, E>;
    andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E>;

    or<F>(res: Result<T, F>): Result<T, F>;
    orElse<F>(fn: (error: E) =>  Result<T, F>): Result<T, F>;

    expectErr(error: any): E;
    expect(error: any): T;

    unwrap(): T;
    unwrapErr(): E;

    unwrapOr(value: T): T;
    unwrapOrElse(fn: (error: E) => T): T;

    transform<U, F>(fnMap: (value: T) => U, fnMapErr: (error: E) => F ): Result<U, F>;
}

export class Ok<T, E> implements Result<T, E> {
    private readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    isErr(): boolean {
        return false;
    }

    isOk(): boolean {
        return true;
    }

    ok(): Option<T> {
        return some(this.value);
    }

    err(): Option<E> {
        return none();
    }

    unwrap(): T {
        return this.value;
    }

    unwrapErr(): E {
        throw this.value;
    }

    expectErr(error: any): E {
        throw error;
    }

    expect(_error: any): T {
        return this.value;
    }

    unwrapOr(_value: T): T {
        return this.value;
    }

    unwrapOrElse(_fn: (error: E) => T): T {
        return this.value;
    }

    or<F>(_res: Result<T, F>): Result<T, F> {
        return ok(this.value);
    }

    orElse<F>(_fn: (error: E) => Result<T, F>): Result<T, F> {
        return ok(this.value);
    }

    and<U>(res: Result<U, E>): Result<U, E> {
        return res;
    }

    andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
        return fn(this.value);
    }

    map<U>(fn: (value: T) => U): Result<U, E> {
        return ok(fn(this.value));
    }

    mapErr<F>(_fn: (error: E) => F): Result<T, F> {
        return ok(this.value);
    }

    mapOrElse<U>(fnMap: (value: T) => U, fnOrElse: (error: E) => U): U {
        return this.map(fnMap).unwrapOrElse(fnOrElse);
    }

    transform<U, F>(fnMap: (value: T) => U, _fnMapErr: (error: E) => F ): Result<U, F> {
        return ok(fnMap(this.value));
    }
}

export class Err<T, E> implements Result<T, E> {
    private readonly error: E;

    constructor(error: E) {
        this.error = error;
    }

    isErr(): boolean {
        return true;
    }

    isOk(): boolean {
        return false;
    }

    ok(): Option<T> {
        return none();
    }

    err(): Option<E> {
        return some(this.error);
    }

    unwrap(): T {
        throw this.error;
    }

    unwrapErr(): E {
        return this.error;
    }

    expect(error: any): T {
        throw error;
    }

    expectErr(_error: any): E {
        return this.error;
    }

    unwrapOr(value: T): T {
        return value;
    }

    unwrapOrElse(fn: (error: E) => T): T {
        return fn(this.error);
    }

    or<F>(res: Result<T, F>): Result<T, F> {
        return res;
    }

    orElse<F>(fn: (error: E) => Result<T, F>): Result<T, F> {
        return fn(this.error);
    }

    and<U>(_res: Result<U, E>): Result<U, E> {
        return err(this.error);
    }

    andThen<U>(_fn: (value: T) => Result<U, E>): Result<U, E> {
        return err(this.error);
    }

    map<U>(_fn: (value: T) => U): Result<U, E> {
        return err(this.error);
    }

    mapErr<F>(fn: (error: E) => F): Result<T, F> {
        return err(fn(this.error));
    }

    mapOrElse<U>(fnMap: (value: T) => U, fnOrElse: (error: E) => U): U {
        return this.map(fnMap).unwrapOrElse(fnOrElse);
    }

    transform<U, F>(_fnMap: (value: T) => U, fnMapErr: (error: E) => F ): Result<U, F> {
        return err(fnMapErr(this.error));
    }
}