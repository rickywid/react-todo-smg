import React from 'react';

const App = () => {
	return (
		<form action="" className="form">

			<div className="form-row">
				<label htmlFor="name">name</label>
				<input id="name" type="text" />
			</div>
			<div className="form-row">
				<label htmlFor="password">password</label>
				<input id="password" type="text" />
			</div>
		</form>
	);
};

export default App;
