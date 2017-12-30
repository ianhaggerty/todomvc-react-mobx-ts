import * as React from 'react';

export interface Props {
    createTask: (task: string) => void
}

class TodoHeader extends React.Component<Props> {

    editInput: HTMLInputElement;

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input
                    type="text"
                    className="new-todo"
                    placeholder="What needs to be done?"
                    onKeyPress={(e) => { if (e.key === 'Enter') { this.newTask(); }}}
                    ref={(input) => this.editInput = input as HTMLInputElement}/>
            </header>
        );
    }

    newTask = () => {
        this.props.createTask(this.editInput.value);
        this.editInput.value = '';
    };

}

export default TodoHeader;