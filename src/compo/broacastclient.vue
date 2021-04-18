<template>
  <div>
    <div class="hostIcon">
      <img :src="photoURL">
      <h2>{{title}}</h2>
      <h3>{{displayName}}</h3>
    </div>
    <div class="remote-streams" id="js-remote-streams"></div>
  </div>
</template>

<script>
  import Peer from 'skyway-js';
  import firebase from 'firebase';
  import Rythm from 'rythm.js';

  export default {
    mounted (){
      let localStream;
      const peer = new Peer({key:'d2edad6c-ed62-482b-82d2-f8207af92b9e', debug:3});
      const _this = this

      peer.on('open', function(){
        const room = peer.joinRoom(_this.$route.params.id, {mode: 'sfu', stream: localStream});
        let hostPeer

        room.once('open', () => {
          console.log('接続しました');
        });

        room.on('stream', async function(stream){
          const remoteVideos = document.getElementById('js-remote-streams');
          const newVideo = document.createElement('audio');

          newVideo.srcObject = stream;
          newVideo.playsInline = true;
          newVideo.class = "video";
          newVideo.autoplay = true;
          newVideo.setAttribute('data-peer-id', stream.peerId);
          remoteVideos.appendChild(newVideo);

          const rythm = new Rythm();
          rythm.connectExternalAudioElement(newVideo);
          rythm.start();
          console.log('stream')
        });

        room.on('close', () =>{
          const db = firebase.firestore();
          db.collection('brodcast').doc(_this.$route.params.id).delete();
        });

        room.on('data', ({src, data}) =>{
          hostPeer = src
          console.log(hostPeer)
        });

        room.on('peerLeave', (peerId) => {
          if(hostPeer === peerId){
            room.close();
            alert('配信が終了しました');
            _this.$router.replace('/');
          }
        });
      });
    },

    created(){
      const _this = this;
      const db = firebase.firestore();
      const broadcast = db.collection('broadcast').doc(this.$route.params.id);
      broadcast.get().then(doc => {
        _this.photoURL = doc.data().photoURL
        _this.title = doc.data().title
        _this.displayName = doc.data().displayName
      }).catch(() => {
        _this.$router.replace('/');
      });
    },

    data(){
      return{
        photoURL:String,
        title: String,
        displayName: String
      }
    },
  }
</script>
