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
        
        //------------- VARIABLES -------------------
        const detail=document.querySelector("#detail");
        const movTitle=document.querySelector("#movTitle");
        const movDesc=document.querySelector("#movDesc");
        const movRuntimeDirector=document.querySelector("#movRuntimeDirector");
        const movYearTitle=document.querySelector("#movYearTitle");
        const movScore=document.querySelector("#movScore");
        const poster = document.querySelector("#playTrailer");
        const playTrailer = document.querySelector("#playTrailer");
        const youtubePopOver = document.querySelector("#youtubePopOver");
        const close = document.querySelector("#youtubePopOver button");
        //------------- VARIABLES -------------------
        const url_string = window.location.href;
        const url = new URL(url_string);
        const mov_id = url.searchParams.get("id");
        const page_id = url.searchParams.get("page");
        console.log(mov_id);
        if(mov_id==null||mov_id=="")
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
           // info = JSON.parse(sessionStorage.getItem("movieID"));
           
            
            console.log(poster);
            fetch(`https://api.themoviedb.org/3/movie/${mov_id}?api_key=d25d36b5b143baf855bd638c506138a7&language=en-US`)
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
                    detail.style.backgroundImage=`url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`;
                    movTitle.innerHTML= `${data.title} <span>(${data.release_date.slice(0,4)})</span>`;
                    movDesc.innerHTML= `${data.overview}`;
                   
                  
                    movScore.innerHTML= `Rating - <span>${data.vote_average} </span>/ 10`;
                    poster.style.backgroundImage = `url("https://image.tmdb.org/t/p/w500${data.poster_path}")`;
                })
                .catch()
            })
            .catch()
        }

        playTrailer.addEventListener("click",()=>{
            youtubePopOver.style.display="block";
           const ytplayer=document.querySelector("#ytplayer");
           //&origin=http://example.com
           fetch(`https://api.themoviedb.org/3/movie/${mov_id}/videos?api_key=d25d36b5b143baf855bd638c506138a7&language=en-US`)
           .then((response)=>{
               response.json()
               .then((data)=>{
                ytplayer.setAttribute("src",`https://www.youtube.com/embed/${data.results[0].key}?autoplay=1`);
               })
               .catch()
           })
           .catch()

        })

        close.addEventListener("click",()=>{
            youtubePopOver.style.display="none";
            youtubePopOver.setAttribute("class","");
            youtubePopOver.setAttribute("class","animate__animated animate__backInUp");
        })
        youtubePopOver.addEventListener("click",()=>{
            youtubePopOver.style.display="none";
        })
    },
    Loader()
    {
        const url_string = window.location.href;
        const url = new URL(url_string);
        let  page_id = url.searchParams.get("page");
        let Totalpages;
            console.log(page_id);
        if(page_id==null)
        {
            page_id=1;
        }
        let dataa;
        document.addEventListener("DOMContentLoaded",()=>{
            const END_POINT=`https://api.themoviedb.org/3/movie/now_playing?api_key=d25d36b5b143baf855bd638c506138a7&language=en-US&page=${page_id}`;
            fetch(END_POINT)
            .then((response)=>{
                response.json()
                .then((data)=>{
                    let str="";
                    dataa =data;
                    let content="";
                    const scrn=document.querySelector("#movieList");
                    data.results.forEach((element,re)=> {

                        if(element.overview.length>40)
                        {
                            str=element.overview.slice(0,70)
                        }
                        const date=element.release_date.slice(0,4);
                                    
                        // console.log(element); <button> &nbsp;+&nbsp;</button>
                        content+= `<div class="movieBox animate__animated animate__fadeInUp animate_delay-4s 4s"> 
                                        <div class="rating">${element.vote_average}</div>
                                        <div class="movieImage">
                                            <img id="${element.id}" src="https://image.tmdb.org/t/p/w500/${element.poster_path}" width="300px">
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

                                Totalpages=data.total_pages;

                })
                .catch()
            })
            .catch()
        });

        const pageLeft=document.querySelector("#pageLeft");
        const pageRight=document.querySelector("#pageRight");
        const pageId=document.querySelectorAll(".pageId");

        let movieBox=document.querySelector("#movieList");
        movieBox.addEventListener("click",(evt)=>{
            console.log(evt.target.id);
        window.location =`html/detail.html?id=${evt.target.id}`;
        });

        console.log(page_id);

        if(page_id>1)
        {
            let starter = page_id-2;
            pageId.forEach((ele,key)=>{

                pageId[key].innerHTML = starter;
                pageId[key].href=`index.html?page=${starter}`;
                starter++;
                if(pageId[key].innerHTML==page_id)
                {
                    pageId[key].style.fontWeight="800";
                    pageId[key].style.fontSize="1.2rem";
                    pageId[key].style.color="orange";
                }
            });
        }
            
        pageLeft.addEventListener("click",()=>{
            pageId.forEach((page,key)=>{
                if(pageId[0].innerHTML==1)
                {
                   // break;
                }
                else{
                    const num= parseInt(pageId[key].innerHTML);
                //    console.log(pageId[key]);
                   pageId[key].href=`index.html?page=${num-1}`;
                   pageId[key].innerHTML=num-1;
                }
               

            });
        });

        pageRight.addEventListener("click",()=>{
            console.log(Totalpages);
            pageId.forEach((page,key)=>{
                if(pageId[4].innerHTML==Totalpages)
                {
                    //do cothing
                }
                else
                {
                    const num= parseInt(pageId[key].innerHTML);
                    // console.log(pageId[key]);
                    pageId[key].href=`index.html?page=${num+1}`;
                    pageId[key].innerHTML=num+1;
                }
                   

            });

        });

    }//END LOADER PAGE
}//END MAIN CLASS


main.init();
// main.acccoun t();
//!generic privicy policy
//generic shipping policy
//!generic return policy