import { h, Component } from 'preact';

import { Router } from 'preact-router';

import Helmet from 'preact-helmet';
import Header from '../header';
import BottomNav from '../bottom-navigation';
import Movies from '../../routes/movies';
import Series from '../../routes/series';
import Profile from '../../routes/profile';
import SnackBar from '../snackbar';
import InfoDrawer from '../info-drawer';

import style from './style';

import { connect } from 'mobx-preact';

@connect(['GlobalStore'])
export default class Main extends Component{
	state = {
		pageState: '/'
	}

	handleRoute = e => {
		this.setState({ pageState: e.url });
		this.currentUrl = e.url;
	};

	render( { GlobalStore },{ pageState }){
		const infoDrawer = GlobalStore.infoDrawer ? <InfoDrawer data={GlobalStore.data} /> : false;
		return (
			<div id="app">
				<Helmet
					title="Deadpool Movie"
					meta={[
						{viewport: 'width=device-width, initial-scale=1.0'}
					]}
				/>
				<Header />
				{infoDrawer}
				<div class={style.middle}>
					<Router onChange={this.handleRoute}>
						<Movies path="/" />
						<Series path="/series" />
						<Profile path="/profile/" user="me" />
						<Profile path="/profile/:user" />
					</Router>
					{GlobalStore.snacks ?
						GlobalStore.snacks.map((snack) => {
							return <SnackBar message={`${snack.message}`} />;
						})
						:
						''
					}
				</div>
				<BottomNav page={pageState} />
			</div>
		);
	}
}