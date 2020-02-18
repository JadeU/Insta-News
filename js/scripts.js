
const sections = document.getElementById('sections');
let newsImagesList = document.createElement('ul');
let newsImage = document.createElement('li');
let results = document.getElementById('result');


sections.addEventListener('change', function (event) {
    let category = event.target.value;

    $.ajax({
        method: 'GET',
        url: `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=GFGAWNJfATntrZDFmzaGBZ8ArViC8R26`


        let $loading = $('#loading').hide();
                   
            $(document)
                .ajaxStart(function () {
                     $loading.show();
            })
            .ajaxStop(function (results) {
                      
            $loading.hide();
            });
        
    })
        .done(function (data) {
            console.log(data);

         
            results.innerHTML = '';
            //filter out articles without an image 
            //limit to 12 articles 
            const articleImages = data.results
                .filter(item => item.multimedia !== null)
                .slice(0, 12);

           
            console.log(articleImages);

            articleImages.forEach(item => {
                console.log("forEach");
                const li = document.createElement('li');
            

                const background = document.createElement('div');
                background.setAttribute('class', 'news-image'); // text-background
                background.setAttribute('style', `background-image: url(${item.multimedia[0].url})`);

                const paragraph = document.createElement('p');
                paragraph.setAttribute('class', 'article-text');
                paragraph.innerText = item.abstract;
                background.append(paragraph);

                
                const link = document.createElement('a');
                link.setAttribute('href', item.url);
                link.setAttribute('target', '_blank');

                link.append(background);
                li.append(link);
                results.append(link);

            });//end of foreach
        });// end of done/ajax
});//end of change


