import { h, Component } from 'preact';
import { route } from 'preact-router';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

import IconSearch from 'material-ui/svg-icons/action/search';
import IconMovies from 'material-ui/svg-icons/maps/local-movies';
import IconSeries from 'material-ui/svg-icons/av/video-library';


const moviesIcon = <IconMovies />;
const seriesIcon = <IconSeries />;
const searchIcon = <IconSearch />;

export default class BottomNav extends Component {
	state = {
		selectedIndex: 0
	};

	select = (index, r) => { this.setState({ selectedIndex: index }); route(r); }

	componentDidMount() {
		setTimeout(() => {
			let page = this.props.page;
			if (page === '/') {
				this.setState({ selectedIndex: 0 });
			}
			else if (page === '/series') {
				this.setState({ selectedIndex: 2 });
			}
			else {
				this.setState({ selectedIndex: 1 });
			}
		}, 0);
	}

	render({ }, { selectedIndex }) {
		return (
			<Paper zDepth={1}>
				<BottomNavigation style={{ position: 'fixed', bottom: 0, height: '66px', paddingBottom: '10px' }} selectedIndex={this.state.selectedIndex}>
					<BottomNavigationItem
						label="Movies"
						icon={moviesIcon}
						//eslint-disable-next-line
						onClick={() => this.select(0, '/')}
					/>
					<BottomNavigationItem
						label="Search"
						icon={searchIcon}
						//eslint-disable-next-line
						onClick={() => this.select(1, '/search')}
					/>
					<BottomNavigationItem
						label="Series"
						icon={seriesIcon}
						//eslint-disable-next-line
						onClick={() => this.select(2, '/series')}
					/>
				</BottomNavigation>
			</Paper>
		);
	}
}
