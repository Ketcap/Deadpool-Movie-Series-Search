import { h, Component } from 'preact';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';

export default class Header extends Component {
	state = {
		selectedIndex: 0,
		open: false
	};

	handleToggle = () => { this.setState({ open: !this.state.open }); }

	render( { } , { selectedIndex , open  } ) {
		return (
			<div>
				<AppBar
					title="Title"
					style={{ position: 'fixed' }}
					iconElementLeft={<IconButton
						//eslint-disable-next-line					
						onClick={() => this.handleToggle()}> <IconMenu /> </IconButton>}
				/>
				<div>
					<Drawer docked={false} open={open}
						//eslint-disable-next-line
						onRequestChange={(open) => this.setState({open})}>
						<MenuItem>Settings</MenuItem>
						<MenuItem>Game History</MenuItem>
						<MenuItem>Logout</MenuItem>
					</Drawer>
				</div>
			</div>
		);
	}
}
