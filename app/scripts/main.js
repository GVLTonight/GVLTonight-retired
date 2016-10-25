console.log('\'Allo \'Allo!');

let ms = 1500;

function removeSplashScreen(){
    $('.loading-container').remove();
    $('.blocker').remove();
}

setTimeout(removeSplashScreen, ms);
