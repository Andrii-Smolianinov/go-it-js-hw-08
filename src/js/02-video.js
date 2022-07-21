import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const vimeoPlayer = new Player(iframe);

vimeoPlayer.on('play', function() {
    console.log('played the video!');
});

