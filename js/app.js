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
        const scrn=document.querySelector("#info");
        const banner=document.querySelector("#banner");

        const MOVIE=`https://api.themoviedb.org/3/movie/${localStorage.getItem("movieID")}?api_key=d25d36b5b143baf855bd638c506138a7&language=en-US`;
        fetch(MOVIE)
        .then((response)=>{
            response.json()
            .then((data)=>{
                
                scrn.innerHTML=data.original_title;
                banner.src=`https://image.tmdb.org/t/p/w500/${data.poster_path}`;
                console.log(data);
            })
            .catch()
        })
        .catch((err)=>{
            console.log(err);
        })

        // alert(localStorage.getItem("movieID"));
        // console.log(localStorage.getItem("movieID"))
    },
    Loader()
    {
        document.addEventListener("DOMContentLoaded",()=>{
            const END_POINT="https://api.themoviedb.org/3/movie/now_playing?api_key=d25d36b5b143baf855bd638c506138a7&language=en-US&page=1";
            fetch(END_POINT)
            
            .then((response)=>{
                response.json()
                .then((data)=>{
                    const scrn=document.querySelector("#movieList");
                    let str="";
                    let content="";
                        data.results.forEach((element,re)=> {
                        if(element.overview.length>40)
                        {
                            str=element.overview.slice(0,60)
                        }
                        const date=element.release_date.slice(0,4);

                        console.log(element);
                        content+= `<div class="movieBox"> 
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
            localStorage.setItem("movieID",MovieList[evt.target.id].children[3].innerHTML)
            
            window.location ="html/detail.html";
        });


        })

        
    }
}
main.init();
// main.acccoun t();
    