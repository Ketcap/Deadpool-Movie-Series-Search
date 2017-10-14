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

	select = (index,r) => { this.setState({ selectedIndex: index }); route(r); }
	
	render( { } , { selectedIndex } ) {
		return (
			<Paper zDepth={1}>
				<BottomNavigation style={{position:'fixed',bottom:0}} selectedIndex={this.state.selectedIndex}>
					<BottomNavigationItem
						label="Movies"
						icon={moviesIcon}
						onClick={() => this.select(0,'/')}
					/>
					<BottomNavigationItem
						label="Search"
						icon={searchIcon}
						onClick={() => this.select(1)}
					/>
					<BottomNavigationItem
						label="Series"
						icon={seriesIcon}
						onClick={() => this.select(2,'/series')}
					/>
				</BottomNavigation>
			</Paper>
		);
	}
}
