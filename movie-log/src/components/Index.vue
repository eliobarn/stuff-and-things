<template>
  <div class="index container">
    <Navbar />
    <!-- <div>{{ user[0] }}</div> -->
    <div class="page">
      <div class="card" v-for="movie in movies" :key="movie.id">
        <div class="card-content">
          <!-- I find out which item exactly to delete by grabbing the object along with it's id -->
          <i class="material-icons delete" @click="deleteMovie(movie.id)">delete</i>
          <h2 class="indigo-text">{{ movie.title }}</h2>
          <ul class="ingredients">
            <li v-for="(tag, index) in movie.tags" :key="index">
              <span class="chip">{{ tag }}</span>
            </li>
          </ul>
          <div class="description">{{ movie.description }}</div>
        </div>
        <span class="btn-floating btn-large halfway-fab teal darken-4">
          <router-link :to="{ name: 'EditMovie', params: {movie_slug: movie.slug} }">
            <i class="material-icons edit">edit</i>
          </router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// bring in my firebase db from my init file
import db from '@/firebase/init'
import firebase from 'firebase'
import Navbar from '@/components/Navbar'


export default {
  name: 'Index',
  components: {
  Navbar
  },
  data (user) {
    return {
      movies: [],
      user: []
      // email: this.email
    }
  },
  methods: {
    deleteMovie(id){
      // delete doc from firestore
      db.collection('movies').doc(id).delete()
      .then(() => {
        // after the promise is returned, push the remaining data into the array
        this.movies = this.movies.filter(movies => {
          return movies.id != id
        })
      })
    }
  },
  // start my created() lifecycle hook that will bring in the data before the app is created
  created() {
    // fetch data from the filestore
    db.collection('movies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let movies = doc.data()
        movies.id = doc.id
        if (movies.user == user) {
          this.movies.push(movies)
        }
      })
    })

    // get the user's data to filter their cards
    let user = firebase.auth().currentUser
    user = user.uid
    this.user.push(user)

  }
  
}
</script>

<style>
.page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  margin-top: 20%;
  margin-bottom: 5%;
}

.page .btn-floating {
  z-index: 0;
}

.page h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.page .ingredients {
  margin: 30px auto;

}

.page .ingredients li {
  display: inline-block;
}

.page .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
