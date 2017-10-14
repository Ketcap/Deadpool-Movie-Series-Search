import { h, Component } from 'preact';
import style from './style';

import CircularProgress from 'material-ui/CircularProgress';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'mobx-preact';
import fetch from 'unfetch';

@connect(['GlobalStore'])
export default class Series extends Component {
	state = {
		result: [],
		page: 0,
		totalPages: 0
	}

	loadMore(key){
		const v3 = key;
		const url = `https://api.themoviedb.org/3/tv/popular?api_key=${v3}&language=en-US&page=${++this.state.page}`;
		fetch(url,{
			method: 'GET',
			headers: {}
		}).then( r => r.json() ).then(data => {
			let results = this.state.result;
			this.setState({
				page: data.page,
				total_pages: data.total_pages
			});
			let newResults = results.concat(data.results);
			this.setState({ result: newResults });
		});
	}
	routeToMovie(movie){
		console.log(movie);
	}

	componentDidMount(){
		const v3 = this.props.GlobalStore.v3_key;
		const url = `https://api.themoviedb.org/3/tv/popular?api_key=${v3}&language=en-US&page=1`;
		fetch(url,{
			method: 'GET',
			headers: {}
		}).then( r => r.json() ).then(data => {
			this.setState({
				page: data.page,
				totalPages: data.total_pages
			});
			const tv = data.results;
			console.log(tv);
			this.setState({
				result: tv
			});
		});

	}
	render( { GlobalStore } , { result , page , totalPages } ) {
		const loaded = result.length > 0 ;
		const more = page < totalPages;
		if (!loaded){
			return (
				<div class={`${style.loadingParent}`}>
					<CircularProgress style={{ display: 'block', margin: '0 auto' }}  size={50} thickness={5} />
				</div>
			);
		}
		return (
			<div>
				<GridList
					cols={2}
					cellHeight={200}
					padding={1}
					class={`${style.gridList} `+ (!more ? style.finishedList : '')}
				>
					{
						result.map((tv,index) => {
							return (
								<GridTile
									title={tv.name}
									subtitle={<span><b>Score : {tv.vote_average}</b></span>}
									titlePosition="top"
									titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
									cols={index === 0 || index === 3 ? 2 : 1}
									rows={index === 0 || index === 3 ? 2 : 1}
									//eslint-disable-next-line
									onClick={() => this.routeToMovie(tv)}
								>
									<img src={`${GlobalStore.image_url}/w500`+(tv.backdrop_path !== null ? tv.backdrop_path : tv.poster_path)} />
								</GridTile>
							);
						})
					}
				</GridList>
				{more ?
					<div class={style.loadMore}>
						<RaisedButton label="Load More"
							//eslint-disable-next-line
							fullWidth={true} onClick={() => this.loadMore(GlobalStore.v3_key)}/>
					</div>
					:
					null
				}
			</div>
		);
	}
}
