import { h, Component } from 'preact';
import style from './style';

import CircularProgress from 'material-ui/CircularProgress';
import { GridList, GridTile } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'mobx-preact';
import fetch from 'unfetch';

@connect(['GlobalStore'])
export default class Movies extends Component {
	state = {
		result: [],
		page: 0,
		totalPages: 0,
		movie: null
	}

	loadMore(key){
		const v3 = key;
		const url = `https://api.themoviedb.org/3/movie/popular?api_key=${v3}&language=en-US&page=${++this.state.page}`;
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

	openDrawer(self,movie){
		self.props.GlobalStore.data = movie;
		self.props.GlobalStore.type = 'movie';
		self.props.GlobalStore.infoDrawer = true;
	}

	componentDidMount(){
		const v3 = this.props.GlobalStore.v3_key;
		const url = `https://api.themoviedb.org/3/movie/popular?api_key=${v3}&language=en-US&page=1`;
		fetch(url,{
			method: 'GET',
			headers: {}
		}).then( r => r.json() ).then(data => {
			this.setState({
				page: data.page,
				totalPages: data.total_pages
			});
			const movies = data.results;
			this.setState({
				result: movies
			});
		});

	}
	render( { GlobalStore } , { result , page , totalPages , drawer , movie } ) {
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
						result.map((movie,index) => {
							return (
								<GridTile
									title={movie.title}
									subtitle={<span><b>Score : {movie.vote_average}</b></span>}
									titlePosition="top"
									titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
									cols={index === 0 || index === 3 ? 2 : 1}
									rows={index === 0 || index === 3 ? 2 : 1}
									//eslint-disable-next-line
									onClick={() => {this.openDrawer(this,movie)}}
								>
									<img src={`${GlobalStore.image_url}/w500`+(movie.backdrop_path !== null ? movie.backdrop_path : movie.poster_path)} />
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
