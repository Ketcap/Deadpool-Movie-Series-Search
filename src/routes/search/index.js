import { h, Component } from 'preact';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'mobx-preact';

@connect(['GlobalStore'])
export default class Search extends Component {
	state = {
		slideIndex: 0,
		isSearching: false,
		movies: [],
		series: [],
		route: false
	};

	findMovie(query) {
		this.setState({
			isSearching: true,
			movies: [],
			series: []
		});
		const v3 = this.props.GlobalStore.v3_key;
		const url = `https://api.themoviedb.org/3/search/multi?api_key=${v3}&query=${query}&language=en-US&append_to_response=credits,videos`;
		fetch(url, {
			method: 'GET',
			headers: {}
		}).then(r => r.json()).then(data => {
			this.setState({ isSearching: !this.isSearching });
			console.log(data);
		});
	}

	handleChange = (value) => { this.setState({ slideIndex: value }); }

	componentWillMount() {
		this.setState({
			route: true
		});
	}

	componentWillUpdate(newProps, newState) {
		const query = this.props.query;
		console.log('new PROPS', newProps);
		console.log('old PROPS', this.props);
		if (newProps.query !== query) {
			console.log('search');
			this.findMovie(query);
		}
	}

	render({ query }, { slideIndex, isSearching }) {
		return (
			<div>
				{isSearching ?
					<div style={{ width: '100%', height: '100%', 'margin-top': 'calc(50vh - 20px)' }}>
						<CircularProgress style={{ display: 'block', margin: '0 auto' }} size={50} thickness={5} />
					</div>
					:
					<div>
						<Tabs
							onChange={this.handleChange}
							value={slideIndex}
						>
							<Tab label="Movies" value={0} />
							<Tab label="Series" value={1} />
						</Tabs>
						<SwipeableViews
							index={slideIndex}
							onChangeIndex={this.handleChange}>
							<div>
								<h2>Tabs with slide effect</h2>
								Swipe to see the next slide.<br />
							</div>
							<div>
								slide n°2
							</div>
						</SwipeableViews>
					</div>
				}
			</div>
		);
	}
}
