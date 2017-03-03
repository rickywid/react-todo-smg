import React from 'react';
import Task from './task';

export default class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: 1,
			input: '',
			isEditing: false,
			tasks: [],
			incompleteTasks: []
		};

		this.handleCompleted = this.handleCompleted.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleEdit = this.handleEdit.bind(this);		
		this.handleSave = this.handleSave.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.renderTasks = this.renderTasks.bind(this);
		this.updateIncompleteTasks = this.updateIncompleteTasks.bind(this);
	}

	handleCompleted(id) {
		let array = this.state.tasks.map(item => {
			if (item.id === id) {
				item.completed = !item.completed;
			}
			return item;
		});

		this.setState({ tasks: array });

		let incompleteTasks = this.state.tasks.filter(item => item.completed === false );
		this.setState({ incompleteTasks });
	}

	handleSubmit(e) {
		e.preventDefault();
		
		this.setState({ tasks: this.state.tasks.concat([{ id: this.state.id, name: `${this.state.input}`, completed: false }]) });
		this.setState({ id: this.state.id + 1 });
		this.setState({ input: '' });
	}

	handleEdit(isEdit) {
		this.setState({ isEditing: isEdit });
	}

	handleRemove(id) {
		setTimeout(()=> {
			const arr = this.state.tasks.filter(item => item.id !== id);
			this.setState({ tasks: arr });
		},1000);
	}

	handleSave(id, input) {
		const array = this.state.tasks.map(task => {
			return Object.assign({}, task);
		});

		array.filter(item => item.id === id)
		.forEach(item => item.name = input);

		this.setState({ tasks: array });
	}

	handleInput(e) {
		this.setState({ input: e.target.value });
	}

	updateIncompleteTasks(item) {
		let arr = item.filter(x => x.completed === false);

		return arr.length;
	}

	renderTasks(task, i) {
		return <Task 	key={i} 
						id={task.id} 
						isComplete={task.completed} 
						name={task.name} 
						remove={this.handleRemove} 
						save={this.handleSave} 		
						handleCompleted={this.handleCompleted}	
				/>;
	}

	render() {
		return (
			<div>
				<div className="col-lg-8 col-lg-offset-2">
					<h1>A React To Do List</h1>

					<form onSubmit={this.handleSubmit}>
						<input type="text" className="form-control form-todo" value={this.state.input} placeholder="add new task..." onChange={this.handleInput} />
					</form>
					<table className="table">
						<thead>
							<tr>
								<th>Task</th>
								<th>&nbsp;</th>
							</tr>
						</thead>	
						<tbody>				
							{this.state.tasks.map(this.renderTasks)}
						</tbody>
					</table>
					<hr/>
					<div className="col-lg-6">
						<strong>Incomplete Tasks:</strong> { this.state.tasks.length ? this.updateIncompleteTasks(this.state.tasks) : 0 }
					</div>
					<div className="col-lg-6">
						<strong><a href="http://rickywid.github.io/portfolio">portfolio</a></strong>
					</div>
				</div>
			</div>
		);
	}
}
