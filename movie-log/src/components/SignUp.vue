<template>
    <div class="sign-up container">
        <div class="card">
            <h5>Let's create a new account !</h5>
            <input type="text" v-model="email" placeholder="Email"><br>
            <input type="password" v-model="password" placeholder="Password"><br>
            <button v-on:click="signUp">Sign Up</button>
            <span>or go back to <router-link to="/login">login.</router-link></span>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'signUp',
    data: function() {
        return{
            email: '',
            password: ''
        }
    },
    methods: {
        signUp: function() {
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                (user) => {
                    this.$router.replace('hello')
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
    .signUp {
        margin-top: 40px;
    }
    
   
    span {
        display: block;
        margin-top: 20px;
        font-size: 11px;
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


