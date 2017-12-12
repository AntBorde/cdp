exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  suites: {
        ex_1: './tests/e2e/registerSpec.js',
        ex_2: './tests/e2e/createProjectSpec.js',
        ex_3: './tests/e2e/issueSpec.js',
      }
}
