/**
 * @jest-environment jsdom
 */

require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default
const chartStorage = require("../lib/chartStorage")

const fs = require("fs")

function initDomFromFiles(htmlPath, jsPath) {
    const html = fs.readFileSync(htmlPath, 'utf8')
    document.open()
    document.write(html)
    document.close()
    jest.isolateModules(function () {
        require(jsPath)
    })
}
// function initDomFromFiles(jsPath) {
//     jest.isolateModules(function () {
//         require(jsPath)
//     })
// }

test("Test that a chart is saved", function(){
    initDomFromFiles(
        "../src/index.html",
        "../gallery/gallery.js"
    )
    // initDomFromFiles("../lib/chartStorage")
    testChart = {
        type: "line",
        data: [
            { x: 3, y: 2 },
            { x: 1, y: 4 },
        ],
        xLabel: "x-axis",
        yLabel: "y-axis",
        title: "test chart",
        color: "#ff4500"
    }
    testID = 1;
    chartStorage.saveChart(testChart, testID)

    const galleryTitle = domTesting.findByAltText(testChart.title)

    expect(galleryTitle).toBe(testChart.title)
})