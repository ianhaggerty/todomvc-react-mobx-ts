import * as React from 'react';
import { observer } from 'mobx-react';
import TodoItem from '../../components/TodoItem';
import TodoStore from '../../stores/TodoStore';
import Filter from '../../types/Filter';

export interface Props {
    todoStore: TodoStore;
    activeFilter: Filter;
}

@observer
class TodoList extends React.Component<Props, object> {

    render() {
        const store = this.props.todoStore;
        let todos;
        switch(this.props.activeFilter) {
            case Filter.Active:
                todos = store.incompleteTodos;
                break;
            case Filter.Completed:
                todos = store.completedTodos;
                break;
            default:
                todos = store.todos;
        }

        return (
            <section className="main">
                <input
                    type="checkbox"
                    className="toggle-all"
                    id="toggle-all"
                    checked={store.completedCount === store.count}
                    onChange={this.toggleAll}/>
                <label htmlFor="toggle-all">Mark all as complete</label>

                <ul className="todo-list">
                    {todos.map((todo) =>
                        <TodoItem
                            key={todo.id}
                            task={todo.task}
                            completed={todo.completed}
                            updateTask={(task) => store.updateTask(todo.id, task)}
                            deleteTask={() => store.removeTodo(todo.id)}
                            toggleTask={() => store.toggleTodo(todo.id)}
                        />
                    )}
                </ul>
            </section>
        );
    }

    toggleAll = () => {
        const store = this.props.todoStore;
        if (store.completedCount === store.count) {
            store.uncompleteAllTodos();
        } else {
            store.completeAllTodos();
        }
    }
}

export default TodoList;