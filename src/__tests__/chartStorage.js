/**
 * @jest-environment jsdom
 */

require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default
const chartStorage = require("../lib/chartStorage")

const fs = require("fs")

test("Test that a chart is saved", function(){
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
    testID = 0;
    chartStorage.saveChart(testChart, testID)
    
    const chartsJson = window.localStorage.getItem("savedCharts") || "[]"
    const charts = JSON.parse(chartsJson)
    const savedTitle = charts[testID].title

    expect(savedTitle).toBe(testChart.title)
})