// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function () {
  var todos = {
    "todo": [],
    "superCereal": 0
  };

  $('#todo-false').append('<h2>Todo!</h2><div id="flash"></div><table id="table-false"></table><hr>');
  $('#todo-true').append('<h2>Completed!</h2><table id="table-true"></table>');

  $(document).on("click", "#xButton", function () {
    $('#flash').empty().hide()
  });

  $(document).on("click", "#todoClose", function () {
    $(this).empty().hide()

  });

  var drawTable = function () {
    $('#table-false').empty();
    for (i = 0; i < todos.todo.length; i++) {
      $('#table-false').append('<tr>' +
        '<td id="'+ todos.todo[i].id +'">' + todos.todo[i].name + '</td><td id="todoDelete">X</td><td id="todoComplete">✓</td>'  +
        '</tr>')
    }
  };





  var addTodo = function () {
    var newTodo = $('#input').val();
    todos.todo.push(
      {
        "id": todos.superCereal,
        "name": newTodo,
        "done": false
      });
    todos.superCereal++;
    drawTable();
    flashMessage("Todo Created");

  };

  var flashMessage = function(text) {
    $('#flash').empty().append("<h2>"+ text +"</h2><div id='xButton'>X</div>").show();
    flashtimer = setTimeout(function(){
      $('#flash').empty().hide();
    }, 5000);
  };



  $('#create').on("click", function (e) {
    e.preventDefault();
    addTodo();
    $('#input').val("");
  });

  $(document).on('click', '#todoDelete', function(){
    var id = $(this).siblings().attr("id");
    for (i = 0; i < todos.todo.length; i++) {
      if(id == todos.todo[i].id){
        todos.todo.splice(i)
      }
    }
    drawTable();
    flashMessage("Todo Deleted");
  });

  drawTable();
});
