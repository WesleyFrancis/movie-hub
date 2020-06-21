
   
    
    document.addEventListener("DOMContentLoaded",()=>{
        const END_POINT="https://api.themoviedb.org/3/movie/now_playing?api_key=d25d36b5b143baf855bd638c506138a7&language=en-US&page=1";
        fetch(END_POINT)
        
        .then((response)=>{
            response.json()
            .then((data)=>{
                
               // console.log(element.overview.length);
                const scrn=document.querySelector("#stuff");
                let str="";
                let content="";
                 data.results.forEach(element => {
                    if(element.overview.length>40)
                    {
                        str=element.overview.slice(0,60)
                    }
                    content+= `<div class="movieBox"> 
                                <div class="movie-title">
                                    ${element.title}
                                </div>
                                <div class="movie-image">
                                    <img src="https://image.tmdb.org/t/p/w500/${element.poster_path}" width="300px">
                                </div>
                                <div class="movie-desc">
                                    <div>${str}&hellip;</div>
                                </div>
                        </div>`;
                    // // console.log(element);
                });
                scrn.innerHTML=content;
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log("error occured"))
    })
    
   

// export default main