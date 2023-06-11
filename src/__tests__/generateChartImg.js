/**
 * @jest-environment jsdom
 */

global.fetch = require('jest-fetch-mock');

require("whatwg-fetch")
require("@testing-library/jest-dom/extend-expect")
const domTesting = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default
const generateChartImg = require("../lib/generateChartImg")

const rest = require("msw").rest
const setupServer = require("msw/node").setupServer

const fs = require("fs")

const server = setupServer(
    rest.post(
        "https://quickchart.io/chart",
        function (req, res, ctx) {
            const imageData = fs.readFileSync("../resources/dog.png");
            return res(
            ctx.set('Content-Type', 'image/png'),
            ctx.body(imageData)
            );
        }
    )
);

beforeAll(function () {
    server.listen()
})

test("test generateChartImg function", async function () {

    // type = "line";
    // data = [
    //         { x: 3, y: 2 },
    //         { x: 1, y: 4 },
    // ];
    // xLabel ="x-axis";
    // yLabel = "y-axis"; 
    // title = "test chart";
    // color = "#ff4500";
    
    // imgURL = generateChartImg(type, data, xLabel, yLabel, title, color);

    // expect(imgURL).toBeDefined();
});

afterAll(function () {
    server.close()
})