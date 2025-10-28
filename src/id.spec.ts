import {
  generate,
  publicId,
  shortId,
  fileSafeId,
  memorableId,
  isUUID,
} from "./id";

describe("id", () => {
  describe("generate", () => {
    test("creates new GUID ids", () => {
      const id = generate();
      console.log(id);
      expect(id).toBeDefined();
      expect(id.length).toBe(36);
    });

    test("creates unique ids", () => {
      const one = generate();
      const two = generate();
      expect(one).toBeDefined();
      expect(two).toBeDefined();
      expect(one).not.toEqual(two);
    });
  });

  describe("publicId", () => {
    test("should generate an id", () => {
      const id = publicId();
      expect(id.length).toEqual(10);
    });
  });

  describe("shortId", () => {
    test("should generate an id with a specified length", () => {
      const length = 7;
      const id = shortId(length);
      expect(id.length).toEqual(length);
    });
  });

  describe("fileSafeId", () => {
    test("should generate an id with a specified length", () => {
      const length = 7;
      const id = fileSafeId(length);
      expect(id.length).toEqual(length);
    });
  });

  describe("memorableId", () => {
    test("should generate an id with a specified length", () => {
      const length = 7;
      const id = memorableId(length);
      expect(id.length).toEqual(length);
    });
  });

  describe("isUUID", () => {
    test("should be true for a UUID", () => {
      expect(isUUID("b8a32304-610f-41b9-b867-d0fc1062d912")).toEqual(true);
    });

    test("should be false for a non-UUID", () => {
      expect(isUUID("g8a32304-610f-41b9-b867-d0fc1062d912")).toEqual(false);
    });
  });
});
