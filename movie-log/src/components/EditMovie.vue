<template>
    <div v-if="movie" class="edit-movie container white">
        <h2>Edit <span class="indigo-text">{{ movie.title }}</span></h2>
        <form @submit.prevent="EditMovie">
            <div class="field title">
                <label for="title">Movie Title:</label>
                <input type="text" name="title" v-model="movie.title">
            </div>
            <!-- loop through the added items and output them to the page -->
            <div v-for="(tag, index) in movie.tags" :key="index" class="tags">
               <span class="chip">{{ tag }}<i class="material-icons close" @click="deleteTag(tag)">close</i></span>
            </div>
            <div class="field add-tag">
                <label for="add-tag">Add a tag:</label>
                <!-- looks for the user to press the tab key to fire event, also wanting to stop the tab key from moving to the next field -->
                <input type="text" name="add-tag" @keydown.tab.prevent="addTag" v-model="another">
                <i class="material-icons delete" @click="addTag">add</i>
            </div>


            <div class="row">
                <div class="input-field col s12">
                    <textarea id="textarea1" class="materialize-textarea" v-model="movie.description"></textarea>
                    <label for="textarea1">Description</label>
                </div>
            </div>


            <div class="field center-align">
                <!-- this will only show if there is a value for feedback (i.e. the user does not put something in the field) -->
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Update</button>
                <router-link :to="{ name: 'Index' }">
                    <span class="toIndex">Cancel</span>
                </router-link>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
// npm install slugify --save
// add slugify to this component
import slugify from 'slugify'

import firebase from 'firebase'

export default {
    name: 'EditMovie',
    data() {
        return {
            movie: null,
            another: null,
            feedback: null,
            description: null
            
        }
    },
    methods: {
        EditMovie(){
            if(this.movie.title) {
                this.feedback = null
                // create a slug
                this.movie.slug = slugify(this.movie.title, {
                    // replaces any spaces with '-'
                    replacement: '-',
                    // remove any of these symbols at a global level
                    remove: /[$*_+~.()'"!\-:@]/g,
                    // all results in the slug to be lowercase
                    lower: true
                })
                // grab a reference to this specific item, update this data to the firestore
                db.collection('movies').doc(this.movie.id).update({
                    title: this.movie.title,
                    tags: this.movie.tags,
                    description: this.movie.description,
                    slug: this.movie.slug
                }).then(() => {
                    // waits for the promise to come back then returns user to index
                    this.$router.push({ name: 'Index' })
                }).catch(err => {
                    // push any erros to the console
                    console.log(err)
                })
            } else {
                this.feedback = 'You must enter a title'
            }
        },
        addTag() {
            // check to make sure the value is not null
            if(this.another) {
                this.movie.tags.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteTag(tag) {
            this.movie.tags = this.movie.tags.filter(tags => {
                return tags != tag
            })
        }
    },
    created(){
        // wait untill the data is returned, then get the data and store it in the object
        let ref = db.collection('movies').where('slug', '==', this.$route.params.movie_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                // console.log(doc.data())
                this.movie = doc.data()
                this.movie.id = doc.id
            })
        })
    }
}
</script>

<style>
#textarea1 {
    height: 150px;
    overflow-y: scroll;
}
.edit-movie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-movie h2 {
    font-size: 2em;
    margin: 20px auto;
}

.edit-movie .field {
    margin: 20px auto;
    position: relative;
}
.edit-movie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
