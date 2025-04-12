function Open() {
  DocumentApp.getUi()
  .createAddonMenu()
  .addItem('Open Budget Planner',  'showSidebar')
  .addItem('Quick Add Expense', 'showExpenseDialog')
  .addItem('Quick Add Income', 'showIncomeDialog')
  .addItem('Generate Summary', 'generateSummary')
  .addItem('Vizualize Budget', 'showChartDialog')
  .addToUi();
}

function onInstall() {
  Open();
}


//Show main sidebar
function showSidebar() {
  const ui = HtmlService.createHtmlOutputFromFile('Sidebar')
  .setTitle('Budget Planner')
  .setWidth(350);
  DocumentApp.getUi().showSidebar(ui);
}

//show expense dialog
function showExpenseDialog() {
  const html = HtmlService.createHtmlOutputFromFile('ExpenseDialog')
    .setWidth(400)
    .setHeight(450);
  DocumentApp.getUi().showModalDialog(html, 'Add New Expense');
}


//show income dialog
function showIncomeDialog() {
  const html = HtmlService.createHtmlOutputFromFile('IncomeDialog')
    .setWidth(400)
    .setHeight(400);
  DocumentApp.getUi().showModalDialog(html, 'Add New Income');
}

//show chart dialog
function showChartDialog() {
  const html = HtmlService.createHtmlOutputFromFile('ChartDialog')
    .setWidth(600)
    .setHeight(500);
  DocumentApp.getUi().showModalDialog(html, 'Budget Visualization');
}

//generate summary 
function generateSummary() {/**
 * Budget Planner Add-on for Google Docs
 * UI Shell with NO actual functionality - just UI navigation
 */

function onOpen() {
  DocumentApp.getUi()
  .createAddonMenu()
  .addItem('Open Budget Planner',  'showSidebar')
  .addItem('Quick Add Expense', 'showExpenseDialog')
  .addItem('Quick Add Income', 'showIncomeDialog')
  .addItem('Generate Summary', 'generateSummary')
  .addItem('Visualize Budget', 'showChartDialog')
  .addToUi();
}

function onInstall() {
  onOpen();
}

//Show main sidebar
function showSidebar() {
  // Just show a dialog indicating what would happen
  DocumentApp.getUi().alert("PLACEHOLDER: This would open a sidebar with the budget planner interface.");
}

//show expense dialog
function showExpenseDialog() {
  // Just show a dialog indicating what would happen
  DocumentApp.getUi().alert("PLACEHOLDER: This would open a dialog to add a new expense.");
}

//show income dialog
function showIncomeDialog() {
  // Just show a dialog indicating what would happen
  DocumentApp.getUi().alert("PLACEHOLDER: This would open a dialog to add a new income.");
}

//show chart dialog
function showChartDialog() {
  // Just show a dialog indicating what would happen
  DocumentApp.getUi().alert("PLACEHOLDER: This would open a dialog showing budget visualizations.");
}

//generate summary 
function generateSummary() {
  // Just show a dialog indicating what would happen
  DocumentApp.getUi().alert("PLACEHOLDER: This would generate a summary of the budget and insert it into the document.");
}

// Other placeholder functions that would be called from the UI

function addExpense() {
  DocumentApp.getUi().alert("PLACEHOLDER: This would add an expense to the budget data.");
}

function addIncome() {
  DocumentApp.getUi().alert("PLACEHOLDER: This would add income to the budget data.");
}

function updateCategory() {
  DocumentApp.getUi().alert("PLACEHOLDER: This would update a budget category.");
}

function generateReport() {
  DocumentApp.getUi().alert("PLACEHOLDER: This would generate a detailed budget report.");
}

function exportData() {
  DocumentApp.getUi().alert("PLACEHOLDER: This would export budget data.");
}

function importData() {
  DocumentApp.getUi().alert("PLACEHOLDER: This would import budget data.");
}

function saveSettings() {
  DocumentApp.getUi().alert("PLACEHOLDER: This would save budget settings.");
}


// Function to show alerts from HTML UI components if they're implemented later
function showAlert(message) {
  DocumentApp.getUi().alert(message);
}

}