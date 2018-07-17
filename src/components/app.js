import { h, Component } from 'preact';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'mobx-preact';
import { observable } from 'mobx';
import Deadpool from '../deadpool';

import Main from './main';

let GlobalStore = observable({
	v3_key: '6960b557a12d8e6dbee6840893d6af67',
	image_url: 'https://image.tmdb.org/t/p',
	snacks: [],
	infoDrawer: false,
	data: null,
	type: null,
	Deadpool
});

const App = () => (
	<Provider GlobalStore={GlobalStore}>
		<MuiThemeProvider>
			<Main />
		</MuiThemeProvider>
	</Provider>
);
export default App;
