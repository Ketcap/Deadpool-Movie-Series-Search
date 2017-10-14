import { h, Component } from 'preact';

import Snackbar from 'material-ui/Snackbar';

export default class SnackBar extends Component{
	state = {
		message: this.props.message,
		open: false
	}

	componentDidMount(){
		setTimeout(() => {
			this.setState({
				open: true
			});
		},0);
	}

	render( {} , {} ){
		return (
			<div>
				<Snackbar
					open={this.state.open}
					message={this.state.message}
					action=""
					autoHideDuration={2000}
				/>
			</div>
		);
	}
}