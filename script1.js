


const API_KEY = "api_key=4bc80c4ca6a889536eb0c4937fc98253";
const BASE_API = 'https://api.themoviedb.org/3/'
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/"


const header = document.getElementById("header");
const title_name = document.getElementById("title_name");
const overView_text = document.getElementById("overView_text");
const main_top = document.getElementById('main_Top');
const main_actor = document.getElementById('main_actor');
movie_id_gettter();

function movie_id_gettter(){

    
    var movie_id = localStorage.getItem("movie_id");
    // localStorage.setItem("movie_id",'');
    

    const MOVIEURL  = `https://api.themoviedb.org/3/movie/`+movie_id+`?api_key=4bc80c4ca6a889536eb0c4937fc98253&append_to_response=credits`
    console.log(MOVIEURL);
    getPopmovies(MOVIEURL);
}




async function getPopmovies(url){
    try {
        
        const res = await fetch(url);
        if(res.status !== 200) throw new errorMonitor("Eroor found");
        const data =await res.json();
        console.log(data);
        showMovieTop(data);
        setcast(data.credits.cast);
        
    
    } catch (error) {
        console.log(error.message);
        
    }
    
    }

    function showMovieTop(data){

        const data1 = [data];
    
        main_top.innerHTML = '';
    
        
        data1.forEach(movie => {
    
            const{title,poster_path,vote_average,overview,id,backdrop_path} = movie;
            const bgrImage = 'http://image.tmdb.org/t/p/w1280' + backdrop_path;
            console.log(bgrImage);
            header.style.backgroundImage = `url(${bgrImage})`
            title_name.innerText = `${title}`
            overView_text.innerText = `${overview}`
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
    
            
    
            <img  src="${IMG_BASE_URL+poster_path}" alt="${title}  id='btn_img'">
    
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>OverViwe</h3>
                    ${overview}
                </div>
                
            
            `
            main_top.appendChild(movieEl);
            
        }
        
        );
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

function setcast(data){

    console.log(data);

    main_actor.innerHTML = '';
    
    
        data.forEach(movie => {
    
            const{character,original_name,profile_path,id} = movie;
            const bgrImage = 'http://image.tmdb.org/t/p/w500' + profile_path;
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie_actor');
            movieEl.innerHTML = `
    
            
    
            <img onclick='navigation(${id})' src="${IMG_BASE_URL+profile_path}" alt="${character}  id='btn_img'">
    
                <div class="movie-info">
                    <h2>${original_name}</h2>
                    <h3>${character}</h3>
                    
                </div>
                
                
            
            `
            main_actor.appendChild(movieEl);
            
        });


}

function navigation(data){

    console.log(data);
    localStorage.setItem("actor_id",`${data}`);
    console.log("updated")
    window.location.href = 'index_cast.html';

}