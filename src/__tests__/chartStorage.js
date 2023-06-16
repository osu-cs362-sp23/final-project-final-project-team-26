/**
 * @jest-environment jsdom
 */

require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default
const chartStorage = require("../lib/chartStorage")

const fs = require("fs")
const { loadAllSavedCharts, loadCurrentChartData } = require("../lib/chartStorage")

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

test("Test that load all saved charts loads saved charts", function(){
    testChart1 = {
        type: "line",
        data: [
            { x: 3, y: 2 },
            { x: 1, y: 4 },
        ],
        xLabel: "x-axis",
        yLabel: "y-axis",
        title: "test chart1",
        color: "#ff4500"
    }
    testChart2 = {
        type: "bar",
        data: [
            { x: 2, y: 2 },
            { x: 1, y: 4 },
        ],
        xLabel: "x-axis",
        yLabel: "y-axis",
        title: "test chart2",
        color: "#ff4500"
    }
    chartStorage.saveChart(testChart1)
    chartStorage.saveChart(testChart2)
    
    const charts = loadAllSavedCharts()

    expect(charts[1].title).toBe(testChart1.title)
    expect(charts[2].title).toBe(testChart2.title)
})

test("Test that load a saved chart loads specific chart", function(){
    
    const chart = chartStorage.loadSavedChart(1)

    expect(chart.title).toBe("test chart1")
})

test("Test that updateCurrentChartData updates the current charts data", function(){
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

    chartStorage.updateCurrentChartData(testChart)
    const currentChartData = window.localStorage.getItem("currentChartData") || "{}"
    const currentChart = JSON.parse(currentChartData)

    expect(currentChart.title).toBe(testChart.title)
})

test("Test that loadCurrentChartData loads the current charts data", function(){
    
    currentChart = loadCurrentChartData()

    expect(currentChart.title).toBe(testChart.title)
})