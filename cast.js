


const API_KEY = "api_key=4bc80c4ca6a889536eb0c4937fc98253";
const BASE_API = 'https://api.themoviedb.org/3/'
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500"


const header = document.getElementById("header");
const title_name = document.getElementById("title_name");
const overView_text = document.getElementById("overView_text");
const main_top = document.getElementById('main_Top');
const main_actor = document.getElementById('main_actor');
movie_id_gettter();

function movie_id_gettter(){

    
    var movie_id = localStorage.getItem("actor_id");
    // localStorage.setItem("movie_id",'');
    

    const MOVIEURL  = `https://api.themoviedb.org/3/person/`+movie_id+`?api_key=4bc80c4ca6a889536eb0c4937fc98253&append_to_response=credits `
    console.log(MOVIEURL);
    getPopmovies(MOVIEURL);
}




async function getPopmovies(url){
    try {
        
        const res = await fetch(url);
        if(res.status !== 200) throw new errorMonitor("Eroor found");
        const data =await res.json();
        console.log(data);

        showMovieTop(data)
        setcast(data.credits.cast);
        
        
    
    } catch (error) {
        console.log(error.message);
        
    }
    
    }

    function showMovieTop(data){

        const data1 = [data];
    
        main_top.innerHTML = '';
    
        
        data1.forEach(movie => {
    
            const{name,biography,birthday,profile_path} = movie;
            const bgrImage = "https://assets.morningconsult.com/wp-uploads/2022/05/04145840/GettyImages-163296518-scaled.jpg" ;
            console.log(bgrImage);
            header.style.backgroundImage = `url(${bgrImage})`
            title_name.innerText = `${name}`
            overView_text.innerText = `${biography}`
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
    
            
    
            <img  src="${IMG_BASE_URL+profile_path}" alt="${name}  id='btn_img'">
    
                <div class="movie-info">
                    <h3>${name}</h3>
                    
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
    
            const{character,title,poster_path,id} = movie;
            const bgrImage = 'http://image.tmdb.org/t/p/w500' + poster_path;
            const movieEl = document.createElement('div')
            movieEl.classList.add('movie_actor');
            movieEl.innerHTML = `
    
            
    
            <img onclick='navigation(${id})' src="${IMG_BASE_URL+poster_path}" alt="${character}  id='btn_img'">
    
                <div class="movie-info">
                    <h2>${title}</h2>
                    
                    <h3>${character}</h3>
                    
                </div>
                
                
            
            `
            main_actor.appendChild(movieEl);
            
        });


}

function navigation(aa){

    console.log(aa);
    localStorage.setItem("movie_id",`${aa}`);
    console.log("updated")
    window.location.href = 'index1.html';

}