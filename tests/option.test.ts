import {err, none, ok, Option, some} from "../src";

describe("Tests for Some", () => {

    let option: Option<number>;

    beforeAll(() => {
        option = some(773);
    });

    test("isSome() returns true", () => {
        expect(option.isSome()).toBeTruthy();
    });

    test("isNone() returns false", () => {
        expect(option.isNone()).toBeFalsy();
    });

    test("expect() returns value of some()", () => {
        expect(option.expect(new Error("Could not get value")))
            .toEqual(773);
    });

    test("unwrap() returns value of some()", () => {
        expect(option.unwrap()).toEqual(773);
    });

    test("unwrapOr() returns value of some()", () => {
        expect(option.unwrapOr(1337)).toEqual(773);
    });

    test("unwrapOrElse() returns value of some()", () => {
        expect(option.unwrapOrElse(
            () => 1337
        )).toEqual(773);
    });

    test("map() returns the result of fn", () => {
        expect(option.map(
            (value => value * 2)
        )).toEqual(some(773 * 2));
    });

    test("mapOr() returns the result of fn instead of passed value", () => {
        expect(option.mapOr(1337,
            (value => value * 2)
        )).toEqual(773 * 2);
    });

    test("mapOrElse() returns the result of fnMap, not fnOrElse", () => {
        expect(option.mapOrElse(
            (value => value * 2),
            (() => 1337)
        )).toEqual(773 * 2);
    });

    test("okOr() returns Result<T, E> with the value of Some", () => {
        expect(option.okOr(new Error("Some error")))
            .toEqual(ok(773));
    });

    test("okOrElse() returns Result<T, E> with the value of Some", () => {
        expect(option.okOrElse(
            (() => new Error("Some Error"))
        )).toEqual(ok(773));
    });

    test("and() returns the passed Option", () => {
        expect(option.and(some(42))).toEqual(some(42));
    });

    test("andThen() returns the Option returned by fn", () => {
        expect(option.andThen(
            (value => some(value * 2))
        )).toEqual(some(773 * 2));
    });

    test("filter() returns some() if fn returns true", () => {
        expect(option.filter(
            (_value => true)
        )).toEqual(some(773));
    });

    test("filter() returns none() if fn returns false", () => {
        expect(option.filter(
            (_value => false)
        )).toEqual(none());
    });

    test("or() returns this some()", () => {
        expect(option.or(some(1337))).toEqual(some(773));
    });

    test("or() returns this some()", () => {
        expect(option.orElse(
            (() => some(1337))
        )).toEqual(some(773));
    });

    test("xor() returns this some() if other is none()", () => {
        expect(option.xor(none())).toEqual(some(773));
    });

    test("xor() returns this none() if other is also some()", () => {
        expect(option.xor(some(1337))).toEqual(none());
    });

});

describe("Tests for None", () => {

    let option: Option<number>;

    beforeAll(() => {
        option = none();
    });

    test("isSome() returns false", () => {
        expect(option.isSome()).toBeFalsy();
    });

    test("isNone() returns true", () => {
        expect(option.isNone()).toBeTruthy();
    });

    test("expect() throws the passed error", () => {
        expect(() =>
            option.expect(new Error("Could not get value"))
        ).toThrow(new Error("Could not get value"));
    });

    test("unwrap() throws and error", () => {
        expect(() =>
            option.unwrap()
        ).toThrow();
    });

    test("unwrapOr() returns the passed value", () => {
        expect(option.unwrapOr(1337)).toEqual(1337);
    });

    test("unwrapOrElse() returns value returned by fn", () => {
        expect(option.unwrapOrElse(
            () => 1337
        )).toEqual(1337);
    });

    test("map() returns none()", () => {
        expect(option.map(
            (value => value * 2)
        )).toEqual(none());
    });

    test("mapOr() returns the passed value", () => {
        expect(option.mapOr(1337,
            (value => value * 2)
        )).toEqual(1337);
    });

    test("mapOrElse() returns the result of fnOrElse, not fnMap", () => {
        expect(option.mapOrElse(
            (value => value * 2),
            (() => 1337)
        )).toEqual(1337);
    });

    test("okOr() returns Result<T, E> with the passed error", () => {
        expect(option.okOr(new Error("Some error")))
            .toEqual(err(new Error("Some error")));
    });

    test("okOrElse() returns Result<T, E> with the error returned by fn", () => {
        expect(option.okOrElse(
            (() => new Error("Some error"))
        )).toEqual(err(new Error("Some error")));
    });

    test("and() returns none()", () => {
        expect(option.and(some(42))).toEqual(none());
    });

    test("andThen() returns none()", () => {
        expect(option.andThen(
            (value => some(value * 2))
        )).toEqual(none());
    });

    test("filter() returns none() if fn return true", () => {
        expect(option.filter(
            (_value => true)
        )).toEqual(none());
    });

    test("filter() returns none() if fn returns false", () => {
        expect(option.filter(
            (_value => false)
        )).toEqual(none());
    });

    test("or() returns the passed value", () => {
        expect(option.or(some(1337))).toEqual(some(1337));
    });

    test("or() returns value returned by fn", () => {
        expect(option.orElse(
            (() => some(1337))
        )).toEqual(some(1337));
    });

    test("xor() returns none() if other is none()", () => {
        expect(option.xor(none())).toEqual(none());
    });

    test("xor() returns some() if other is some()", () => {
        expect(option.xor(some(1337))).toEqual(some(1337));
    });

});