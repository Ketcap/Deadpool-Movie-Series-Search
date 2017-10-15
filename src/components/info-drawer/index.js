import { h, Component } from 'preact';

import Drawer from 'material-ui/Drawer';
import { Card , CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import { List , ListItem } from 'material-ui/List';
import { connect } from 'mobx-preact';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';

@connect(['GlobalStore'])
export default class InfoDrawer extends Component{
	state = {
		open: false,
		loading: true,
		movie: null,
		videoModal: false,
		key: null
	}
	handleVideoModal(key){
		this.setState({
			key,
			videoModal: !this.state.videoModal
		});
	}
	closeDrawer(){
		this.setState({ open: false });
		setTimeout(() => {
			this.props.GlobalStore.infoDrawer = false;
		},200);
	}

	findMovie(movieId){
		this.setState({
			loading: true,
			open: true
		});
		const v3 = this.props.GlobalStore.v3_key;
		const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${v3}&language=en-US&append_to_response=credits,videos`;
		fetch(url,{
			method: 'GET',
			headers: {}
		}).then( r => r.json() ).then(data => {
			this.setState({
				loading: false,
				movie: data
			});
			console.log(data);
		});
	}

	componentDidMount(){
		this.findMovie(this.props.movie.id);
	}

	render( { GlobalStore } , { loading , movie , videoModal , key } ){
		return ( 
			<Drawer width={'90%'} docked={false} expandable={true} openSecondary={true}
				//eslint-disable-next-line
				onRequestChange={(open) => this.closeDrawer()}
				open={this.state.open}
			>
				{loading ?
					<div style={{ width: '100%', height: '100%' }}>
						<CircularProgress style={{ display: 'block', margin: '0 auto' }}  size={50} thickness={5} />
					</div>
					:
					<div>
						<Card style={{ 'box-shadow': 'none' }}>
							<CardMedia>
								<img src={`${GlobalStore.image_url}/w500`+(movie.backdrop_path !== null ? movie.backdrop_path : movie.poster_path)} alt="" />
							</CardMedia>
							<CardTitle title={movie.title ? movie.title : movie.name} subtitle={<span><b>Score : {movie.vote_average}</b></span>} />
							<CardText>
								<Dialog
									modal={false}
									open={videoModal}
									//eslint-disable-next-line
									onRequestClose={(open)=>this.handleVideoModal()}
									bodyStyle={{ padding: '0' }}
									contentStyle={{ width: '100%' }}
								>
									<iframe style={{ width: '100%' }} height={400} src={`https://www.youtube.com/embed/${key}`} frameborder="0" allowfullscreen />
								</Dialog>
								<div style={{ display: 'flex', 'flex-wrap': 'wrap', 'margin-bottom': '5px' }}>
									{movie.videos.results.map((video) => {
										return (
											<Chip
												//eslint-disable-next-line
												onClick={() => this.handleVideoModal(video.key)} style={{ margin: '4px' }}
											>
												{video.name}
											</Chip>
										);
									})}
								</div>
								{movie.overview}
							</CardText>
						</Card>
						<List>
							<Subheader>Cast</Subheader>
							{movie.credits.cast.map((cast,index) => {
								if (index > 4){
									return null;
								}
								return (
									<ListItem
										primaryText={cast.name}
										secondaryText={cast.character}
										leftAvatar={<Avatar size={50} src={`${GlobalStore.image_url}/w45${cast.profile_path}`} />}
									/>
								);
							})}
							
						</List>
					</div>
				}
			</Drawer>
		);
	}
}