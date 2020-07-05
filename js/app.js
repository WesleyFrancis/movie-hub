const main=
{
    init()
    {   
        const index=document.querySelector("#index");
        const detail=document.querySelector("#detail");
        if(index!=null)
        {
            this.Loader();
        }
        if(detail!=null)
        {
            this.Display();
        }
    },
    Display()
    {
        // ! Implement the ability to fetch information from the url if it does not exist in session data
        const url_string = window.location.href;
        const url = new URL(url_string);
        const mov_id = url.searchParams.get("id");console.log(`movie Id - ${mov_id}`);
        //------------- VARIABLES -------------------
        const detail=document.querySelector("#detail");
        const movTitle=document.querySelector("#movTitle");
        const movDesc=document.querySelector("#movDesc");
        const movRuntimeDirector=document.querySelector("#movRuntimeDirector");
        const movYearTitle=document.querySelector("#movYearTitle");
        const movScore=document.querySelector("#movScore");
        const poster = document.querySelector("#playTrailer");

        //------------- VARIABLES -------------------

        if(sessionStorage.getItem("movieID")==null)
        {

            window.location = "../index.html";
        }
        else
        {
            BuildDetailPage();
        }

        function BuildDetailPage()
        {
            let info;
            let genres= "";
            //use data in session storage
            info = JSON.parse(sessionStorage.getItem("movieID"));
            console.log(info);
            detail.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${info.backdrop_path})`;
            movTitle.innerHTML= `${info.title} <span>(${info.release_date.slice(0,4)})</span>`;
            movDesc.innerHTML= `${info.overview}`;
            movYearTitle.innerHTML= `${info.title}`;
            movRuntimeDirector.innerHTML= `${info.title}`;
            movScore.innerHTML= `Rating - <span>${info.vote_average} </span>/ 10`;
            poster.style.backgroundImage = `url("https://image.tmdb.org/t/p/w500${info.poster_path}")`;
            console.log(poster);
            fetch(`https://api.themoviedb.org/3/movie/${info.id}?api_key=d25d36b5b143baf855bd638c506138a7&language=en-US`)
            .then((response)=>{
                response.json()
                .then((data)=>{
                    console.log(data)

                    data.genres.forEach((cnt,r)=>{
                        if(r==0)
                        {
                            genres += cnt.name;
                        }
                        else{
                            genres += ", "+cnt.name;
                        }
                    })

                    movYearTitle.innerHTML = `Genres  - ${genres}`
                    movRuntimeDirector.innerHTML=`Runtime - ${data.runtime} mins`;
                })
                .catch()
            })
            .catch()
        }
    },
    Loader()
    {
        let dataa;
        document.addEventListener("DOMContentLoaded",()=>{
            const END_POINT="https://api.themoviedb.org/3/movie/now_playing?api_key=d25d36b5b143baf855bd638c506138a7&language=en-US&page=1";
            fetch(END_POINT)
            
            .then((response)=>{
                response.json()
                .then((data)=>{
                    const scrn=document.querySelector("#movieList");
                    
                    let str="";
                    
                    let content="";
                    dataa = data;
                        data.results.forEach((element,re)=> {

                        if(element.overview.length>40)
                        {
                            str=element.overview.slice(0,60)
                        }
                        const date=element.release_date.slice(0,4);
                        
                       // console.log(element);
                        content+= `<div class="movieBox animate__animated animate__fadeInUp animate_delay-4s 4s"> 
                                        <div class="rating">${element.vote_average}</div>
                                        <div class="movieImage">
                                            <img id="${re}" src="https://image.tmdb.org/t/p/w500/${element.poster_path}" width="300px">
                                        </div>
                                        <div class="movie-title">
                                            ${element.title} &nbsp;-${date} <br/><br/><span>${str}&hellip;<button> &nbsp;+&nbsp;</button></span>
                                        </div>

                                        <div class="movieID">
                                            ${element.id}
                                        </div>
                                    </div>`;  
                    });
                    
                    scrn.innerHTML=content;
                     
                })
                .catch(err=>console.log(err))
            })
            .catch(err=>console.log("error occured"))




        
        let movieBox=document.querySelector("#movieList");
        movieBox.addEventListener("click",(evt)=>{
            let MovieList=document.querySelectorAll(".movieBox");
            // alert(evt.target);
            sessionStorage.setItem("movieID",JSON.stringify(dataa.results[evt.target.id]))
          //  console.log(dataa.results[evt.target.id]);
      //  console.log(evt.target.id);
            window.location =`html/detail.html?id=${dataa.results[evt.target.id].id}`;
        });
        })
    },
    GetInfo(Stringg)
    {
        let info="s";
        

        
    }
}
main.init();
// main.acccoun t();
    