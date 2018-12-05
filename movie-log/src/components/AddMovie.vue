<template>
    <div class="add-movie container white">
        <h2 class="center-align indigo-text">Add a Movie or Show</h2>
        <!-- This prevents the form from refreshing the page on default -->
        <form @submit.prevent="AddMovie">
            <div class="field title">
                <label for="title">Movie Title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <!-- loop through the added items and output them to the page -->
            <div v-for="(tag, index) in tags" :key="index" class="tags">
                <!-- <label for="tag">tags:</label> -->
                <span class="chip">{{ tag }}<i class="material-icons close" @click="deleteTag(tag)">close</i></span>
                <!-- <input type="text" name="tag" v-model="tags[index]"> -->
                
            </div>
            <div class="field add-tag">
                <label for="add-tag">Add a tag:</label>
                <!-- looks for the user to press the tab key to fire event, also wanting to stop the tab key from moving to the next field -->
                <input type="text" name="add-tag" @keydown.tab.prevent="addTag" v-model="another">
                <i class="material-icons delete" @click="addTag">add</i>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <textarea id="textarea1" class="materialize-textarea" v-model="description"></textarea>
                    <label for="textarea1">Description</label>
                </div>
            </div>


            <div class="field center-align">
                <!-- this will only show if there is a value for feedback (i.e. the user does not put something in the field) -->
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add Movie</button>
                <router-link :to="{ name: 'Index' }">
                    <span class="toIndex">Cancel</span>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
// bring in the db
import db from '@/firebase/init'
// npm install slugify --save
// add slugify to this component
import slugify from 'slugify'
// bring in firebase to get reference to user's id
import firebase from 'firebase'

export default {
    name: 'AddMovie',
    data() {
        return {
            title: null,
            another: null,
            tags: [],
            description: null,
            feedback: null,
            slug: null,
            user: []
        }
    },
    methods: {
        AddMovie() {
            if(this.title && this.description && this.tags) {
                this.feedback = null
                // create a slug
                this.slug = slugify(this.title, {
                    // replaces any spaces with '-'
                    replacement: '-',
                    // remove any of these symbols at a global level
                    remove: /[$*_+~.()'"!\-:@]/g,
                    // all results in the slug to be lowercase
                    lower: true
                })
                let user = firebase.auth().currentUser
                user = user.uid
                this.user.push(user)
                // push this data to the firestore
                db.collection('movies').add({
                    title: this.title,
                    tags: this.tags,
                    description: this.description,
                    slug: this.slug,
                    user: user
                }).then(() => {
                    // waits for the promise to come back then returns user to index
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    // push any erros to the console
                    console.log(err)
                })
            } else {
                this.feedback = 'You must enter a title, at least one tag, and a description'
            }
        },
        addTag() {
            // check to make sure the value is not null
            if(this.another) {
                this.tags.push(this.another)
                // console.log(this.tags)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value to add a tag'
            }
        },
        
        deleteTag(tag) {
            this.tags = this.tags.filter(tag => {
                return tag != tags
            })
        }
    }
}
</script>

<style>
.toIndex {
    margin-left: 30px;
    color: #aaa;
}
.add-movie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-movie h2 {
    font-size: 2em;
    margin: 20px auto;
}

.add-movie .field {
    margin: 5px auto;
    position: relative;
}

.tags {
    margin: 5px auto;
    position: relative;
    display: inline;
}
.add-movie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}

.add-movie .close {
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
