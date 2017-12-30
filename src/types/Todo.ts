import { observable } from 'mobx';

export class Todo {

    @observable public task: string;
    @observable public completed: boolean;

    constructor(
        task: string,
        completed: boolean = false,
        public id: number = Math.random()) {
        this.task = task;
        this.completed = completed;
    }
}