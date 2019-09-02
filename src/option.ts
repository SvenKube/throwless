import {Result, ok, err} from "./result";

export const some = <T>(value: T): Option<T> => new Some(value);
export const none = <T>(): Option<T> => new None();

export interface Option<T> {
    isSome(): boolean;
    isNone(): boolean;

    expect(error: any): T;
    unwrap(): T;
    unwrapOr(value: T): T;
    unwrapOrElse(fn: () => T): T;

    map<U>(fn: (value: T) => U): Option<U>;
    mapOr<U>(value: U, fn: (value: T) => U): U;
    mapOrElse<U>(fnMap: (value: T) => U, fnOrElse: () => U): U;

    okOr<E>(error: E): Result<T, E>;
    okOrElse<E>(fn: () => E): Result<T, E>;

    and<U>(optb: Option<U>): Option<U>;
    andThen<U>(fn: (value: T) => Option<U>): Option<U>;

    filter(fn: (value: T) => boolean): Option<T>;

    or(optb: Option<T>): Option<T>;
    orElse(fn: () => Option<T>): Option<T>;

    xor(optb: Option<T>): Option<T>;
}

export class Some<T> implements Option<T> {
    private readonly value: T;

    constructor(value: T){
        this.value = value;
    }

    isSome(): boolean {
        return true;
    }
    isNone(): boolean {
        return false;
    }

    expect(_error: any): T {
        return this.value;
    }

    unwrap(): T {
        return this.value;
    }

    unwrapOr(_value: T): T {
        return this.value;
    }

    unwrapOrElse(_fn: () => T): T {
        return this.value;
    }

    map<U>(fn: (value: T) => U): Option<U> {
        return new Some(fn(this.value));
    }

    mapOr<U>(_value: U, fn: (value: T) => U): U {
        return fn(this.value);
    }

    mapOrElse<U>(fnMap: (value: T) => U, _fnOrElse: () => U): U {
        return fnMap(this.value);
    }

    okOr<E>(_error: E): Result<T, E> {
        return ok(this.value);
    }

    okOrElse<E>(_fn: () => E): Result<T, E> {
        return ok(this.value);
    }

    and<U>(optb: Option<U>): Option<U> {
        return optb;
    }

    andThen<U>(fn: (value: T) => Option<U>): Option<U> {
        return fn(this.value);
    }

    filter(fn: (value: T) => boolean): Option<T> {
        // @ts-ignore
        return fn(this.value) ? new Some(this.value) : new None<T>();
    }

    or(_optb: Option<T>): Option<T> {
        return new Some(this.value);
    }

    orElse(_fn: () => Option<T>): Option<T> {
        return new Some(this.value);
    }

    xor(optb: Option<T>): Option<T> {
        return optb.isNone() ? this : new None();
    }
}

export class None<T> implements Option<T> {
    isSome(): boolean {
        return false;
    }

    isNone(): boolean {
        return true;
    }

    expect(error: any): T {
        throw error;
    }

    unwrap(): T {
        throw Error();
    }
    unwrapOr(value: T): T {
        return value;
    }

    unwrapOrElse(fn: () => T): T {
        return fn();
    }

    map<U>(_fn: (value: T) => U): Option<U> {
        return new None();
    }

    mapOr<U>(value: U, _fn: (value: T) => U): U {
        return value;
    }

    mapOrElse<U>(_fnMap: (value: T) => U, fnOrElse: () => U): U {
        return fnOrElse();
    }

    okOr<E>(error: E): Result<T, E> {
        return err(error);
    }

    okOrElse<E>(fn: () => E): Result<T, E> {
        return err(fn());
    }

    and<U>(_optb: Option<U>): Option<U> {
        return new None();
    }
    andThen<U>(_fn: (value: T) => Option<U>): Option<U> {
        return new None();
    }

    filter(_fn: (value: T) => boolean): Option<T> {
        return new None();
    }

    or(optb: Option<T>): Option<T> {
        return optb;
    }

    orElse(fn: () => Option<T>): Option<T> {
        return fn();
    }

    xor(optb: Option<T>): Option<T> {
        return optb.isSome() ? optb : new None();
    }
}