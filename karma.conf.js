const webpackConfig = require('./webpack.config.dev.js');

module.exports = function (config) {
  config.set({
    // Paths
    basePath: '',
    exclude: [],
    files: [
      { pattern: 'test/**/*.spec.ts', watch: false },
    ],

    // Module processing
    preprocessors: {
      // Process all *test* modules with webpack 
      // (it will handle dependencies)
      'test/**/*.spec.ts': ['webpack', 'sourcemap'],
    },

    /* OTHER CONFIGURATION */

    // Webpack config
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only',
    },
    // Targets
    browsers: ['PhantomJS'],
    // Reporters
    reporters: ['dots'],
    logLevel: config.LOG_INFO,
    colors: true,
    // Test framework configuration
    frameworks: ['jasmine'],
    // Runner configuration
    port: 9876,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity,
  });
};