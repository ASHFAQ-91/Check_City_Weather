const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const day = document.getElementById('day');
const today_date = document.getElementById('today_date');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if (cityVal === "") {
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=ef7559435e537de071e558bd4f44e043`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];                 // array of an object

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;

            const tempStatus = arrData[0].weather[0].main;

            //condition to check sunny or cloudy
            if (tempStatus == "Sunny" || tempStatus == "Clear") {
                temp_status.innerHTML =
                    "<i class='fa-solid fa-sun' style='color:#edc61b'></i>";
            } else if (tempStatus == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fa-solid fa-cloud' style='color:#f1f2f6'></i>";
            } else if (tempStatus == "Rainy") {
                temp_status.innerHTML =
                    "<i class='fa-solid fa-cloud-rain' style='color:#a4b0be'></i>";
            } else if (tempStatus == "Haze") {
                temp_status.innerHTML =
                    "<i class='fa-solid fa-smog' style='color:#888'></i>"
            }
            else {
                temp_status.innerHTML =
                    "<i class='fa-solid fa-cloud-sun' style='color:#5896ba'></i>";
            }
            datahide.classList.remove('data_hide');
            // console.log(data);

            const getCurrentDay = () => {
                var weekday = new Array(7);    //create array
                weekday[0] = "Sun";
                weekday[1] = "Mon";
                weekday[2] = "Tue";
                weekday[3] = "Wed";
                weekday[4] = "Thr";
                weekday[5] = "Fri";
                weekday[6] = "Sat";
    
                let currentTime = new Date();
                let r_day = weekday[currentTime.getDay()];
                return r_day;
            };

            const getCurrentMon_Date = () => {
                var months = new Array(12);                         //create array
                months[0] = "Jan";
                months[1] = "Feb";
                months[2] = "Mar";
                months[3] = "Apr";
                months[4] = "May";
                months[5] = "Jun";
                months[6] = "Jul";
                months[7] = "Aug";
                months[8] = "Sep";
                months[9] = "Oct";
                months[10] = "Nov";
                months[11] = "Dec";
    
                let curMonth_Date = new Date();
                var month = curMonth_Date.getMonth();
                month = months[month];
                var date = curMonth_Date.getDate();
                if (date < 10) date = "0" + date;
                // console.log(months[month] + "-" + date);
                return `${month} ${date}`;
            }


            day.innerText = getCurrentDay();
            today_date.innerText = getCurrentMon_Date();
        } catch {
            city_name.innerText = `Plz enter the correct city name.`;
            datahide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo);