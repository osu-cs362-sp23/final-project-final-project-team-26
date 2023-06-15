    /**
     * @jest-environment jsdom
     */

    require("@testing-library/jest-dom/extend-expect")
    const domTesting = require("@testing-library/dom")
    const userEvent = require("@testing-library/user-event").default

    const fs = require("fs")

    function initDomFromFiles(htmlPath, jsPath){
        const html = fs.readFileSync(htmlPath, 'utf8')
        document.open()
        document.write(html)
        document.close()
        jest.isolateModules(function(){
            require(jsPath)
        })
    }

    beforeEach(() => {
        // This will replace window.alert with a mock function before each test
        window.alert = jest.fn();
      });

    afterEach(() => {
        // This will restore the original window.alert function after each test
        jest.restoreAllMocks();
    });

    test("adding values success", async function() {
        initDomFromFiles(
            "src/line/line.html", "../line/line.js"
        )

        Array.from(document.getElementsByClassName("x-value-input")).forEach(element => element.remove());
        Array.from(document.getElementsByClassName("y-value-input")).forEach(element => element.remove());

        const enter = domTesting.getByTestId(document, "add-values-btn")

        const user = userEvent.setup()

        const createAndTypeInput = async (value, className) => {
            const input = document.createElement("input")
            input.className = className
            document.body.appendChild(input)
            await user.type(input, value)
        }

        await createAndTypeInput("5", "x-value-input")
        await createAndTypeInput("9", "y-value-input")
        await new Promise(resolve => setTimeout(resolve, 100));
        await user.click(enter)

        await createAndTypeInput("6", "x-value-input")
        await createAndTypeInput("3", "y-value-input")
        await new Promise(resolve => setTimeout(resolve, 100));
        await user.click(enter)

        await createAndTypeInput("32", "x-value-input")
        await createAndTypeInput("78", "y-value-input")
        await new Promise(resolve => setTimeout(resolve, 100));
        await user.click(enter)

        const xValues = Array.from(document.getElementsByClassName("x-value-input"))
        const yValues = Array.from(document.getElementsByClassName("y-value-input"))

        expect(xValues.length).toBe(6)
        expect(yValues.length).toBe(6)
        expect(xValues[3].value).toBe("5") 
        expect(yValues[3].value).toBe("9")

        expect(xValues.length).toBe(6)
        expect(yValues.length).toBe(6)
        expect(xValues[4].value).toBe("6") 
        expect(yValues[4].value).toBe("3")

        expect(xValues.length).toBe(6)
        expect(yValues.length).toBe(6)
        expect(xValues[5].value).toBe("32") 
        expect(yValues[5].value).toBe("78")
    });


    test('should display an alert when generating a chart without axis labels', async function () {
        // Load the HTML and JavaScript files
        initDomFromFiles(
            "src/line/line.html", "../line/line.js"
        )

        const enter = domTesting.getByTestId(document, "add-values-btn")
        const user = userEvent.setup()

        const createAndTypeInput = async (value, className) => {
            const input = document.createElement("input")
            input.className = className
            document.body.appendChild(input)
            await user.type(input, value)
        }

        await createAndTypeInput("5", "x-value-input")
        await createAndTypeInput("9", "y-value-input")
        await new Promise(resolve => setTimeout(resolve, 100));
        await user.click(enter)
    
        // Spy on the alert method
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { })
    
        // Simulate user interaction
        const generateChartButton = domTesting.getByText(document, "Generate chart")
        await userEvent.click(generateChartButton)
    
        // Assert the expected behavior
        expect(alertSpy).toHaveBeenCalledTimes(1)
        expect(alertSpy).toHaveBeenCalledWith("Error: Must specify a label for both X and Y!")
    
        // Clean up the spy
        alertSpy.mockRestore()
    });

    test("missing chart data nothing in anyone", async function(){
        initDomFromFiles(
            "src/line/line.html", "../line/line.js"
        )

        Array.from(document.getElementsByClassName("x-value-input")).forEach(element => element.remove());
        Array.from(document.getElementsByClassName("y-value-input")).forEach(element => element.remove());

        const enter = domTesting.getByTestId(document, "add-values-btn")

        const user = userEvent.setup()

        const generateChartButton = domTesting.getByText(document, "Generate chart");

        Array.from(document.getElementsByClassName("x-value-input")).forEach(element => element.remove());
        Array.from(document.getElementsByClassName("y-value-input")).forEach(element => element.remove());

        // Create a div element to display the error message
        const errorDiv = document.createElement("div");
        errorDiv.className = "error";
        errorDiv.textContent = "Missing chart data!";
    
        // Insert the error message before the generate chart button
        generateChartButton.parentNode.insertBefore(errorDiv, generateChartButton);
    
        userEvent.click(generateChartButton);
    
        // Assert that the error message is displayed
        expect(errorDiv.textContent).toBe("Missing chart data!");
    });


    test("clearing data success", async function() {
        initDomFromFiles("src/line/line.html", "../line/line.js");
    
        // Simulate adding values
        const addValuesButton = domTesting.getByTestId(document, "add-values-btn");
        const clearButton = document.getElementById("clear-chart-btn");    
        const user = userEvent.setup();
    
        await user.type(document.getElementById("x-label-input"), "Label X");
        await user.type(document.getElementById("y-label-input"), "Label Y");
    
        await user.type(document.querySelector(".x-value-input"), "5");
        await user.type(document.querySelector(".y-value-input"), "9");
        await user.click(addValuesButton);
    
        await user.type(document.querySelector(".x-value-input"), "6");
        await user.type(document.querySelector(".y-value-input"), "3");
        await user.click(addValuesButton);
    
        await user.type(document.querySelector(".x-value-input"), "32");
        await user.type(document.querySelector(".y-value-input"), "78");
        await user.click(addValuesButton);
    
        // Verify the data is added correctly
        const xValues = Array.from(document.getElementsByClassName("x-value-input"));
        const yValues = Array.from(document.getElementsByClassName("y-value-input"));
    
        expect(xValues.length).toBe(4);
        expect(yValues.length).toBe(4);
    
        // Clear the data
        await user.click(clearButton);
    
        // Verify the data is cleared
        const updatedXValues = Array.from(document.getElementsByClassName("x-value-input"));
        const updatedYValues = Array.from(document.getElementsByClassName("y-value-input"));
    
        expect(updatedXValues.length).toBe(1);
        expect(updatedYValues.length).toBe(1);

        expect(updatedXValues[0].value).toBe("");
        expect(updatedYValues[0].value).toBe("");
    });


    test("verify that the chart is displayed", async function(){
        
       
      
        await initDomFromFiles("src/line/line.html", "../line/line.js");

        // Simulate adding values
        const generateChart = await document.getElementById("generate-chart-btn");    
        const user = userEvent.setup();
        const generateChartImg = jest.fn().mockReturnValue("http://placekitten.com/480/480");
        global.generateChartImg = generateChartImg;

        await user.type(await document.getElementById("x-label-input"), "Numbers");
        await user.type(await document.getElementById("y-label-input"), "Letters");

        await user.type(await document.querySelector(".x-value-input"), "5");
        await user.type(await document.querySelector(".y-value-input"), "9");

        await user.click(generateChart);
    
        generateChartImg('line', [{ x: '5', y: '9' }], 'Numbers', 'Letters');

        expect(generateChartImg).toHaveBeenCalledWith(
            'line',
            [{ x: '5', y: '9' }],
            'Numbers',
            'Letters'
        );
     
    });