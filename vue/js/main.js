Vue.component('movie-list-item', {
  props: {
    movie: Object
  },
  data: function () {
    return {
      base_url: "http://image.tmdb.org/t/p/w342"
    }
  },
  template: `
	    <div class="card" style="width: 18rem;">
		  <img :src="base_url+movie.poster_path" class="card-img-top" alt="...">
		  <div class="card-body">
		    <h5 class="card-title">{{movie.original_title}}</h5>
		    <p class="card-text">{{movie.overview}}</p>
		    <p>release_date: {{movie.release_date}}</p>
		    <p>rating: {{movie.vote_average}}/10  ({{movie.vote_count}} votes)</p>
		  </div>
		</div>
  `
})


Vue.component('movie-list', {
  props: {
    movies: Array
  },
  template: `<div class="d-flex justify-content-around flex-wrap">
    <movie-list-item class="m-1 p-1"
    v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
    />
  </div>`
});


new Vue({
  el: '#app',
  data() {
    return {
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      movies: [],
      month: "",
      search: "",
      getUrl: 'http://movies.localhost/api/getMovies.php',
      refreshUrl: "movies.localhost/refresh.php"
    }
  },
  async created() {
    this.getMovies();
  },
  computed: {
    getMoviesUrl: function () {
      if (this.month !== "") {
        return this.getUrl + "?month=" + this.month;
      }
      return this.getUrl;
    },
    filteredMovies() {
      if (this.search == "")
        return this.movies;
      return this.movies.filter((movie) => movie.original_title.toLowerCase().startsWith(this.search.toLowerCase()));
    }
  },
  methods: {
    refreshDatabase: async function () {
      let response = await fetch(this.refreshUrl);
      response = await response.json();
      if (response == 'success') {
        this.getMovies();
      } else {
        console.error("Error in refreshing database");
      }

    },
    getMovies: async function () {
      let response = await fetch(this.getMoviesUrl);
      this.movies = await response.json();
    }
  }
})