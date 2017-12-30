import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';

export interface Props {
    task: string;
    completed?: boolean;
    updateTask: (task: string) => void;
    deleteTask: () => void;
    toggleTask: () => void;
}

@observer
class TodoItem extends React.Component<Props, object> {

    editInput: HTMLInputElement;
    @observable editing = false;

    render() {
        const liClassNames = classNames({
            completed: this.props.completed,
            editing: this.editing
        });

        return (
            <li className={liClassNames}>
                <div className="view">
                    <input
                        type="checkbox"
                        className="toggle"
                        onChange={this.props.toggleTask}
                        checked={this.props.completed}/>
                    <label onDoubleClick={this.beginEdit}>{this.props.task}</label>
                    <button className="destroy" onClick={this.props.deleteTask}/>
                </div>
                <input
                    type="text"
                    className="edit"
                    value={this.props.task}
                    ref={(input) => this.editInput = input as HTMLInputElement}
                    onChange={this.onChange}
                    onBlur={this.endEdit}
                    onKeyPress={(e) => { if (e.key === 'Enter') { this.endEdit(); } }}
                />
            </li>
        );
    }

    beginEdit = () => {
        this.editing = true;
        setTimeout(() => { // defer to after next render - cannot focus { display: none }
            this.editInput.focus();
            const text = this.editInput.value; // these 3 lines move the caret to the end
            this.editInput.value = '';
            this.editInput.value = text;
        }, 0);
    };

    onChange = (e: any) => {
        this.props.updateTask(e.target.value);
    };

    endEdit = () => {
        this.editing = false;
    }

}

export default TodoItem;