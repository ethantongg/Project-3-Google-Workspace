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
function generateSummary() {
  // This would call BudgetManager.gs functions
  DocumentApp.getUi().alert('Summary generated. Check document');
}

