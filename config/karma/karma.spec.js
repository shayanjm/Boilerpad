// Karma spec test configuration
files = [
  JASMINE,
  JASMINE_ADAPTER,
  REQUIRE,
  REQUIRE_ADAPTER,

   {pattern:'test/spec/**/*.js', included:false }, // Tests

  'test/require.runner.js' //require test runner configuration
];
