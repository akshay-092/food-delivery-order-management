import '@testing-library/jest-dom';

// Clean up after each test to prevent timer leaks
afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
});

