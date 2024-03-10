const contriesList = document.getElementById('countries-list');
const bodyRef = document.querySelector('body');

const getCountries = async () => {
    try {
        const response = await fetch('https://restcountries.com/v3/all');
        if (!response.ok) {
            throw new Error('Ha surgido un error', response.status);
        } else {
            const data = await response.json();
            showContries(data);
        }
    } catch (error) {
        console.log('Error al obtener los datos', error);
    }
}

getCountries();

function showContries(data) {
    const listWrap = document.createElement('ul');
    listWrap.classList.add('allList');
    contriesList.appendChild(listWrap);
    
    data = data.sort((a, b) => {
        const nameA = a.name.common.toUpperCase();
        const nameB = b.name.common.toUpperCase();

        if (nameA < nameB) {
            return -1;
        } else {
            return 1;
        }
    });

    data.forEach(element => {
        const listElement = document.createElement('li');
        listElement.classList.add('listElement');

        listElement.addEventListener('click', () => {
            const showDetailedInfo = document.createElement('div');
            showDetailedInfo.classList.add('detailedInfo')

            showDetailedInfo.innerHTML = `
            <div id='backColor' class='detailedInfo__back'>
                <div class='detailedInfo__data'>
                    <img class='detailedInfo__img' src='${element.flags[1]}' alt='${element.name} flag image' /img>
                    <ul class='detailedInfo__list'>
                        <li class='detailedInfo__name'>${element.name.common}</li>
                        <li>Capital: ${element.capital}</li>
                        <li>Poblacion: ${element.population}</li>
                        <li>Lado de la carretera: ${element.car.side}</li>
                    </ul>
                </div>
                <button id='closeInfo' class='detailedInfo__closeButton'>Close</button>
            </div>
            `;
            
            bodyRef.appendChild(showDetailedInfo);
            
            const closeButton = document.getElementById('closeInfo');

            closeButton.addEventListener('click', () => {
                event.preventDefault();
                bodyRef.removeChild(showDetailedInfo);
            })
        })

        listElement.innerHTML = `
        <img class='flagImg' src='${element.flags[1]}' alt='${element.name} flag image' /img>
        <p class='flagName'>${element.name.common}</p>`;

        listWrap.appendChild(listElement);
    });
}