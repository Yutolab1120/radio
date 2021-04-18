<template>
  <div>
    <div class="hostIcon">
      <input v-model.trim="title" autofocus reqired maxlength="100" id="title" cols="50" rows="10" placeholder="配信タイトル"/>
      <div>{{title.length}}/100</div>
      <button v-on:click="route">配信を開始</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  beforeMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.$router.replace(`/`);
      }
    });
  },

  methods: {
    route() {
      if (this.title.length === 0) {
        this.title = "non title";
      }

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          let displayName, uid, photoURL;

          user.providerData.forEach(profile => {
            displayName = profile.displayName;
            uid = profile.uid;
            photoURL = profile.photoURL;
          });

          const db = firebase.firestore();
          db.collection("broadcast")
            .add({
              displayName: displayName,
              uid: uid,
              title: this.title,
              photoURL: photoURL
            })
            .then(docRef => {
              this.$router.replace(`/start/${docRef.id}`);
            })
            .catch(err => {
              alert("ログインしてください");
              this.$router.replace(`/`);
            });
        } else {
          this.$router.replace(`/`);
        }
      });
    }
  },

  data() {
    return {
      title: ""
    };
  }
};
</script>