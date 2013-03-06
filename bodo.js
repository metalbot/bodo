function addColumn(){
  $('.col:first').clone().appendTo('.bodo');
  $('.container').shapeshift(); 
}

function removeColumn(){
  if(('.col').length > 1){
    $('.col:last').remove();
    $('.container').shapeshift();
  }
}

function addCard(){
  $('.object:first').clone().appendTo('.container:first');
  $('.container').shapeshift();
}
