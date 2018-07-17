import { h, Component } from 'preact';

import { Router } from 'preact-router';

import Helmet from 'preact-helmet';
import Header from '../header';
import BottomNav from '../bottom-navigation';
import Movies from '../../routes/movies';
import Series from '../../routes/series';
import Search from '../../routes/search';
import SnackBar from '../snackbar';
import InfoDrawer from '../info-drawer';

import style from './style';

import { connect } from 'mobx-preact';


@connect(['GlobalStore'])
export default class Main extends Component {
	state = {
		pageState: '/'
	}

	handleRoute = e => {
		this.setState({ pageState: e.url });
		this.currentUrl = e.url;
	};
	// isIos = () => {
	// 	const userAgent = window.navigator.userAgent.toLowerCase();
	// 	return /iphone|ipad|ipod/.test(userAgent);
	// }
	// // Detects if device is in standalone mode
	// isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

	// componentDidMount() {
	// 	if (this.isIos() && !this.isInStandaloneMode()) {
	// 		this.setState({ showInstallMessage: true });
	// 	}
	// }
	// Detectiong for pwa

	render({ GlobalStore }, { pageState }) {
		const infoDrawer = GlobalStore.infoDrawer ? <InfoDrawer data={GlobalStore.data} /> : false;
		return (
			<div id="app">
				<Helmet
					title="Deadpool Movie"
					meta={[
						{ name: 'apple-mobile-web-app-capable', content: 'yes' },
						{ name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
						{ viewport: 'viewport-fit=cover, width=device-width, initial-scale=1.0,user-scalable=no' }
					]}
					link={[
						{ rel: 'apple-touch-startup-image', href: './assets/launch.png' },
						{ rel: 'apple-touch-icon', href: './assets/icons/apple-icon-57x57.png' },
						{ rel: 'apple-touch-icon', sizes: '72x72', href: './assets/icons/apple-icon-72x72.png' }
					]}
				/>
				<Header />
				{infoDrawer}
				<div class={style.middle}>
					<Router onChange={this.handleRoute}>
						<Movies path="/" />
						<Series path="/series" />
						<Search path="/search/:query" />
					</Router>
					{GlobalStore.snacks &&
						GlobalStore.snacks.map((snack) => {
							return <SnackBar message={`${snack.message}`} />;
						})
					}
				</div>
				<BottomNav page={pageState} />
			</div>
		);
	}
}