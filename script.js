const urlbase = "https://api.themoviedb.org/3/trending/all/day";
const apiKey = "?api_key=d61467b778cbd181cd3d03956a11b17c&language=es-AR";
const imgbase = "https://image.tmdb.org/t/p/w500";
const $cartelera = document.querySelector("#cartelera");
const $anterior = document.getElementById("anterior");
const $siguiente = document.getElementById("siguiente");

var pagina = 1;

async function conectar() {
    let resp = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=d61467b778cbd181cd3d03956a11b17c&language=es-AR&page=${pagina}`
    );
    let data = await resp.json();
    console.log(data);
    return data;
}

async function mostrarPeliculas() {
    $cartelera.innerHTML = "";
    let peliculas = await conectar(
        `https://api.themoviedb.org/3/trending/all/day?api_key=d61467b778cbd181cd3d03956a11b17c&language=es-AR&page=${pagina}`
    );
    peliculas.results.forEach((pelicula) => {
        let nombre = "";
        if (pelicula.title === "") {
            nombre = pelicula.title;
        } else if (pelicula.name === undefined) {
            nombre = pelicula.original_title;
        } else {
            nombre = pelicula.name;
        }
        $cartelera.innerHTML += `
        <div class="card text-start">
        <img class="card-img-top" src="${imgbase}${pelicula.poster_path}" alt="${nombre}">
        <div class="card-body">
        <h4 class="card-title">${nombre}</h4>
        <p class="card-text">${pelicula.overview}</p>
        <a href="https://www.imdb.com/find/?q=${nombre}&ref_=nv_sr_sm" target=_"black" class="btn" id="btninfo">Ver mas info</a>
        </div>
        </div>`;
    });
}

mostrarPeliculas();

$anterior.addEventListener("click", () => {
    if (pagina === 1) {
        alert("No existen películas anteriores");
    } else {
        pagina -= 1;
        mostrarPeliculas();
    }
});
$siguiente.addEventListener("click", () => {
    pagina += 1;
    mostrarPeliculas();
});
