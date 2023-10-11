let map;
let service;
let infowindow;

let favoritePlaces = [
    "ChIJV6sG5kBbwokR5bm4h2hIOlY",
    "ChIJISXTwWJZwokRIok4xyMeb6g",
    "ChIJVQhDBhxbwokRLwobz9lb_qk",
    "ChIJQ3Jl76hZwokRnS1-MQHYhZE",
    "ChIJuabZo6hZwokRhGPoGjo0H6k",
    "ChIJD-1a9ChawokRnTSi_Et62x4",
    "ChIJxTHke6JZwokRCLWVd99eDBw",
    "ChIJ69NaKJdZwokR3CamunXyYig",
    "ChIJDdKSyCVZwokR-9svvc9YDFo",
    "ChIJk0bzXa9QwokRYKGGCXxU7PY",
    "ChIJ-yUjn9JZwokR7Cq1cegFzZU",
    "ChIJKRVIbKhZwokRBg-yFy8VlKA",
    "ChIJT-gYZKFZwokR7O8LLYuYMjU",
    "ChIJNaUIchtZwokRHI8Pk3mEz1Y",
    "ChIJWUOc55tZwokR9q_g5l051rk",
    "ChIJrZhR0KVZwokRlrdzhVOfCbA",
    "ChIJsdNONuFbwokRLM-yuifjb8k",
    "ChIJKas69o1ZwokRzUumZ0jK0rk",
    "ChIJ8VtP4PhYwokR6uW6rOF7C4U",
    "ChIJxRmE4UhbwokR8u43ucFxTCU",
    "ChIJ11vJWohZwokRpB812SavVWI",
    "ChIJm7ryTglZwokRsgnJB6CDMCo",
    "ChIJC0yxuDxawokR93stpfZoc_A",
    "ChIJ3dbcl41ZwokRouIrXtQ5erk",
    "ChIJ1bOSqylawokRw1zMPdY1HLg",
    "ChIJGxpCtzxawokRWS7MVDYfA8E",
    "ChIJmeKSwPFdwokRZ--71Rq0GBY",
    "ChIJQ-3nEsBZwokRZq2rpFsBSP0",
    "ChIJjyE3Z-9ZwokRuTEUrSQhjCo",
    "ChIJ__-z7kBZwokRezHqB39zBLI",
    "ChIJaVgbdR9awokRqxIwG9AywT4",
    "ChIJI1KV9adZwokRfH-PbjxTx40",
    "ChIJf4XPj4pZwokRjFYw3YKWv7Q",
    "ChIJa7XRZbtZwokRBZtNy1-JaGE",
    "ChIJ7ZZgM4hZwokRddMfsLPztpM",
    "ChIJiXgxF05awokRzcgnxMbCR9U",
    "ChIJK2OWqJxZwokRoCCR3y2v3o0",
    "ChIJGbyHW6hZwokRIGp7M62XV3E",
    "ChIJbwHIighZwokRbdADB-4Hzd8",
    "ChIJmQ7DvBFgwokRBNJbyDc81oI",
    "ChIJQyEs-WFYwokRxcMQc54r9W0",
    "ChIJzRpeq0VZwokRHPVwrwFI5nw",
    "ChIJv4bbdSNZwokRCgKfDGF8az8",
    "ChIJJ8EkR6tZwokR8XihRuI6yW4",
    "ChIJKRkmE5pTwokRG5RiRgqUdtg",
]

function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 40.74, lng: -73.97175 },
    });

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    for (let i = 0; i < favoritePlaces.length; i++) {

        const request = {
            placeId: favoritePlaces[i],
            fields: ["name", "formatted_address", "place_id", "geometry"],
        };

        service.getDetails(request, (place, status) => {
            if (
                status === google.maps.places.PlacesServiceStatus.OK &&
                place &&
                place.geometry &&
                place.geometry.location
            ) {
                const marker = new google.maps.Marker({
                    map,
                    position: place.geometry.location,
                });

                google.maps.event.addListener(marker, "click", () => {
                    const content = document.createElement("div");
                    const nameElement = document.createElement("h2");

                    nameElement.textContent = place.name;
                    content.appendChild(nameElement);

                    const placeAddressElement = document.createElement("p");

                    placeAddressElement.textContent = place.formatted_address;
                    content.appendChild(placeAddressElement);
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                });
            }
        });
    }
}

window.initMap = initMap;