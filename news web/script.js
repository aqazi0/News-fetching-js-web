document.getElementById('searchform').addEventListener('submit',function(e){
    let keyword=document.querySelector('#txt').value;
    let apiKey='8cf461987172a9487b5168c19c7d3977';
    e.preventDefault();
    const xhr= new XMLHttpRequest();    
    xhr.open('GET',`https://gnews.io/api/v4/search?q=${keyword}&token=${apiKey}`, true);
    xhr.onload=function() {
        if(this.status === 200){
            let obj =JSON.parse(this.responseText)
            let newsacc=document.getElementById('newsacc');
            let accitem=''
            for (let i = 0; i < obj.articles.length; i++) {
            accitem= accitem+`
                <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading${i}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${i}" aria-expanded="false" aria-controls="flush-collapseOne">
                    ${obj.articles[i].title}
                    </button>
                </h2>
                <div id="flush-collapse${i}" class="accordion-collapse collapse" aria-labelledby="flush-heading${i}" data-bs-parent="#newsacc">
                    <div class="accordion-body"> ${obj.articles[i].description} <p>To read full news, <a href='${obj.articles[i].source.url}' target='_blank'>click here</a></p> <p><b>Published At :</b>${obj.articles[i].publishedAt}</p><p><b>Source :</b>${obj.articles[i].source.name}</p></div>

                </div>
                </div>
            `
    }
    document.getElementById('newsacc').innerHTML=accitem;
    }
        else
            console.error('There is some error');
    }
    xhr.send();
    document.getElementById('txt').value='';

    document.getElementById('search').addEventListener('input',function(e){
        sval=document.getElementById('search').value;
        news=document.getElementsByClassName('accordion-item');
        Array.from(news).forEach(element => {
            heading=element.getElementsByTagName('h2')[0].innerText;
            des=element.getElementsByClassName('accordion-body')[0].innerText;
            if(heading.includes(sval)||des.includes(sval)){
                element.style.display="block";
            }
            else{
                element.style.display="none";
            }
        });
    });
});