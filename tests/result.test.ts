import {ok, err, some, none, Result} from "../src";

describe("Tests for Ok", () => {

    let result: Result<number, Error>;

    beforeAll(() => {
        result = ok(773);
    });

    test("isOk() returns true", () => {
        expect(result.isOk()).toBeTruthy();
    });

    test("isErr() returns false", () => {
       expect(result.isErr()).toBeFalsy();
    });

    test("ok() returns Some<T> with value", () => {
        expect(result.ok()).toEqual(some(773));
    });

    test("err() returns None", () => {
       expect(result.err()).toEqual(none());
    });

    test("map() maps value successful", () => {
        const mappedResult: Result<number, Error> = result.map(
            (value) => value * 2
        );

        expect(mappedResult.unwrap()).toEqual(773 * 2);
    });

    test("mapErr() returns unchanged result with the value", () => {
        const mappedResult: Result<number, Error> = result.mapErr(
            (error) => error
        );

        expect(mappedResult).toEqual(result);
    });

    test("mapOrElse() should map the value just like map()", () => {
        const mappedValue: string = result.mapOrElse(
            (value) => value.toString(),
            (_error) => "1337"
        );

        expect(mappedValue).toEqual("773");
    });

    test("and() returns passed Result<U, E>", () => {
        const and: Result<string, Error> = result.and(ok("Hello"));

        expect(and).toEqual(ok("Hello"));
    });

    test("andThen() returns Result<U, E> returned by fn()", () => {
        const andThen: Result<number, Error> = result.andThen(
            (value) => ok(value * 2)
        );

        expect(andThen).toEqual(ok(773 * 2));
    });

    test("or() returns Ok() of this instead of passed Result<T, F>", () => {
       const or: Result<number, Error> = result.or(ok(1337));

       expect(or).toEqual(ok(773));
    });

    test("orElse() returns Ok() of this instead of Result<T, F> returned by fn()", () => {
       const orElse: Result<number, Error> = result.orElse(
           (_error => ok(1337))
       );

       expect(orElse).toEqual(ok(773));
    });

    test("expectErr() throws the passed Error when called on an Ok()", () => {
        expect(() =>
            result.expectErr(new Error("Some Error"))
        ).toThrow(new Error("Some Error"));
    });

    test("expect() returns value of Ok()", () => {
        expect(result.expect(new Error("Could not get value"))).toEqual(773);
    });

    test("unwrap() returns value ok Ok()", () => {
        expect(result.unwrap()).toEqual(773);
    });

    test("unwrapErr() throws value when called on Ok()", () => {
       expect(() => result.unwrapErr()).toThrow("773");
    });

    test("unwrapOr() returns this.value, not the parameter value", () => {
       expect(result.unwrapOr(1337)).toEqual(773);
    });

    test("unwrapOrElse() returns this.value, not the value return by fn()", () => {
       expect(result.unwrapOrElse(
           (_error) => 1337
       )).toEqual(773);
    });

});

describe("Tests for Err", () => {

    let result: Result<number, Error>;

    beforeAll(() => {
        result = err(new Error("Some error"));
    });

    test("isOk() returns false", () => {
        expect(result.isOk()).toBeFalsy();
    });

    test("isErr() returns true", () => {
        expect(result.isErr()).toBeTruthy();
    });

    test("ok() returns None", () => {
        expect(result.ok()).toEqual(none());
    });

    test("err() returns Some<E> with the error", () => {
        expect(result.err()).toEqual(some(new Error("Some error")));
    });

    test("map() returns Err()", () => {
        const mappedResult: Result<number, Error> = result.map(
            (value) => value * 2
        );

        expect(mappedResult).toEqual(err(new Error("Some error")));
    });

    test("mapErr() returns Err() with the mapped error", () => {
        const mappedResult: Result<number, Error> = result.mapErr(
            (error) => new Error("Mapped: " + error.message)
        );

        expect(mappedResult).toEqual(err(new Error("Mapped: Some error")));
    });

    test("mapOrElse() should return the value returned by fnOrElse()", () => {
        const mappedValue: string = result.mapOrElse(
            (value) => value.toString(),
            (_error) => "1337"
        );

        expect(mappedValue).toEqual("1337");
    });

    test("and() returns Err() with this.error", () => {
        const and: Result<string, Error> = result.and(ok("Hello"));

        expect(and).toEqual(err(new Error("Some error")));
    });

    test("andThen() returns Err() with this.error", () => {
        const andThen: Result<number, Error> = result.andThen(
            (value) => ok(value * 2)
        );

        expect(andThen).toEqual(err(new Error("Some error")));
    });

    test("or() returns Ok() passed Result<T, F>", () => {
        const or: Result<number, Error> = result.or(ok(1337));

        expect(or).toEqual(ok(1337));
    });

    test("orElse() returns Ok() of Result<T, F> returned by fn()", () => {
        const orElse: Result<number, Error> = result.orElse(
            (_error => ok(1337))
        );

        expect(orElse).toEqual(ok(1337));
    });

    test("expectErr() returns this.error", () => {
        expect(result.expectErr(new Error("Some other error")))
            .toEqual(new Error("Some error"));
    });

    test("expect() throws the passed error", () => {
        expect(() =>
            result.expect(new Error("Could not get value"))
        ).toThrow(new Error("Could not get value"));
    });

    test("unwrap() throws this.error", () => {
        expect(() => result.unwrap()).toThrow(new Error("Some error"));
    });

    test("unwrapErr() returns error", () => {
        expect(result.unwrapErr()).toEqual(new Error("Some error"));
    });

    test("unwrapOr() returns the parameter value", () => {
        expect(result.unwrapOr(1337)).toEqual(1337);
    });

    test("unwrapOrElse() returns the value returned by fn()", () => {
        expect(result.unwrapOrElse(
            (_error) => 1337
        )).toEqual(1337);
    });

});