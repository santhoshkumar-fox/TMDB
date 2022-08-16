


const API_KEY = "api_key=4bc80c4ca6a889536eb0c4937fc98253";
const BASE_API = 'https://api.themoviedb.org/3/'
const POP_URL = BASE_API + 'discover/movie?sort_by=popularity.desc&' + API_KEY;
const KIDS_URL = BASE_API + 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&' + API_KEY;
const DRAMA_URL = BASE_API +'discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&'+API_KEY;
const BEST_URL  = BASE_API + 'discover/movie?with_genres=18&primary_release_year=2014&' + API_KEY;
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500"
const SEARCH_URL = BASE_API + 'search/movie?' +API_KEY;

const main = document.getElementById('main');
const main_kid = document.getElementById("main_kids")
const main_Drama = document.getElementById("main_Drama");
const main_Best = document.getElementById('main_Best');
const main_top = document.getElementById('main_Top');
const form = document.getElementById('form')
const search = document.getElementById("search");
const titleText = document.getElementById('popular_text');
const container = document.getElementsByClassName("container");



 


// #events

getPopmovies(POP_URL);
getKIDmovies(KIDS_URL);
getDramamovies(DRAMA_URL);
getBestmovies(BEST_URL);

function myfun(aa){

    console.log(aa);
    localStorage.setItem("movie_id",`${aa}`);
    console.log("updated")
    window.location.href = 'index1.html';
}


async function getPopmovies(url){
try {
    
    const res = await fetch(url);
    if(res.status !== 200) throw new errorMonitor("Eroor found");
    const data =await res.json();
    console.log(data.results);
    showMovieTempPOP(data.results);
    showMovieTop(data.results[0]);

} catch (error) {
    console.log(error.message);
    
}

}
function showMovieTempPOP(data){

    main.innerHTML = '';


    data.forEach(movie => {

        const{title,poster_path,vote_average,overview,id} = movie;
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie');
    
        movieEl.innerHTML = `
        
        <img  onclick ='myfun(${id})' src="${IMG_BASE_URL+poster_path}" alt="${title}  id='btn_img'">

            <div  class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>OverViwe</h3>
                ${overview}
            </div>
            
        
        `
        main.appendChild(movieEl);
        
    }

    

    );
}
function showMovieTop(data){

    const data1 = [data];

    main_top.innerHTML = '';


    data1.forEach(movie => {

        const{title,poster_path,vote_average,overview,id} = movie;
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie');
        movieEl.innerHTML = `

        <h3>#Movie of the Month</h3>

        <img src="${IMG_BASE_URL+poster_path}" alt="${title}  id='btn_img'">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">#1</span>
            </div>
            <div class="overview">
                <h3>OverViwe</h3>
                ${overview}
            </div>
            
        
        `
        main_top.appendChild(movieEl);
        
    });
}
async function getKIDmovies(url){
    try {
        
        const res = await fetch(url);
        if(res.status !== 200) throw new errorMonitor("Eroor found");
        const data =await res.json();
        console.log(data.results);
        showMovieTempKID(data.results);
    
    } catch (error) {
        console.log(error.message);
        
    }
    
    }
    function showMovieTempKID(data){
    
        main_kid.innerHTML = '';
    
    
        data.forEach(movie => {
    
            const{title,poster_path,vote_average,overview,id} = movie;
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
    
            <img onclick ='myfun(${id})' src="${IMG_BASE_URL+poster_path}" alt="${title}">
    
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>OverViwe</h3>
                    ${overview}
                </div>
            
            `
            main_kid.appendChild(movieEl);
            
        });
    }
function getColor(vote){
    if(vote >8){
        
        return 'green';
    }
    else if(vote >=7){
        return 'orange';
    }
    else{
        return 'red';
    }

}

async function getDramamovies(url){
    try {
        
        const res = await fetch(url);
        if(res.status !== 200) throw new errorMonitor("Eroor found");
        const data =await res.json();
        console.log("drama");
        console.log(data.results);
        showMovieTempDrama(data.results);
    
    } catch (error) {
        console.log(error.message);
        
    }
    
    }
    function showMovieTempDrama(data){
    
        main_Drama.innerHTML = '';
    
    
        data.forEach(movie => {
    
            const{title,poster_path,vote_average,overview,id} = movie;
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie');
            console.log(vote_average);
            movieEl.innerHTML = `
    
            <img onclick ='myfun(${id})' src="${IMG_BASE_URL+poster_path}" alt="${title}">
    
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>OverViwe</h3>
                    ${overview}
                </div>
            
            `
            main_Drama.appendChild(movieEl);
            
        });
    }

    async function getBestmovies(url){
        try {
            
            const res = await fetch(url);
            if(res.status !== 200) throw new errorMonitor("Eroor found");
            const data =await res.json();
            console.log("drama");
            console.log(data.results);
            showMovieTempBest(data.results);
        
        } catch (error) {
            console.log(error.message);
            
        }
        
        }
        function showMovieTempBest(data){
        
            main_Best.innerHTML = '';
        
        
            data.forEach(movie => {
        
                const{title,poster_path,vote_average,overview,id} = movie;
                const movieEl = document.createElement('div')
                movieEl.classList.add('movie');
                console.log(vote_average);
                movieEl.innerHTML = `
        
                <img onclick ='myfun(${id})' src="${IMG_BASE_URL+poster_path}" alt="${title}">
        
                    <div class="movie-info">
                        <h3>${title}</h3>
                        <span class="${getColor(vote_average)}">${vote_average}</span>
                    </div>
                    <div class="overview">
                        <h3>OverViwe</h3>
                        ${overview}
                    </div>
                
                `
                main_Best.appendChild(movieEl);
                
            });
        }

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const values = search.value;

    if(values){

        getPopmovies(SEARCH_URL +'&query='+values);
    }
});
