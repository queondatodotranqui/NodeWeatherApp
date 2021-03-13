
const weatherForm = document.querySelector('form');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    let place = document.querySelector('input').value;

    fetch(`http://localhost:3000/weather?address=${place}`)
        .then((response)=>{return response.json()})
        .then((data)=>{
            if(!data.error){
                document.getElementById('title').innerText = ''
                document.getElementById('title').classList.remove('p-3');

                document.getElementById('temp').innerText = `Temperature: ${data.weather.temp.temperature}°C`;
                document.getElementById('wind').innerHTML = `
                    Wind
                    <ul>
                        <li>Speed: ${data.weather.temp.wind_speed}</li>
                        <li>Direction: ${data.weather.temp.wind_dir}</li>
                    </ul>
                `;
                document.getElementById('feels').innerText = `Feels like: ${data.weather.temp.feelslike}`;
                document.getElementById('description').innerText = `It is ${data.weather.temp.weather_descriptions[0]}`;
                document.getElementById('country').innerText = data.weather.country;

                document.querySelectorAll('.item').forEach((item)=>{
                    item.classList.add('details');
                })
                if(data.weather.country === 'Argentina'){
                    document.getElementById('place').innerText = new Date();
                } else if (data.weather.country !== 'Argentina'){
                    document.getElementById('place').innerText = '';
                }


                document.querySelector('input').value = '';
            } else if(data.error){
                alert(data.error);
                document.querySelector('input').value = '';
            }
        })
})
