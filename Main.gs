function onOpen() {
  DocumentApp.getUi()
  .createAddonMenu()
  .addItem('Open Budget Planner', 'showSidebar')
  .addItem('Quick Add Expense', 'showExpenseDialog')
  .addItem('Quick Add Income', 'showIncomeDialog')
  .addItem('Generate Summary', 'generateSummary')
  .addItem('Visualize Budget', 'showChartDialog')
  .addToUi();
}

function onInstall() {
  onOpen();
  initializeUserProperties();
}

function showSidebar() {
  const ui = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Budget Planner')
    .setWidth(350);
  DocumentApp.getUi().showSidebar(ui);
}

function showExpenseDialog() {
  const html = HtmlService.createHtmlOutputFromFile('ExpenseDialog')
    .setWidth(400)
    .setHeight(450);
  DocumentApp.getUi().showModalDialog(html, 'Add New Expense');
}

function showIncomeDialog() {
  const html = HtmlService.createHtmlOutputFromFile('IncomeDialog')
    .setWidth(400)
    .setHeight(400);
  DocumentApp.getUi().showModalDialog(html, 'Add New Income');
}

function showChartDialog() {
  const html = HtmlService.createHtmlOutputFromFile('ChartDialog')
    .setWidth(600)
    .setHeight(500);
  DocumentApp.getUi().showModalDialog(html, 'Budget Visualization');
}

function initializeUserProperties() {
  const userProperties = PropertiesService.getUserProperties();
  
  const defaultData = {
    expenses: [],
    income: [],
    expenseCategories: [
      'Housing', 'Food', 'Transportation', 'Utilities', 
      'Entertainment', 'Healthcare', 'Education', 'Other'
    ],
    incomeCategories: [
      'Salary', 'Freelance', 'Investment', 'Gift', 'Other'
    ]
  };
  
  if (!userProperties.getProperty('budgetData')) {
    userProperties.setProperty('budgetData', JSON.stringify(defaultData));
  }
}

function getBudgetData() {
  const userProperties = PropertiesService.getUserProperties();
  const data = userProperties.getProperty('budgetData');
  
  return data ? JSON.parse(data) : initializeUserProperties();
}

function saveBudgetData(data) {
  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('budgetData', JSON.stringify(data));
}

function addExpense(category, amount, date, description) {
  if (!category || !amount || !date) {
    return { success: false, message: 'Category, amount, and date are required.' };
  }
  
  const budgetData = getBudgetData();
  
  budgetData.expenses.push({
    id: new Date().getTime(),
    category: category,
    amount: parseFloat(amount),
    date: date,
    description: description || '',
    createdAt: new Date().toISOString()
  });
  
  saveBudgetData(budgetData);
  
  return { success: true, message: 'Expense added successfully.' };
}

function addIncome(category, amount, date, description) {
  if (!category || !amount || !date) {
    return { success: false, message: 'Category, amount, and date are required.' };
  }
  
  const budgetData = getBudgetData();
  
  budgetData.income.push({
    id: new Date().getTime(),
    category: category,
    amount: parseFloat(amount),
    date: date,
    description: description || '',
    createdAt: new Date().toISOString()
  });
  
  saveBudgetData(budgetData);
  
  return { success: true, message: 'Income added successfully.' };
}

function getBudgetSummary() {
  const budgetData = getBudgetData();
  
  const totalIncome = budgetData.income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = budgetData.expenses.reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;
  
  const expensesByCategory = {};
  budgetData.expenses.forEach(expense => {
    if (!expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] = 0;
    }
    expensesByCategory[expense.category] += expense.amount;
  });
  
  const incomeByCategory = {};
  budgetData.income.forEach(income => {
    if (!incomeByCategory[income.category]) {
      incomeByCategory[income.category] = 0;
    }
    incomeByCategory[income.category] += income.amount;
  });
  
  const monthlyData = getMonthlyData(budgetData);
  
  return {
    totalIncome: totalIncome,
    totalExpenses: totalExpenses,
    balance: balance,
    expensesByCategory: expensesByCategory,
    incomeByCategory: incomeByCategory,
    monthlyData: monthlyData
  };
}

function getMonthlyData(budgetData) {
  const monthlyData = {};
  
  budgetData.expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { expenses: 0, income: 0 };
    }
    
    monthlyData[monthYear].expenses += expense.amount;
  });
  
  budgetData.income.forEach(income => {
    const date = new Date(income.date);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
    
    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = { expenses: 0, income: 0 };
    }
    
    monthlyData[monthYear].income += income.amount;
  });
  
  return monthlyData;
}

function getExpenseCategories() {
  return getBudgetData().expenseCategories;
}

function getIncomeCategories() {
  return getBudgetData().incomeCategories;
}

function addExpenseCategory(category) {
  if (!category) return { success: false, message: 'Category name is required.' };
  
  const budgetData = getBudgetData();
  
  if (budgetData.expenseCategories.includes(category)) {
    return { success: false, message: 'Category already exists.' };
  }
  
  budgetData.expenseCategories.push(category);
  saveBudgetData(budgetData);
  
  return { success: true, message: 'Category added successfully.' };
}

function addIncomeCategory(category) {
  if (!category) return { success: false, message: 'Category name is required.' };
  
  const budgetData = getBudgetData();
  
  if (budgetData.incomeCategories.includes(category)) {
    return { success: false, message: 'Category already exists.' };
  }
  
  budgetData.incomeCategories.push(category);
  saveBudgetData(budgetData);
  
  return { success: true, message: 'Category added successfully.' };
}

function generateSummary() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  
  const summary = getBudgetSummary();
  
  let summaryText = "BUDGET SUMMARY\n\n";
  summaryText += `Total Income: $${summary.totalIncome.toFixed(2)}\n`;
  summaryText += `Total Expenses: $${summary.totalExpenses.toFixed(2)}\n`;
  summaryText += `Balance: $${summary.balance.toFixed(2)}\n\n`;
  
  summaryText += "EXPENSES BY CATEGORY:\n";
  Object.keys(summary.expensesByCategory).forEach(category => {
    summaryText += `${category}: $${summary.expensesByCategory[category].toFixed(2)}\n`;
  });
  
  summaryText += "\nINCOME BY CATEGORY:\n";
  Object.keys(summary.incomeByCategory).forEach(category => {
    summaryText += `${category}: $${summary.incomeByCategory[category].toFixed(2)}\n`;
  });
  
  const cursor = doc.getCursor();
  if (cursor) {
    const element = cursor.getElement();
    element.asText().appendText("\n\n" + summaryText);
  } else {
    body.appendParagraph(summaryText);
  }
  
  return { success: true, message: 'Budget summary added to document.' };
}

function showAlert(message) {
  DocumentApp.getUi().alert(message);
}

function showCustomDialog(htmlOutput, title) {
  DocumentApp.getUi().showModalDialog(htmlOutput, title);
}

function showImportDialog() {
  const htmlOutput = HtmlService.createHtmlOutput(
    '<div style="padding: 15px;">' +
    '<p>Paste your previously exported budget data JSON below:</p>' +
    '<textarea id="importData" rows="10" style="width: 100%; margin-bottom: 15px;"></textarea>' +
    '<div style="display: flex; justify-content: space-between;">' +
    '<button onclick="google.script.host.close()" style="padding: 8px 15px;">Cancel</button>' +
    '<button onclick="importDataFromTextarea()" style="padding: 8px 15px; background-color: #4285f4; color: white;">Import</button>' +
    '</div>' +
    '<script>' +
    'function importDataFromTextarea() {' +
    '  const jsonData = document.getElementById("importData").value;' +
    '  if (!jsonData) {' +
    '    google.script.run.showAlert("Please paste data to import.");' +
    '    return;' +
    '  }' +
    '  google.script.run.withSuccessHandler(function(result) {' +
    '    google.script.run.showAlert(result.message);' +
    '    if (result.success) {' +
    '      google.script.host.close();' +
    '      google.script.run.refreshSidebar();' +
    '    }' +
    '  }).importBudgetData(jsonData);' +
    '}' +
    '</script>' +
    '</div>'
  )
  .setWidth(400)
  .setHeight(300);
  
  DocumentApp.getUi().showModalDialog(htmlOutput, 'Import Budget Data');
}

function getChartData(chartType) {
  const summary = getBudgetSummary();
  
  switch (chartType) {
    case 'expense-category':
      return {
        labels: Object.keys(summary.expensesByCategory),
        data: Object.values(summary.expensesByCategory)
      };
      
    case 'income-category':
      return {
        labels: Object.keys(summary.incomeByCategory),
        data: Object.values(summary.incomeByCategory)
      };
      
    case 'monthly-comparison':
      const months = Object.keys(summary.monthlyData).sort();
      return {
        labels: months,
        incomeData: months.map(month => summary.monthlyData[month].income),
        expenseData: months.map(month => summary.monthlyData[month].expenses)
      };
      
    case 'savings-trend':
      const sortedMonths = Object.keys(summary.monthlyData).sort();
      let cumulativeSavings = 0;
      const savingsData = sortedMonths.map(month => {
        const monthData = summary.monthlyData[month];
        const monthlySavings = monthData.income - monthData.expenses;
        cumulativeSavings += monthlySavings;
        return cumulativeSavings;
      });
      
      return {
        labels: sortedMonths,
        data: savingsData
      };
      
    default:
      return { error: 'Invalid chart type' };
  }
}

function exportBudgetData() {
  return JSON.stringify(getBudgetData());
}

function importBudgetData(jsonData) {
  try {
    const data = JSON.parse(jsonData);
    
    if (!data.expenses || !data.income || !data.expenseCategories || !data.incomeCategories) {
      return { success: false, message: 'Invalid data format.' };
    }
    
    saveBudgetData(data);
    return { success: true, message: 'Data imported successfully.' };
  } catch (e) {
    return { success: false, message: 'Error importing data: ' + e.message };
  }
}