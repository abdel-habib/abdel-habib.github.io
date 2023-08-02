// Load the JSON file
fetch('.\\public\\json\\projects.json')
.then(response => response.json())
.then(data => {
    let html = '';
    let html_projects_page = '';
    let count = 0;

    // loop for homepage
    data.forEach((object, index) => {
        if(index > 3) return;

        html += `
            <a href="${object.link}" target="_blank" id="card-${index+1}" onmouseover="onHoverCard(${index+1}, '${object?.image_animated || ''}')" onmouseout="onHoverCard(${index+1}, '${object.image}')"`
            
            if(object.link == ""){
                // console.log("HERE")
                html += `class="card inactive-link"`;
            }else{
                html += `class="card"`;
            }

            html +=
            `>
                <div class="card-image">
                    <img onmouseover="this.src = '${object?.image_animated || ''}'" onmouseout="this.src = '${object.image}'" alt="Project ${index+1}" id="card-img-${index+1}" src="${object.image}"> 

                </div>
                <div class="card-content">
                    <h3 class="card-title fs-118">${object.title} <span class="font-color-secondary fs-6 fst-italic">${object?.status ? `(${object?.status})` : ""}</span></h3>
                    <p class="card-description">${object.description}</p>`
                    
                    if(object.date != ""){
                        html += 
                        `
                        <div class="date-content">
                            <p class="card-date">${object.date}</p>
                        </div>
                        `
                    }

            html +=
                        `
                    </div>
                </a>
        `
    });

    // loop for projects page
    data.forEach((object, index) => {
        html_projects_page += `
            <a href="${object.link}" target="_blank" id="card-${index+1}" onmouseover="onHoverCard(${index+1}, '${object?.image_animated || ''}')" onmouseout="onHoverCard(${index+1}, '${object.image}')"`

            if(object.link == ""){
                html_projects_page += `class="card inactive-link"`;
            }else{
                html_projects_page += `class="card"`;
            }

            html_projects_page +=
            ` ">
                <div class="card-image">
                    <img onmouseover="this.src = '${object?.image_animated || ''}'" onmouseout="this.src = '${object.image}'" alt="Project ${index+1}" id="card-img-${index+1}" src="${object.image}"> 

                </div>
                <div class="card-content">
                    <h3 class="card-title fs-118">${object.title} <span class="font-color-secondary fs-6 fst-italic">${object?.status ? `(${object?.status})` : ""}</span></h3>
                    <p class="card-description">${object.description}</p>`

                    if(object.date != ""){
                        html_projects_page += 
                        `
                        <div class="date-content">
                            <p class="card-date">${object.date}</p>
                        </div>
                        `
                    }

                    html_projects_page +=
                    `
                </div>
            </a>
        `
        count++;
    
    })

    let projects = document.getElementById('card-slider');
    let projects_all = document.getElementById('card-slider-all');

    if(projects) projects.innerHTML += html;
    if(projects_all) projects_all.innerHTML += html_projects_page;

    document.getElementById('projects-count').innerHTML = `(${count})`
})
.catch(error => console.error(error));


// onhover change image on all card element
function onHoverCard(index, src){
    document.getElementById(`card-img-${index}`).src = src
}
