
require("whatwg-fetch")
const generateChartImg = require("../lib/generateChartImg")

const rest = require("msw").rest
const setupServer = require("msw/node").setupServer
const path = require("path")

const fs = require("node:fs")

const pathToImage = path.join(__dirname, '../resources/dog.png')
const imageData = fs.readFileSync(pathToImage)


const server = setupServer(
    rest.post(
        "https://quickchart.io/chart",
        function (req, res, ctx) {
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
    type = "line";
    data = [
            { x: 3, y: 2 },
            { x: 1, y: 4 },
    ];
    xLabel ="x-axis";
    yLabel = "y-axis"; 
    title = "test chart";
    color = "#ff4500";
    
    imgURL = generateChartImg(type, data, xLabel, yLabel, title, color);

    expect(imgURL).toBeTruthy();
});

afterAll(function () {
    server.close()
})