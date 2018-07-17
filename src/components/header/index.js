import { h, Component } from 'preact';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import IconSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import { route } from 'preact-router';

export default class Header extends Component {
	state = {
		selectedIndex: 0,
		open: false
	};

	handleToggle = () => { this.setState({ open: !this.state.open }); }

	type = (e) => { if (e.keyCode === 13) { route(`/search/${e.target.value}`, true); } }

	render({ }, { selectedIndex, open }) {
		return (
			<div>
				<AppBar
					title={
						<TextField
							id="Search"
							//eslint-disable-next-line
							onKeyPress={(e) => this.type(e)}
							inputStyle={{ color: '#fff' }}
							hintText={`Search Movies , Series `}
							hintStyle={{ color: '#fff' }}
							//eslint-disable-next-line
							fullWidth={true}
							underlineShow={false}
						/>
					}
					style={{ position: 'fixed' }}
					iconElementLeft={<IconButton> <IconSearch /> </IconButton>}
				/>
			</div>
		);
	}
}
