// DOM Elements 
const form = document.querySelector('#search-form');
const input = document.querySelector('#search-term');
const msg = document.querySelector('.form-msg');
const list = document.querySelector('.cities');


// API Key
const apiKey = '';

form.addEventListener('submit', e => {
    e.preventDefault();

    msg.textContent = '';
    msg.classList.remove('visible')

    let inputVal = input.value;

    // check if there's a city that matches criteria
    const listItemsArray = Array.from(list.querySelectorAll('.cities li'));

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = '';
            let cityName = el.querySelector('.city__name').textContent.toLowerCase();
            let cityCountry = el.querySelector('.city__country').textContent.toLowerCase();

            // check for the city country format
            if (inputVal.includes(',')){
                if (inputVal.split(',')[1].length > 4){
                    inputVal.split(',')[0];

                    content = cityName;
                } else {
                    content = `${cityName}, ${cityCountry}`
                }
            } else {
                content = cityName;
            }
            return content === inputVal.toLowerCase()
        })
        if (filteredArray.length > 0) {
			msg.textContent = `Results of ${filteredArray[0].querySelector(".city__name").textContent} are already in Display`;

			msg.classList.add('visible')

			form.reset()
			input.focus()

			return
		}
    }

    // ajax func
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod == '404'){
                throw new Error(`${data.cod}, ${data.message}`)
            }

            const {main, name, sys, weather} = data;

            const icon = `img/weather/${weather[0].icon}.svg`

            // Create the list item for the new city
			const li = document.createElement('li')

			// Define markup
			const markup = `
				<figure>
					<img src="${icon}" alt="${weather[0]['description']}">
				</figure>

				<div>
					<h2>${Math.round(main.temp)}<sup>°C</sup></h2>
					<p class="city__conditions">${weather[0]['description'].toUpperCase()}</p>
					<h3><span class="city__name">${name}</span><span class="city__country">${sys.country}</span></h3>
				</div>
			`

			// Add the new markup to the list item
			li.innerHTML = markup

			// Add the new list item to the page
			list.appendChild(li)
            
        })
        .catch(() => {
            msg.textContent = 'Please give a valid Entry';
            msg.classList.add('visible');
        })

    msg.textContent = ''

	form.reset()
	input.focus()
})
