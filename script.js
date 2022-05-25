//initialising dom elements
const container = document.querySelector('.container')
const component1 = document.querySelector('.select-location')
const component2 = document.querySelector('.confirm-location')
const component3 = document.querySelector('.add-location')

const arrows = document.querySelectorAll('.arrow')
const closeButtons = document.querySelectorAll('.close')
const changeButton = document.querySelector('.falsyy')

const content = document.querySelector('.inner-container')
const loc = document.querySelector('.location-details')



// switching components
function changePage(page1, page2) {
    page1.classList.toggle('hidden')
    page2.classList.toggle('hidden')
}

// back arrow functionality
for (const arrow of arrows) {
    if(arrow.parentElement.parentElement.parentElement.classList.contains('confirm-location')) {
        arrow.addEventListener('click', () => changePage(component1, component2))
    }

    if(arrow.parentElement.parentElement.parentElement.classList.contains('add-location')) {
        arrow.addEventListener('click', () => changePage(component3, component2))
    }
}

// close button functionality
for (const button of closeButtons) {
    if(button.parentElement.parentElement.parentElement.classList.contains('confirm-location')) {
        button.addEventListener('click', () => changePage(component1, component2))
    }
}

// adding add location component in mobile view
changeButton.addEventListener('click', () => changePage(component2, component3))


// getting current location
function getLocation(x) {
    if (navigator.geolocation) {
        changePage(component1, component2)
        navigator.geolocation.getCurrentPosition(function (p) {
            var LatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude)
            var mapOptions = {
                center: LatLng,
                zoom: 18,
                mapTypeId: google.maps.MapTypeId.TERRAIN
            }
            var map = new google.maps.Map(document.querySelector(x), mapOptions)
            var marker = new google.maps.Marker({
                position: LatLng,
                map: map
            })
        })
    } else console.log('Geolocation is not supported by this browser.')
}


// some bad, jugaadu, but necessary code
reqPad = +getComputedStyle(component2).getPropertyValue('padding').slice(-4, -2)
reqHt = content.offsetHeight - reqPad
loc.style.height = reqHt+'px'