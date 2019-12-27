module.exports = {
  rootUrl: 'http://localhost:8080',
  screenshotsDir: './test/visual-images/',
  httpTimeout: 40000,
  sessionRequestTimeout: 120000,
  sessionsPerBrowser: 1,
  suitesPerSession: 50,
  retry: 0,
  tolerance: 10,
  antialiasingTolerance: 10,
  compositeImage: true,
  system: {
    plugins: {
      browserstack: { localIdentifier: process.env.IDENTIFIER },
      'html-reporter': { enabled: true },
    },
    parallelLimit: 3,
  },
  browsers: {
    ie11: {
      windowSize: '600x1024',
      desiredCapabilities: {
        os: 'Windows',
        os_version: '10',
        browserName: 'internet explorer',
        browser: 'IE',
        browser_version: '11',
        locationContextEnabled: false,
        'browserstack.selenium_version': '3.14.0',
        'browserstack.timezone': 'Europe/Helsinki',
        'browserstack.video': false,
      },
    },
    chrome: {
      windowSize: '600x1024',
      desiredCapabilities: {
        os: 'Windows',
        os_version: '10',
        browserName: 'chrome',
        browser_version: '72',
        locationContextEnabled: false,
        'browserstack.selenium_version': '3.14.0',
        'browserstack.timezone': 'Europe/Helsinki',
        'browserstack.video': false,
      },
    },
    safari11: {
      windowSize: '600x1024',
      desiredCapabilities: {
        os: 'OS X',
        os_version: 'High Sierra',
        browserName: 'safari',
        browser_version: '11.1',
        locationContextEnabled: false,
        'browserstack.selenium_version': '3.14.0',
        'browserstack.timezone': 'Europe/Helsinki',
        'browserstack.video': false,
      },
    },
    edge17: {
      windowSize: '600x1024',
      desiredCapabilities: {
        os: 'Windows',
        os_version: '10',
        browserName: 'edge',
        browser_version: '17.0',
        locationContextEnabled: false,
        'browserstack.selenium_version': '3.14.0',
        'browserstack.timezone': 'Europe/Helsinki',
        'browserstack.video': false,
      },
    },
    firefox: {
      windowSize: '600x1024',
      desiredCapabilities: {
        os: 'Windows',
        os_version: '10',
        browserName: 'firefox',
        browser_version: '47',
        locationContextEnabled: false,
        'browserstack.timezone': 'Europe/Helsinki',
        'browserstack.video': false,
      },
    },
  },
};
