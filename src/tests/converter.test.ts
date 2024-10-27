import { convertCron } from "../index";

describe("minutes", () => {
  describe("success", () => {
    test("single value", () => {
      const input = "0 0 1 1 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          0",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("list of values", () => {
      const input = "0,10,35,55 0 1 1 0 /usr/bin/find";
      const output = [
        "minute        0 10 35 55",
        "hour          0",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("any value", () => {
      const input = "* 0 1 1 0 /usr/bin/find";
      const output = [
        "minute        0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59",
        "hour          0",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("range value", () => {
      const input = "10-15 0 1 1 0 /usr/bin/find";
      const output = [
        "minute        10 11 12 13 14 15",
        "hour          0",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("simple step value", () => {
      const input = "1/15 0 1 1 0 /usr/bin/find";
      const output = [
        "minute        1 16 31 46",
        "hour          0",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("any in step value", () => {
      const input = "*/15 0 1 1 0 /usr/bin/find";
      const output = [
        "minute        0 15 30 45",
        "hour          0",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("range in step value", () => {
      const input = "1-50/40 0 1 1 0 /usr/bin/find";
      const output = [
        "minute        1 41",
        "hour          0",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("combination of range, step and single values", () => {
      const input = "1,3,10-15,20-59/10 0 1 1 0 /usr/bin/find";
      const output = [
        "minute        1 3 10 11 12 13 14 15 20 30 40 50",
        "hour          0",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("intersecting values", () => {
      const input = "10,11,10-15 0 1 1 0 /usr/bin/find";
      const output = [
        "minute        10 11 12 13 14 15",
        "hour          0",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });
  });

  describe("errors", () => {
    test("too big value", () => {
      const input = "65 0 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("negative value", () => {
      const input = "-5 0 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("list without values", () => {
      const input = ", 0 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("range out boundaries", () => {
      const input = "0-66 0 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("range with negative values", () => {
      const input = "-1-66 0 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("wrong range", () => {
      const input = "35-10 0 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with wrong range", () => {
      const input = "35-10/10 0 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with wrong boundaries in range", () => {
      const input = "10-80/10 0 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with empty value", () => {
      const input = "/10 0 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("invalid symbol", () => {
      const input = "abc 0 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });
  });
});

describe("hours", () => {
  describe("success", () => {
    test("single value", () => {
      const input = "0 15 1 1 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          15",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("list of values", () => {
      const input = "0 0,4,8,13 1 1 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          0 4 8 13",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("any value", () => {
      const input = "0 * 1 1 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("range value", () => {
      const input = "0 9-14 1 1 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          9 10 11 12 13 14",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("simple step value", () => {
      const input = "0 1/4 1 1 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          1 5 9 13 17 21",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("any in step value", () => {
      const input = "0 */4 1 1 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          0 4 8 12 16 20",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("range in step value", () => {
      const input = "1 0-8/2 1 1 0 /usr/bin/find";
      const output = [
        "minute        1",
        "hour          0 2 4 6 8",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("combination of range, step and single values", () => {
      const input = "10 0-6,6-18/4,23 1 1 0 /usr/bin/find";
      const output = [
        "minute        10",
        "hour          0 1 2 3 4 5 6 10 14 18 23",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("intersecting values", () => {
      const input = "15 8-12,10,13 1 1 0 /usr/bin/find";
      const output = [
        "minute        15",
        "hour          8 9 10 11 12 13",
        "day of month  1",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });
  });

  describe("errors", () => {
    test("too big value", () => {
      const input = "0 25 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("negative value", () => {
      const input = "1 -10 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("list without values", () => {
      const input = "1 , 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("range out boundaries", () => {
      const input = "5 0-30 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("range with negative values", () => {
      const input = "5 -1-14 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("wrong range", () => {
      const input = "1 13-5 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with wrong range", () => {
      const input = "1 10-1/3 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with wrong boundaries in range", () => {
      const input = "5 0-25/3 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with empty value", () => {
      const input = "5 /15 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("invalid symbol", () => {
      const input = "5 b 1 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });
  });
});

describe("days", () => {
  describe("success", () => {
    test("single value", () => {
      const input = "0 10 15 1 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          10",
        "day of month  15",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("list of values", () => {
      const input = "0 5 5,15,30 1 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          5",
        "day of month  5 15 30",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("any value", () => {
      const input = "0 10 * 1 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          10",
        "day of month  1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("range value", () => {
      const input = "1 0 13-15 1 0 /usr/bin/find";
      const output = [
        "minute        1",
        "hour          0",
        "day of month  13 14 15",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("simple step value", () => {
      const input = "0 6 2/10 1 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          6",
        "day of month  2 12 22",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("any in step value", () => {
      const input = "0 6 */10 1 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          6",
        "day of month  1 11 21 31",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("range in step value", () => {
      const input = "1 5 1-10/2 1 0 /usr/bin/find";
      const output = [
        "minute        1",
        "hour          5",
        "day of month  1 3 5 7 9",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("combination of range, step and single values", () => {
      const input = "10 15 1,3,7-10,11-31/5 1 0 /usr/bin/find";
      const output = [
        "minute        10",
        "hour          15",
        "day of month  1 3 7 8 9 10 11 16 21 26 31",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("intersecting values", () => {
      const input = "15 10 1-15/5,1-11/10 1 0 /usr/bin/find";
      const output = [
        "minute        15",
        "hour          10",
        "day of month  1 6 11",
        "month         1",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });
  });

  describe("errors", () => {
    test("too big value", () => {
      const input = "0 1 32 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("negative value", () => {
      const input = "1 1 -5 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("zero value", () => {
      const input = "1 1 0 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("list without values", () => {
      const input = "1 5 , 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("range out boundaries", () => {
      const input = "5 1 1-32 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("range with zero value", () => {
      const input = "5 1 0-15 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("range with negative values", () => {
      const input = "5 1 -1-30 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("wrong range", () => {
      const input = "1 5 30-20 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with wrong range", () => {
      const input = "1 5 30-5/3 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with wrong boundaries in range", () => {
      const input = "5 3 1-35/3 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with zero in range", () => {
      const input = "5 3 0-15/3 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with empty value", () => {
      const input = "5 3 /5 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("invalid symbol", () => {
      const input = "5 1 ! 1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });
  });
});

describe("month", () => {
  describe("success", () => {
    test("single value", () => {
      const input = "0 10 1 5 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          10",
        "day of month  1",
        "month         5",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("list of values", () => {
      const input = "0 5 1 1,3,8 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          5",
        "day of month  1",
        "month         1 3 8",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("any value", () => {
      const input = "0 10 1 * 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          10",
        "day of month  1",
        "month         1 2 3 4 5 6 7 8 9 10 11 12",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("range value", () => {
      const input = "1 0 1 3-5 0 /usr/bin/find";
      const output = [
        "minute        1",
        "hour          0",
        "day of month  1",
        "month         3 4 5",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("simple step value", () => {
      const input = "0 6 1 2/3 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          6",
        "day of month  1",
        "month         2 5 8 11",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("any in step value", () => {
      const input = "0 6 1 */3 0 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          6",
        "day of month  1",
        "month         1 4 7 10",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("range in step value", () => {
      const input = "1 5 1 1-6/2 0 /usr/bin/find";
      const output = [
        "minute        1",
        "hour          5",
        "day of month  1",
        "month         1 3 5",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("combination of range, step and single values", () => {
      const input = "10 15 1 1,3,4-8/2,11-12 0 /usr/bin/find";
      const output = [
        "minute        10",
        "hour          15",
        "day of month  1",
        "month         1 3 4 6 8 11 12",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("intersecting values", () => {
      const input = "15 10 5 1-6,3-9/3 0 /usr/bin/find";
      const output = [
        "minute        15",
        "hour          10",
        "day of month  5",
        "month         1 2 3 4 5 6 9",
        "day of week   0",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });
  });

  describe("errors", () => {
    test("too big value", () => {
      const input = "0 1 5 13 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("negative value", () => {
      const input = "1 1 5 -1 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("zero value", () => {
      const input = "1 1 1 0 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("list without values", () => {
      const input = "1 5 5 , 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("range out boundaries", () => {
      const input = "5 1 5 1-13 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("range with zero value", () => {
      const input = "5 1 1-15 0-9 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("range with negative values", () => {
      const input = "5 1 * -1-12 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("wrong range", () => {
      const input = "1 5 1 12-5 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with wrong range", () => {
      const input = "1 5 1 12-3/3 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with wrong boundaries in range", () => {
      const input = "5 3 5 1-14/3 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with zero in range", () => {
      const input = "5 3 * 0-12/3 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with empty value", () => {
      const input = "5 3 5 /3 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("invalid symbol", () => {
      const input = "5 1 1 \ 0 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });
  });
});

describe("day of week", () => {
  describe("success", () => {
    test("single value", () => {
      const input = "0 10 1 1 4 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          10",
        "day of month  1",
        "month         1",
        "day of week   4",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("list of values", () => {
      const input = "0 5 1 1 5,6 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          5",
        "day of month  1",
        "month         1",
        "day of week   5 6",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("any value", () => {
      const input = "0 10 1 1 * /usr/bin/find";
      const output = [
        "minute        0",
        "hour          10",
        "day of month  1",
        "month         1",
        "day of week   0 1 2 3 4 5 6",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("range value", () => {
      const input = "1 0 1 1 0-4 /usr/bin/find";
      const output = [
        "minute        1",
        "hour          0",
        "day of month  1",
        "month         1",
        "day of week   0 1 2 3 4",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("simple step value", () => {
      const input = "0 8 1 1 1/2 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          8",
        "day of month  1",
        "month         1",
        "day of week   1 3 5",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("any in step value", () => {
      const input = "0 8 1 1 */2 /usr/bin/find";
      const output = [
        "minute        0",
        "hour          8",
        "day of month  1",
        "month         1",
        "day of week   0 2 4 6",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("range in step value", () => {
      const input = "1 5 1 * 0-4/2 /usr/bin/find";
      const output = [
        "minute        1",
        "hour          5",
        "day of month  1",
        "month         1 2 3 4 5 6 7 8 9 10 11 12",
        "day of week   0 2 4",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("combination of range, step and single values", () => {
      const input = "10 15 1 1 0,1-3,3-6/2 /usr/bin/find";
      const output = [
        "minute        10",
        "hour          15",
        "day of month  1",
        "month         1",
        "day of week   0 1 2 3 5",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });

    test("intersecting values", () => {
      const input = "15 10 1 * 0-3,2-6/2 /usr/bin/find";
      const output = [
        "minute        15",
        "hour          10",
        "day of month  1",
        "month         1 2 3 4 5 6 7 8 9 10 11 12",
        "day of week   0 1 2 3 4 6",
        "command       /usr/bin/find",
      ];

      expect(convertCron(input)).toEqual(output.join("\n"));
    });
  });

  describe("errors", () => {
    test("too big value", () => {
      const input = "0 1 5 1 7 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("negative value", () => {
      const input = "1 1 5 * -1 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("list without values", () => {
      const input = "1 5 5 * , /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("range out boundaries", () => {
      const input = "5 1 5 * 0-8 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("range with negative values", () => {
      const input = "5 1 * * -1-4 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("wrong range", () => {
      const input = "1 5 1 * 4-1 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with wrong range", () => {
      const input = "1 5 1 * 6-1/3 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with wrong boundaries in range", () => {
      const input = "5 3 5 * 1-7/2 /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("step value with empty value", () => {
      const input = "5 3 5 3 1/ /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });

    test("invalid symbol", () => {
      const input = "5 1 1 * + /usr/bin/find";

      expect(() => convertCron(input)).toThrow("Invalid format");
    });
  });
});
