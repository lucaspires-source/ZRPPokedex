const formatNumbers = require('./formatNumbers');

describe('formatNumbers', () => {
  it("should format the pokemon id as a string in a specific way depeding on it's value", () => {
    // Test cases
    const testCases = [
      { input: 1, expected: '001' },
      { input: 20, expected: '020' },
      { input: 100, expected: '100' },
      { input: 9876543210, expected: '9876543210' },
    ];

    // Run the test cases
    testCases.forEach(({ input, expected }) => {
      const result = formatNumbers(input);
      expect(result).toEqual(expected);
    });
  });
});