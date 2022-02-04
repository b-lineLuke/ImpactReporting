function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Impact Report Functions')
      .addItem('Impact Report for Client', 'impactReport')
      .addToUi();
}
