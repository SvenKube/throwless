# Throwless

## Description
The `Result` and `Option` type from Rust ported to TypeScript.

## Installation
```
npm install --save throwless
```

## Usage

### Result
```typescript
import {ok, err, Result} from 'throwless';

const result = ok(42);

result.isOk(); // => true
result.isErr(); // => false

result.unwrap(); // => 42

result.map((i) => i * 2).unwrap(); // => 84


const anotherResult = err(new Error("Something went wrong"));

if(anotherResult.isErr()){
    // handle error here....
}

anotherResult.unwrap(); // => Throws Error "Something went wrong"

const mappedResult = anotherResult.mapErr(
    (e) => new Error("MyError: " + e.message)
);
    
mappedResult.unwrap(); // => Throws Error "MyError: Something went wrong"
```

### Option
```typescript
import {some, none, Option} from 'throwless';

const result = some(42);

result.isSome(); // => true
...


const result2 = none<number>();

console.log(result.xor(result2)); // => Some(42)

```

## Helper Functions for `Result` and `Option`
```typescript
export const ok = <T, E>(value: T): Result<T, E> => new Ok(value);
export const err = <T, E>(error: E): Result<T, E> => new Err(error);

export const some = <T>(value: T): Option<T> => new Some(value);
export const none = <T>(): Option<T> => new None();
```

## Interfaces

### `Result<T, E>`
```typescript
interface Result<T, E> {
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
}
```

### `Option<T>`
```typescript
interface Option<T> {
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
```
