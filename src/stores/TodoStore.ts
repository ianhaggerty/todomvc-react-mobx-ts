import { action, computed, observable } from 'mobx';
import { Todo } from '../types/Todo';

class TodoStore {
    @observable todos: Todo[] = [];

    // getters
    @computed get completedTodos() {
        return this.todos.filter((todo) => todo.completed);
    }
    @computed get completedCount() {
        return this.todos.filter((todo) => todo.completed).length;
    }
    @computed get incompleteTodos() {
        return this.todos.filter((todo) => !todo.completed);
    }
    @computed get incompleteCount() {
        return this.todos.filter((todo) => !todo.completed).length;
    }
    @computed get count() {
        return this.todos.length;
    }

    // actions
    @action addTodo(task: string) {
        this.todos.push(observable(new Todo(task)));
    }
    @action removeTodo(id: number) {
        this.todos = this.todos.filter((t) => t.id !== id);
    }
    @action updateTask(id: number, task: string) {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) { todo.task = task; }
    }
    @action toggleTodo(id: number) {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) { todo.completed = !todo.completed; }
    }
    @action completeAllTodos() {
        this.todos.forEach((todo) => todo.completed = true);
    }
    @action uncompleteAllTodos() {
        this.todos.forEach((todo) => todo.completed = false);
    }

}

export default TodoStore;