module.exports = {
    preset: "jest-playwright-preset",
    reporters: ['default',  ['jest-sonar', {
        outputDirectory: 'reports',
        outputName: 'test-report.xml',
        reportedFilePath: 'absolute'
    }]],
}

/*   "jestSonar": {
    "reportPath": "reports",
    "reportFile": "test-report.xml",
    "indent": 4
  } */