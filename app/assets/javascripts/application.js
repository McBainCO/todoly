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

$(document).ready(function() {
  var flashTimer;

  $('#still-todo').append('<h2>Todo!</h2><div id="flash"></div><table id="todo-table"></table><hr>');
  $('#done-todo').append('<h2>Completed!</h2><table id="done-table"></table>');

  $(document).on("click", "#flash", function(){
    $(this).empty().hide()
  });
  $(document).on("click", "#todoClose", function(){
    $(this).empty().hide()
  });


});
