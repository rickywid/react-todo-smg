import React from 'react';

export default class Task  extends React.Component {
	constructor(props) {
		super(props);

		this.handleEdit = this.handleEdit.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleInput = this.handleInput.bind(this);		
		this.renderTask = this.renderTask.bind(this);
		this.renderTaskEdit = this.renderTaskEdit.bind(this);
		this.removeClass = this.removeClass.bind(this);

		this.state = {
			isEditing: false,
			input: this.props.name,
			removeClass: false
		};
	}

	removeClass() {
		this.setState({ removeClass: true });
	}

	handleSave(e) {
		e.preventDefault();
		this.props.save(this.props.id, this.state.input);
		this.setState({ isEditing: !this.state.isEditing });
	}

	handleEdit() {
		this.setState({ isEditing: !this.state.isEditing });
	}

	handleInput(e) {
		this.setState({ input: e.target.value });
	}

	renderTask() {	
		let taskCompleted = this.props.isComplete ? 'completed' : 'incomplete';		

		return (
			<td>
				<span className={`task-name ${taskCompleted}`} onClick={() => this.props.handleCompleted(this.props.id)}><i className="fa fa-calendar" aria-hidden="true" />{this.props.name}</span>
				<button className="btn btn-warning" onClick={this.handleEdit}>Edit</button>
				<button className="btn btn-danger" onClick={() => {this.props.remove(this.props.id); this.removeClass()}}>Remove</button>
			</td>
		)
	}

	renderTaskEdit() {
		return (
			<td>
				<form onSubmit={this.handleSave}>
					<input type="text" className="form-control form-edit" value={this.state.input} onChange={this.handleInput} />

					<input type="submit" className="btn btn-success btn-edit" value="Save" />
					<button className="btn btn-default btn-edit" onClick={this.state.handleEdit}>Cancel</button>
				</form>
			</td>
		)
	}

	render() {
		//const toggleClass = this.state.removeClass ? "flipOutX" : "flipInX";
		console.log(this.state.removeClass);
		return (
			<tr className={`animated flipInX`}>
				{!this.state.isEditing ?  this.renderTask() : this.renderTaskEdit() }
			</tr>
		);
	}
};