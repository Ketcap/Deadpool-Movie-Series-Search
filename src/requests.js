export default searchMovie = event => {
	// Search That Bitch
	event.preventDefault();
	const type = event.target.searchText.value;
	if (type.trim() === ''){
		return false;
	}
	this.props.movieStore.searchValue = type;
	const v3 = this.props.movieStore.v3_key;
	const url = `https://api.themoviedb.org/3/search/movie?api_key=${v3}&query=${type}&language=en-US&page=1&include_adult=false`;
	fetch(url,{
		method: 'GET',
		headers: {}
	}).then( r => r.json() ).then(data => {
		const movies = data.results;
		this.props.movieStore.results = movies;
		this.props.movieStore.headerActive = true;
		route(`/${type}`);
	});
};