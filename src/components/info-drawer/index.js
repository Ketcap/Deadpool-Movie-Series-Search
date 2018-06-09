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
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

@connect(['GlobalStore'])
export default class InfoDrawer extends Component{
	state = {
		open: false,
		loading: true,
		movie: null,
		videoModal: false,
		key: null,
		popover: false,
		anchorEl: null
	}
	handleRequestClose(){
		this.setState({
			popover: false
		});
	}

	handleVideoModal(event,key){
		this.handleRequestClose();
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

	date(date){
		const d = new Date(date);
		return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
	}

	findMovie(){
		this.setState({
			loading: true,
			open: true
		});
		const Id = this.props.GlobalStore.data.id;
		const v3 = this.props.GlobalStore.v3_key;
		const type = this.props.GlobalStore.type;
		const url = `https://api.themoviedb.org/3/${type}/${Id}?api_key=${v3}&language=en-US&append_to_response=credits,videos`;
		fetch(url,{
			method: 'GET',
			headers: {}
		}).then( r => r.json() ).then(data => {
			this.setState({
				loading: false,
				movie: data
			});
		});
	}
	handleTouchTap(event) {
		// This prevents ghost click.
		event.preventDefault();
		
		this.setState({
			popover: true,
			anchorEl: event.currentTarget
		});
	}
	
	componentDidMount(){
		this.findMovie(this.props.data.id);
	}
	render( { GlobalStore } , { loading , movie , videoModal , key , popover } ){
		return (
			<Drawer width={'90%'} docked={false} 
				//eslint-disable-next-line				
				expandable={true} openSecondary={true}
				//eslint-disable-next-line
				onRequestChange={(open) => this.closeDrawer()}
				open={this.state.open}
			>
				{loading ?
					<div style={{ width: '100%', height: '100%', 'margin-top': 'calc(50vh - 20px)' }}>
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
								<RaisedButton
									onClick={(event) => this.handleTouchTap(event)}
									label="Videos"
								/>
								<Popover
									open={popover}
									anchorEl={this.state.anchorEl}
									anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
									targetOrigin={{ horizontal: 'right', vertical: 'top' }}
									onRequestClose={() => this.handleRequestClose()}
									animation={PopoverAnimationVertical}
								>
									<Menu>
										{movie.videos.results.map((video) => {
											return (<MenuItem onClick={(event) => this.handleVideoModal(event,video.key)} primaryText={video.name} />);
										})
										}
									</Menu>
								</Popover>
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
								<div style={{ display: 'flex', 'flex-wrap': 'wrap', margin: '15px 0'  }}>
									{movie.genres.map((genre) => {
										return (
											<Chip style={{ margin: '4px' }}>
												{genre.name}
											</Chip>
										);
									})}
								</div>
								{movie.overview}
							</CardText>
						</Card>
						{GlobalStore.type === 'tv' ?
							<List>
								<Subheader>Seasons</Subheader>
								<ListItem
									primaryText={`Latest episode ${this.date(movie.last_air_date)}`}
								/>
								{movie.seasons.map((season,index) => {
									if (season.season_number === 0){
										return null;
									}
									return (
										<ListItem
											primaryText={`Season ${season.season_number}`}
											secondaryText={`Air Date : ${this.date(season.air_date)}`}
											/* leftAvatar={<Avatar size={50} src={`${GlobalStore.image_url}/w45${cast.profile_path}`} />} */
										/>
									);
								})}
								
							</List>
							:
							''
						}
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