const sortPoints = require("../lib/sortPoints.js");

test("Test to make sure sortPoints returns the lower x value first even if entered second", function(){
    points = [
        { x: 3, y: 2 },
        { x: 1, y: 4 },
    ]
    expect(sortPoints(points)[0].x).toBe(1)
    expect(sortPoints(points)[0].y).toBe(4)
    expect(sortPoints(points)[1].x).toBe(3)
    expect(sortPoints(points)[1].y).toBe(2)
})

test("Test to make sure sortPoints properly sorts a large array of values", function(){
    points = [
        { x: 4, y: 1 },
        { x: 0, y: 4 },
        { x: 2, y: 6 },
        { x: 7, y: 2},
        { x: 5, y: 3}
    ]
    expect(sortPoints(points)[0].x).toBe(0)
    expect(sortPoints(points)[0].y).toBe(4)
    expect(sortPoints(points)[1].x).toBe(2)
    expect(sortPoints(points)[1].y).toBe(6)
    expect(sortPoints(points)[2].x).toBe(4)
    expect(sortPoints(points)[2].y).toBe(1)
    expect(sortPoints(points)[3].x).toBe(5)
    expect(sortPoints(points)[3].y).toBe(3)
    expect(sortPoints(points)[4].x).toBe(7)
    expect(sortPoints(points)[4].y).toBe(2)
})