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

  var getTodos = function() {
    var todoJson = $.getJSON("/todos");
    todoJson.success(function(jsonResponse){
      drawTable(jsonResponse)
    });
  };

  $('#todo-false').append('<h2>Todo!</h2><div id="flash" class="clearfix"></div><table id="table-false"></table><hr>');
  $('#todo-true').append('<h2>Completed!</h2><table id="table-true"></table>');

  $(document).on("click", "#xButton", function () {
    $('#flash').empty().hide()
  });

  $(document).on("click", "#todoClose", function () {
    $(this).empty().hide()

  });

  var drawTable = function (todoArr) {
    $("#todo-true").hide();
    $('#table-false').empty();
    $('#table-true').empty();
      for (i = 0; i < todoArr.length; i++) {
        if(todoArr[i].done == false) {
        $('#table-false').append('<tr>' +
          '<td id="'+ todoArr[i].id +'">' + todoArr[i].name + '</td><td id="todoDelete">X</td><td id="todoComplete">✓</td>'  +
        '</tr>')}else{
          $('#table-true').append('<tr>' +
            '<td id="'+ todoArr[i].id +'">' + todoArr[i].name + '</td><td id="todoDelete">X</td><td id="todoUndo">U</td>'  +
            '</tr>');
          $('#todo-true').show();
        }
    }
  };
  var addTodo = function () {
    var newTodo = $('#input').val();
    $.ajax({
      type: "POST",
      url: "/todos",
      data: {name: newTodo}
    })
      .done(getTodos());
    flashMessage("Todo Created", "blue");
  };

  var flashMessage = function(text, color) {
    $('#flash').css("background-color",color).empty().append("<h2>"+ text +"</h2><div id='xButton' class='right'><h1>X</h1></div>").show();
//    flashtimer = setTimeout(function(){
//      $('#flash').empty().hide();
//    }, 5000);
  };

  $('#create').on("click", function (e) {
    e.preventDefault();
    addTodo();
    $('#input').val("");
  });

  $(document).on('click', '#todoDelete', function(){
    var id = $(this).siblings().attr("id");
    $.ajax({
      type: "DELETE",
      url: "/todos",
      data: {id: id}
    })
    .done(getTodos());
    flashMessage("Todo Deleted", "red");
  });

  $(document).on('click', '#todoComplete', function(){
    var id = $(this).siblings().attr("id");
    $.ajax({
      type: "PATCH",
      url: "/todos",
      data: {id: id, done: true}
    })
      .done(getTodos());
    flashMessage("Todo Completed", "green");
  });

  $(document).on('click', '#todoUndo', function(){
    var id = $(this).siblings().attr("id");
    $.ajax({
      type: "PATCH",
      url: "/todos",
      data: {id: id, done: false}
    })
      .done(getTodos());
    flashMessage("Still Todo", "blue");
  });

  getTodos()

});
