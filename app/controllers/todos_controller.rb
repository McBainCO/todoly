class TodosController < ApplicationController

  def index
    @todos = Todo.all

    respond_to do |format|
      format.html
      format.json {render :json => @todos}
    end
  end

  def create
    @todos = Todo.new(name: params["name"], done: false)
    @todos.save
  end

  def destroy
    @todos = Todo.find(params["id"])
    @todos.destroy
  end

  def update
    @todos = Todo.find(params["id"])
    @todos.done = params["done"]
    @todos.save
  end
end