module.exports = {
    preset: "jest-playwright-preset",
    reporters: ['default',  ['jest-sonar', {
        outputDirectory: 'reports',
        outputName: 'test-report.xml',
        reportedFilePath: 'absolute'
    }]],
}
