import fetch from 'unfetch';

class Deadpool {
	key = '6960b557a12d8e6dbee6840893d6af67';
	baseUrl = 'https://api.themoviedb.org/3';
	Get({ url, callback }) {
		fetch(this.baseUrl + url, {
			method: 'GET',
			headers: {}
		}).then(r => r.json()).then(data => {
			callback(data);
		});
	}
	PopularSeries({ page = 1, callback }) {
		const url =
			`/tv/popular?api_key=${this.key}&language=en-US&page=${page}`;
		this.Get({ url, callback });
	}
	TopRatedSeries({ page = 1, callback }) {
		const url =
			`/tv/top_rated?api_key=${this.key}&language=en-US&page=${page}`;
		this.Get({ url, callback });
	}
	PopularMovies({ page = 1, callback }) {
		const url =
			`/movie/popular?api_key=${this.key}&language=en-US&page=${page}`;
		this.Get({ url, callback });
	}
	NowPlayingMovies({ page = 1, callback }) {
		const url =
			`/movie/now_playing?api_key=${this.key}&language=en-US&page=${page}`;
		this.Get({ url, callback });
	}
	SearchMulti({ query, callback }) {
		const url =
			`/search/multi?api_key=${this.key}&query=${query}&language=en-US&append_to_response=credits,videos`;
		this.Get({ url, callback });
	}
	FindId({ type, id, callback }) {
		const url =
			`/${type}/${id}?api_key=${this.key}&language=en-US&append_to_response=credits,videos`;
		this.Get({ url, callback });
	}
}


export default new Deadpool();