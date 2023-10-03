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


})