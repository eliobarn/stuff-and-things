<template>
    <div class="login container">
        <div class="card">
            <h3>Sign In</h3>
            <input type="text" v-model="email" placeholder="Email"><br>
            <input type="password" v-model="password" placeholder="Password" @keyup.enter="signIn"><br>
            <button v-on:click="signIn">Login</button>
            <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
// import db from '@/firebase/init'

export default {
    name: 'login',
    data: function() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        signIn: function() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    this.$router.replace('/')
                },
                (err) => {
                    alert('Oops. ' + err.message)
                }
            );
        }
    }
}
</script>

<style scoped>
    .login {
        margin-top: 40px;
    }
    .card {
        padding: 30px;
        width: 50%;
        margin-left: 25%;
    }
    input {
        margin: 10px 0;
        width: 20%;
        padding: 15px;
    }
    button {
    padding: 10px 20px;
    background: #42b983;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 22px;
    cursor: pointer;
    }
    p {
        margin-top: 40px;
        font-size: 13px;
    }
    p a {
        text-decoration: underline;
        cursor: pointer;
    }
</style>