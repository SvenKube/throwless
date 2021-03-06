import {Result, throwless, throwlessAsync} from "../src";

describe("Tests for throwlessAsync wrapping", () => {

    it("Returns Ok if promise resolves", async () => {
        const result: Result<number, Error> = await throwlessAsync(() => Promise.resolve(773));

        expect(result.isOk()).toBeTruthy();
        expect(result.unwrap()).toBe(773);
    });

    it("Returns Ok if promise resolves without value", async () => {
        const result: Result<void, Error> = await throwlessAsync(() => Promise.resolve());

        expect(result.isOk()).toBeTruthy();
        expect(result.unwrap()).toBeUndefined();
    });

    it("Returns Err if promise rejects", async () => {
        const result: Result<number, Error> = await throwlessAsync(() => Promise.reject(new Error("Some Error")));

        expect(result.isErr()).toBeTruthy();
        expect(result.unwrapErr()).toEqual(new Error("Some Error"));
    });

    it("Returns Err if promise rejects without error", async () => {
        const result: Result<number, Error> = await throwlessAsync(() => Promise.reject());

        expect(result.isErr()).toBeTruthy();
        expect(result.unwrapErr()).toBeUndefined();
    });

});

describe("Tests for throwless wrapping", () => {

    it("Returns Ok if fn returns value", () => {
        const result: Result<number, Error> = throwless(() => 773);

        expect(result.isOk()).toBeTruthy();
        expect(result.unwrap()).toBe(773);
    });

    it("Returns Ok if fn returns void", () => {
        const result: Result<void, Error> = throwless(() => {});

        expect(result.isOk()).toBeTruthy();
        expect(result.unwrap()).toBeUndefined();
    });

    it("Returns Err if fn throws an error", () => {
        const result: Result<number, Error> = throwless(() => {
            throw new Error("Some Error");
        });

        expect(result.isErr()).toBeTruthy();
        expect(result.unwrapErr()).toEqual(new Error("Some Error"));
    });

    it("Returns Err if fn throws", () => {
        const result: Result<number, Error> = throwless(() => {
            throw "";
        });

        expect(result.isErr()).toBeTruthy();
        expect(result.unwrapErr()).toEqual("");
    });

});