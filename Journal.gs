function onOpen() {
  var doc = DocumentApp.getActiveDocument();
  var body = DocumentApp.getActiveDocument().getBody();
  var text = body.editAsText();
  
  var curDate = Utilities.formatDate(new Date(), "GMT+1", "MM/dd/yyyy");
  
  //check if the current date is already present in the doc
  var isSameDay = body.findText(curDate);
  
  //if there is no entry for this day, automatically insert 
  //the date in large font and underlined, followed by
  //reverting the styling to normal.
  if (isSameDay==null) {
    var style = {};
    style[DocumentApp.Attribute.FONT_FAMILY] = 'Arial';
    style[DocumentApp.Attribute.FONT_SIZE] = 18;
    style[DocumentApp.Attribute.UNDERLINE] = true;
    var par = body.appendParagraph('\n'+curDate);
    par.setAttributes(style);
    style[DocumentApp.Attribute.FONT_SIZE] = 11;
    style[DocumentApp.Attribute.UNDERLINE] = false;
    var par = body.appendParagraph('');
    par.setAttributes(style);
    var position = doc.newPosition(par, 0);
    doc.setCursor(position);
  }
  //if the doc already has the same date in it, simply put the
  //cursor at the end of the document.
  else {
    var numChildren = body.getNumChildren();
    var pos = doc.newPosition(body.getChild(numChildren - 1),0);
    doc.setCursor(pos);
  }
  
}
