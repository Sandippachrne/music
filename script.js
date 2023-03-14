console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

//////////////
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {SongName: "Agar-Tum-Sath_Ho" , filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {SongName: "Barsat_ki_dhun" , filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {SongName: "Bewafa_Tera_Musk." , filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {SongName: "Dil_galti_kar" , filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {SongName: "Hamnava_mere" , filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {SongName: "Lo_safar" , filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {SongName: "Mast_nazro_se" , filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {SongName: "Raata_lambiya" , filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {SongName: "Tum_he_aana" , filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    // {SongName: "Tuzhe_kitana_chahe" , filePath: "jubinSongs/Tuzhe_kitana_chahe.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    console.log(element , i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].SongName; 
})

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

//////////////

const makeAllPlays = ()=>{
    //e.target.classList.add('fa-circle-pause');
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        console.log(e.target);
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerHTML = songs[songIndex].SongName;

        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})
/// next button
document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].SongName;

    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

/// previous button
document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerHTML = songs[songIndex].SongName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})