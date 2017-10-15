import { h, Component } from 'preact';

import { Router } from 'preact-router';

import style from './style.css';

import Helmet from 'preact-helmet';
import Header from './header';
import BottomNav from './bottom-navigation';
import Movies from '../routes/movies';
import Series from '../routes/series';
import Profile from '../routes/profile';
import SnackBar from '../components/snackbar';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'mobx-preact';
import { observable } from 'mobx';

let GlobalStore = observable({
	v3_key: '6960b557a12d8e6dbee6840893d6af67',
	image_url: 'https://image.tmdb.org/t/p',
	snacks: [],
	infoDrawer: false
});

export default class App extends Component {
	state = {
		pageState: '/'
	}

	handleRoute = e => {
		this.setState({ pageState: e.url });
		this.currentUrl = e.url;
	};

	render( { } , { snacks , infoDrawer , pageState }) {
		return (
			<Provider GlobalStore={GlobalStore}>
				<MuiThemeProvider>
					<div id="app">
						<Helmet
							title="Deadpool Movie"
							meta={[
								{viewport: 'width=device-width, initial-scale=1.0'}
							]}
						/>
						<Header />
						<div class={style.middle}>
							<Router onChange={this.handleRoute}>
								<Movies path="/" />
								<Series path="/series" />
								<Profile path="/profile/" user="me" />
								<Profile path="/profile/:user" />
							</Router>
							{snacks ?
								snacks.map((snack) => {
									return <SnackBar message={`${snack.message}`} />;
								})
								:
								''
							}
						</div>
						<BottomNav page={pageState} />
					</div>
				</MuiThemeProvider>
			</Provider>
		);
	}
}
