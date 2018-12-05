<template>
    <div class="navbar">
        <nav class="nav-extended white">
            <div class="nav-wrapper">
                <router-link :to="{ name: 'Index' }">
                    <span class="nav-title"><span class="orange-text accent-4">{{ user[0] }}</span> Movie Log</span>
                </router-link>

                <ul class="right hide-on-med-and-down">
                    <li><a class="waves-effect waves-light btn red lighten-1" @click="logout">Logout <i class="material-icons right">exit_to_app</i></a></li>
                </ul>

                <a href="" class="btn-floating btn-large halfway-fab teal darken-4">
                    <router-link :to="{ name: 'AddMovie' }">
                        <i class="material-icons">add</i>
                    </router-link>
                </a>
            </div>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase';


export default {
    name: 'Navbar',
    data() {
        return {
            user: []
        }
    },
    methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  },
  created() {
      let user = firebase.auth().currentUser
        user = user.email
        this.user.push(user)
  }
}
</script>

<style>
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 1;
}
.navbar nav {
    padding: 0 20px;
}
.navbar .nav-title {
    color: #41B883;
}
</style>
