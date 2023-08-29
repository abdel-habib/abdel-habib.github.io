const projectsContainer = document.getElementById('card-slider');
const projectsAllContainer = document.getElementById('card-slider-all');
const projectsCountElement = document.getElementById('projects-count');
const yearElement = document.getElementById('year');

const fetchProjects = async () => {
    try {
        const response = await fetch('./public/json/projects.json');
        const data = await response.json();

        let html = '';
        let htmlProjectsPage = '';
        let count = 0;

        const createCardHTML = (object, index, containerId) => {
            const imageSrc = object?.image_animated || object.image;
            const cardClass = object.link ? 'card' : 'card inactive-link';

            return `
                <a href="${object.link}" target="_blank"
                    id="card-${index + 1}"
                    onmouseover="onHoverCard(${index + 1}, '${object?.image_animated || ''}')"
                    onmouseout="onHoverCard(${index + 1}, '${object.image}')"
                    class="${cardClass}">
                    <div class="card-image">
                        <img onmouseover="this.src = '${object?.image_animated || ''}'"
                            onmouseout="this.src = '${object.image}'"
                            alt="Project ${index + 1}"
                            id="card-img-${index + 1}"
                            src="${imageSrc}">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title fs-118">${object.title} 
                            <span class="font-color-secondary fs-6 fst-italic">
                                ${object?.status ? `(${object.status})` : ''}
                            </span>
                        </h3>
                        <p class="card-description">${object.description}</p>
                        ${object.date ? `<div class="date-content"><p class="card-date">${object.date}</p></div>` : ''}
                    </div>
                </a>`;
        };

        data.slice(0, 4).forEach((object, index) => {
            html += createCardHTML(object, index, 'card-slider');
        });

        data.forEach((object, index) => {
            htmlProjectsPage += createCardHTML(object, index, 'card-slider-all');
            count++;
        });

        if (projectsContainer) {
            projectsContainer.innerHTML += html;
        }

        if (projectsAllContainer) {
            projectsAllContainer.innerHTML += htmlProjectsPage;
        }

        if (projectsCountElement) {
            projectsCountElement.innerHTML = `(${count})`;
        }

        if (yearElement) {
            yearElement.innerHTML = new Date().getFullYear();
        }
    } catch (error) {
        console.error(error);
    }
};

// onhover change image on all card elements
function onHoverCard(index, src) {
    const cardImage = document.getElementById(`card-img-${index}`);
    if (cardImage) {
        cardImage.src = src;
    }
}

fetchProjects();
