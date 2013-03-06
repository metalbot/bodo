function addColumn(){
  $('.col:first').clone().appendTo('.bodo');
  $('.container').shapeshift(); 
}

function removeColumn(){
  $('.col:last').remove();
  $('.container').shapeshift();
}

function addCard(){
  $('.object:first').clone().appendTo('.col:first');
  $('.container').shapeshift();
}
