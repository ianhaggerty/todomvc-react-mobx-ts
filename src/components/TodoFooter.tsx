import * as React from 'react';
import Filter from '../types/Filter';
import EnumUtil from '../utils/EnumUtil';

export interface Props {
    uncompleted: number,
    activeFilter: Filter,
    setFilter: (filter: Filter) => void
}

class TodoFooter extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const filterClassName = (filterName: string) =>
            Filter[this.props.activeFilter] === filterName ? 'selected' : '';

        return (
            <footer className="footer">
                <span className="todo-count">
                    <strong>{this.props.uncompleted}</strong> items left
                </span>
                <ul className="filters">
                    {EnumUtil.getNames(Filter).map((filterName) =>
                        <li>
                            <a
                                className={filterClassName(filterName)}
                                onClick={() => this.props.setFilter(Filter[filterName])}
                            >{filterName}</a>
                        </li>
                    )}
                </ul>
            </footer>
        );
    }

}

export default TodoFooter;