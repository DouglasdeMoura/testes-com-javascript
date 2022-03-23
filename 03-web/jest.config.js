module.exports = {
  moduleDirectories: ['node_modules', '<rootDir>'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', '<rootDir>/.jest/setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg)$':
      '<rootDir>/.jest/mock/fileMock.js',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '\\.css$': 'identity-obj-proxy',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
}
