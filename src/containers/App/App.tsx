import * as React from 'react';
import TodoList from '../TodoList/TodoList';
import TodoStore from '../../stores/TodoStore';
import DevTools from 'mobx-react-devtools';
import TodoHeader from '../../components/TodoHeader';
import { autorun, observable } from 'mobx';
import TodoFooter from '../../components/TodoFooter';
import Filter from '../../types/Filter';
import { observer } from 'mobx-react';

// todos state is owned here
const store = new TodoStore();

@observer
class App extends React.Component {

    @observable activeFilter: Filter = Filter.All;

    render() {
        return (
            <section className="todoapp">
                <DevTools/>
                <TodoHeader createTask={(t) => store.addTodo(t)}/>
                <TodoList todoStore={store} activeFilter={this.activeFilter}/>
                <TodoFooter
                    uncompleted={store.count - store.completedCount}
                    activeFilter={this.activeFilter}
                    setFilter={(f: Filter) => {this.activeFilter = f;}}
                />
            </section>
        );
    }
}

export default App;

autorun(() => {
    console.log(store.todos.map((todo) => `${todo.id} :: ${todo.task}`).join('\n') + '\n----------');
});