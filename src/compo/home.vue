<template>
  <div>
    <div class="header">
      <span class="title">radio</span>
      <span v-if="isLogin === true" class="user">
        <img :src="photURL" class="icon">
        <div class="displayName">{{displayName}}</div>
        <router-link to="/setting">
          <a class="start">配信する</a>
        </router-link>
      </span>
      <span v-else>
        <button class="user" v-on:click="login()">ログイン</button>
      </span>
    </div>
    <div v-for="(item, index) in list" v-bind:key="index" class="broadcasat">
      <img :src="item.photURL" class="broadcastIcon">
      <router-link :to="'/radio/' + item.id">
        <div>
          <a class="url">{{item.title}}</a>
        </div>
      </router-link>
      <div>{{item.displayName}}</div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import Peer from 'skyway-js';

export default {
  mounted() {
    const _this = this
    firebase.auth().onAuthStateChanged(user => {
      if(user){
          user.providerData.forEach(profile => {
            const displayName = profile.displayName;
            const uid = profile.uid;
            const photoURL = profile.photoURL;
            _this.displayName = displayName;
            _this.isLogin = true;
            _this.photURL = photoURL
          });
      }else{
        console.log('not login');
      }
    });

    const db = firebase.firestore();
    db.collection("broadcast").onSnapshot(snapshot =>{
      _this.list = [];
      snapshot.forEach(doc => {
        console.log(doc.id);
        console.log(doc.data().title);

        const docObj = {
          'id':doc.id,
          'title':doc.data().title,
          'displayName':doc.data().displayName,
          'photURL':doc.data().photoURL,
        }

        _this.list.push(docObj);
      });
    });
  },

  methods:{
    login(){
      console.log('click')
      const provider = new firebase.auth.GoogleAuthProvider();
      const _this = this
      firebase.auth().signInWithPopup(provider).then(function(result) {
        const user = result.user.displayName;
        const photURL = result.user.photoURL;

        _this.isLogin = true;
        _this.displayName = user;
        _this.photURL = photURL;
      }).catch(function(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        alert('ログインに失敗しました。お手数ですがもう一度お試しください。');
      });
    }
  },
  data(){
    return{
      list:[],
      isLogin:false,
      displayName:String,
      photURL:String
    }
  },
}
</script>