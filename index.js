console.log("hola Comics");
const urlBase = "http://gateway.marvel.com/v1/public/comics"
const apikey = "36f4cac91388f458d28460cab71731087a124659"
const comicsPorPagina = 20
let paginaActual = 0
let botonProxPagina = document.querySelector("#prox-pagina")
console.log(botonProxPagina)

// const comics = [
//   {
//     titulo: "100th Anniversary Special (2014) #1",
//     imagenComic: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/53c406e09649c.jpg",
//     fechaDePublicacion: 23 / 7 / 2014,
//     guionistas: "",
//     descripcion:"THE AVENGERS Following the failed Badoon invasion of Earth and America disappearance into the Negative Zone, how will the Avengers of 2061",
//     personajes: [{
//     nombre: "personaje 1",
//     imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/portrait_uncanny.jpg"
//     },
//      {
//         nombre: "personaje 2",
//         imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/portrait_uncanny.jpg"
//      }
//     ]
//   },

//   {
//     titulo: "100th Anniversary Special (2014) #1",
//     imagenComic: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/53c406e09649c.jpg",
//     fechaDePublicacion: 23 / 7 / 2014,
//     guionistas: "",
//     descripcion:"THE AVENGERS Following the failed Badoon invasion of Earth and America disappearance into the Negative Zone, how will the Avengers of 2061",
//     personajes: [{
//     nombre: "personaje 1",
//     imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/portrait_uncanny.jpg"
//     },
//      {
//         nombre: "personaje 2",
//         imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/portrait_uncanny.jpg"
//      }
//     ]
//   },
//   {
//     titulo: "100th Anniversary Special (2014) #1",
//     imagenComic: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/53c406e09649c.jpg",
//     fechaDePublicacion: 23 / 7 / 2014,
//     guionistas: "",
//     descripcion:"THE AVENGERS Following the failed Badoon invasion of Earth and America disappearance into the Negative Zone, how will the Avengers of 2061",
//     personajes: [{
//     nombre: "personaje 1",
//     imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/portrait_uncanny.jpg"
//     },
//      {
//         nombre: "personaje 2",
//         imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/portrait_uncanny.jpg"
//      }
//     ]
//   },
//   {
//     titulo: "100th Anniversary Special (2014) #1",
//     imagenComic: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/53c406e09649c.jpg",
//     fechaDePublicacion: 23 / 7 / 2014,
//     guionistas: "",
//     descripcion:"THE AVENGERS Following the failed Badoon invasion of Earth and America disappearance into the Negative Zone, how will the Avengers of 2061",
//     personajes: [{
//     nombre: "personaje 1",
//     imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/portrait_uncanny.jpg"
//     },
//      {
//         nombre: "personaje 2",
//         imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/portrait_uncanny.jpg"
//      }
//     ]
//   },
//   {
//     titulo: "100th Anniversary Special (2014) #1",
//     imagenComic: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/53c406e09649c.jpg",
//     fechaDePublicacion: 23 / 7 / 2014,
//     guionistas: "",
//     descripcion:"THE AVENGERS Following the failed Badoon invasion of Earth and America disappearance into the Negative Zone, how will the Avengers of 2061",
//     personajes: [{
//     nombre: "personaje 1",
//     imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/portrait_uncanny.jpg"
//     },
//      {
//         nombre: "personaje 2",
//         imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/portrait_uncanny.jpg"
//      }
//     ]
//   },
//   {
//     titulo: "100th Anniversary Special (2014) #1",
//     imagenComic: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/53c406e09649c.jpg",
//     fechaDePublicacion: 23 / 7 / 2014,
//     guionistas: "",
//     descripcion:"THE AVENGERS Following the failed Badoon invasion of Earth and America disappearance into the Negative Zone, how will the Avengers of 2061",
//     personajes: [{
//     nombre: "personaje 1",
//     imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/portrait_uncanny.jpg"
//     },
//      {
//         nombre: "personaje 2",
//         imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/portrait_uncanny.jpg"
//      }
//     ]
//   },
//   {
//     titulo: "100th Anniversary Special (2014) #1",
//     imagenComic: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/53c406e09649c.jpg",
//     fechaDePublicacion: 23 / 7 / 2014,
//     guionistas: "",
//     descripcion:"THE AVENGERS Following the failed Badoon invasion of Earth and America disappearance into the Negative Zone, how will the Avengers of 2061",
//     personajes: [{
//     nombre: "personaje 1",
//     imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/portrait_uncanny.jpg"
//     },
//      {
//         nombre: "personaje 2",
//         imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/portrait_uncanny.jpg"
//      }
//     ]
//   },
//   {
//     titulo: "100th Anniversary Special (2014) #1",
//     imagenComic: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/53c406e09649c.jpg",
//     fechaDePublicacion: 23 / 7 / 2014,
//     guionistas: "",
//     descripcion:"THE AVENGERS Following the failed Badoon invasion of Earth and America disappearance into the Negative Zone, how will the Avengers of 2061",
//     personajes: [{
//     nombre: "personaje 1",
//     imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/portrait_uncanny.jpg"
//     },
//      {
//         nombre: "personaje 2",
//         imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/portrait_uncanny.jpg"
//      }
//     ]
//   },
//   {
//     titulo: "100th Anniversary Special (2014) #1",
//     imagenComic: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/53c406e09649c.jpg",
//     fechaDePublicacion: 23 / 7 / 2014,
//     guionistas: "",
//     descripcion:"THE AVENGERS Following the failed Badoon invasion of Earth and America disappearance into the Negative Zone, how will the Avengers of 2061",
//     personajes: [{
//     nombre: "personaje 1",
//     imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/portrait_uncanny.jpg"
//     },
//      {
//         nombre: "personaje 2",
//         imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/portrait_uncanny.jpg"
//      }
//     ]
//   },
//   {
//     titulo: "100th Anniversary Special (2014) #1",
//     imagenComic: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/53c406e09649c.jpg",
//     fechaDePublicacion: 23 / 7 / 2014,
//     guionistas: "",
//     descripcion:"THE AVENGERS Following the failed Badoon invasion of Earth and America disappearance into the Negative Zone, how will the Avengers of 2061",
//     personajes: [{
//     nombre: "personaje 1",
//     imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/portrait_uncanny.jpg"
//     },
//      {
//         nombre: "personaje 2",
//         imagenPersonaje: "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/portrait_uncanny.jpg"
//      }
//     ]
//   }

// ];


const seccionPrincipal = document.querySelector(".seccion-principal");
const resultadosTitulo = document.querySelector(
  ".resultados-titulo-contenedor"
);
const contenedorDeCards = document.querySelector(
  ".resultados-cards-contenedor"
);

/***☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*
 *                CARDS
 **☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*/

mostrarTarjetasDeComics = () => {
  comics.map((comic) => {
    resultadosTitulo.classList.toggle("is-hidden");

    contenedorDeCards.innerHTML += `
            <article class="card-comic-basica in-stack">
                  <div class="comic-img-contenedor ">              
                      <img src="${comic.imagenComic}" />        
                  </div>   
                  <div class="comic-titulo-contenedor">
                      <h3 class="comic-titulo">${comic.titulo}</h3>
                  </div>
             </article>
        `;
  });
};

mostrarTarjetasDeComics();

// mostrarTarjetaElegida = (tarjeta) => {

//     resultadosTitulo.classList.add("is-hidden")

//     contenedorDeCards.innerHTML = `
//         <article class="card-comic-basica">
//               <div class="comic-img-contenedor">
//                   <img src="${comic.img}" />
//               </div>
//               <div class="comic-titulo-contenedor">
//                   <h3 class="title is-5">${comic.titulo}</h3>
//               </div>

//               <div class="personajes-contenedor">

//               </div>
//          </article>
//     `;
// }

botonProxPagina.onclick = () => {
  paginaActual++
  console.log("pagina actual" + " " + " " + paginaActual)
  buscarComic(paginaActual)
}

const buscarComic = (url, paginaActual, nombreDelComic) => {
  fetch(`${urlBase + url}? apikey = ${apikey} & offset=${paginaActual * comicsPorPagina}`)
  .then((res)=>{
    return res.json()
  })
  .then ((data)=>{
console.log(data)
personajes= data.data.results
  })
}