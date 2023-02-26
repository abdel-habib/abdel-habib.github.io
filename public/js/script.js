// Load the JSON file
fetch('.\\public\\json\\projects.json')
.then(response => response.json())
.then(data => {
    let html = '';
    
    data.forEach((object, index) => {
        // <img onmouseout="${object.image}" onmouseover="${object?.image_animated || ''}" src="${object.image}" alt="Project ${index+1}">
        html += `
        <div class="card">
            <div class="card-image">
                <img onmouseover="this.src = '${object?.image_animated || ''}'" onmouseout="this.src = '${object.image}'" alt="Project ${index+1}" src="${object.image}"> 

            </div>
            <div class="card-content">
                <h3 class="card-title">${object.title}</h3>
                <p class="card-description">${object.description}</p>`
                
                if(object.date != ""){
                    html += 
                    `<p class="card-date">${object.date}</p>`
                }

    html +=
                `
            </div>
        </div>
    `
});
    document.getElementById('card-slider').innerHTML += html;
})
.catch(error => console.error(error));


