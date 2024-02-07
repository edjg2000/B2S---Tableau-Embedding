console.log("Is this thing on?");

// Create some constants and variables to use later
const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let Dashboard;
let listSheets;

let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;

// Logging information about the workbook
function logWorkbookInformation() {
  // Get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is: "${workbook.name}"`);

  // All tabs in the workbook
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}] is : "${element.name}"`);
  });

  // Active tabs in the workbook
  vizActiveSheet = workbook.activeSheet;

  console.log(`The active sheet is "${vizActiveSheet.name}"`);

  // Sheets in the dashboard
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    worksheetName = element.name;
    console.log(`The worksheet with index [${index}] is : "${worksheetName}"`);
  });

  // Assign sheets to variables for sheetnames at top of file
  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "TotalSales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

// Log this information once things have loaded
viz.addEventListener("firstinteractive", logWorkbookInformation);

// Define buttons function
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filter");
const undoButton = document.getElementById("undo");

// Button function
oregonWashingtonButton.addEventListener(
  "click",
  function oregonWashFunction(e) {
    //Log what is pressed
    console.log(e.target.value);

    //Apply the filter to all of the sheets
    saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
    totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
    salesByProduct.applyFilterAsync(
      "State",
      ["Washington", "Oregon"],
      "replace"
    );
    salesBySegment.applyFilterAsync(
      "State",
      ["Washington", "Oregon"],
      "replace"
    );
  }
);

clearFilterButton.addEventListener("click", function clearState(e) {
  console.log(e.target.value);
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
});

undoButton.addEventListener("click", function undo() {
  viz.undoAsync();
});

const filterRangeButton = document.getElementById("filter_range");

//Adding range filters for map - doesn't make sense to do this for the other charts.
filterRangeButton.addEventListener("click", function filterRangeFunction() {
  //Bringing in min and max values specified in our number inputs on the HTML page.
  // Have to convert these to floats to keep Tableau API happy
  const minValue = parseFloat(document.getElementById("minValue").value);
  const maxValue = parseFloat(document.getElementById("maxValue").value);
  console.log(minValue, maxValue);
  saleMap.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
});
