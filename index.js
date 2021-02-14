const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

let comics = [];


const API_KEY = 'b1ee9360739b9c7554ec7be096d4d06f'
const BASE_URL = 'https://gateway.marvel.com/v1/public'

let offset = 0
let paginaActual = 0


const seccionPrincipal = $(".seccion-principal");
const resultadosTitulo = $(".resultados-titulo-contenedor");
const cantidadDeResultados = $(".cantidad-resultados")
const contenedorDeCards = $(".resultados-cards-contenedor");

/**  RUTAS */
const getComics = `${BASE_URL}/comics?apikey=${API_KEY}`;
const getPersonajes = `${BASE_URL}/charactersapikey=${API_KEY}`;
let queryParams = `&offset=${offset}`;



const construirURL = (endpoint, queryParams) => {
  return `${endpoint}${queryParams}`
}

const actualizarQueryParams = (query) =>{
  queryParams += query;
  return queryParams
}

// const fetchURL = async (url) => {
//   console.log(url)
//   const respuesta = await fetch(url)
//   const data = await respuesta.json()
//   console.log(data)
//   return data
// }

const borrarContenidoHTML = (elemento) => {
    elemento.innerHTML = ``;
}

const esconder = (elemento) => {
  elemento.classList.add("is-hidden")
}

const mostrar = (elemento) => {
  elemento.classList.remove("is-hidden")
}

crearTarjetasDeComics = (data) => {
  comics = data.data.results
  
  comics.map((comic) => {
    resultadosTitulo.classList.toggle("is-hidden");
    cantidadDeResultados.textContent = ` ${data.data.count}`;

    contenedorDeCards.innerHTML += `
            <article class="card-comic-basica in-stack">
                  <div class="comic-img-contenedor ">              
                      <img src="${comic.thumbnail.path}.jpg" />        
                  </div>   
                  <div class="comic-titulo-contenedor">
                      <h3 class="comic-titulo">${comic.title}</h3>
                  </div>
             </article>
        `;
  });
}

buscarPersonaje = (url) => {
  const personaje = {};

  fetch(`${url}?apikey=${API_KEY}`)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log(data)
    personaje = data;   
    console.log(personaje)
  })
// falta resolver bug de como retornar esto luego del fetch
  return personaje
}

buscarImagenDePersonaje = (url) => {
  console.log(url);
  const personaje = buscarPersonaje(url);
  imgPersonaje = `${personaje.data.results.thumbnail.path}.${personaje.data.results.thumbnail.extension}`;
  console.log(imgPersonaje)
  return imgPersonaje
}

crearTarjetaDetalleDeComic = (comicCardElegida) => {

  seccionPrincipal.innerHTML = `
 
             <div class= "card-detalle-contenedor">
               <div class= "card-comic-detalle-contenedor">
                   <div class= "comic-img-contenedor">
                       <img class= "comic-img" src="${comicCardElegida.thumbnail.path}.jpg">
                   </div>
                   <div class= "comic-contenido-contenedor">
                       <h1 class= "comic-contenido-titulo">${comicCardElegida.title}</h2>
                       <h3>Publicado:</h3>
                       <p>${Date(comicCardElegida.dates[1].date)}</p>
                       <h3>Guionistas:</h3> 
                       <p class= "guionistas-nombres"></p>
               
                       <h3>Descripción: </h3>
                       <p>${comicCardElegida.title}</p>
                   </div>
               </div>
 
               <div class= "personajes-contenedor">
                   <h3>Personajes</h3>
                   <h4><span class="cantidad-personajes">${comicCardElegida.characters.available}</span> ENCONTRADOS</h4>
                   <div class= "personajes-cards-contenedor">
                   
                   </div>               
               </div>
           </div>      
           `;


           // rellenar creadores
          const creadores = comicCardElegida.creators.items
          const guionistasNombres = $(".guionistas-nombres")
              
          creadores.forEach(creador=> {
              guionistasNombres.innerHTML += `
              ${creador.name} - 
              `
          }) //cierra foreach de creadores

           

          // rellenar tarjetas de personajes
          const personajes = comicCardElegida.characters.items
          const todasLasCardsDePersonajes = $(".personajes-cards-contenedor")

          personajes.forEach(personaje => {
     
            todasLasCardsDePersonajes.innerHTML += `
                <article class= "card-personaje-simple">
                    <div class="personaje-img-contenedor">              
                        <img src="${buscarImagenDePersonaje(personaje.resourceURI)}.jpg"/>        
                    </div>   
                    <div class="personaje-nombre-contenedor">
                        <h3 class="personaje-nombre">${personaje.name}</h3>
                    </div>
                </article> 
            `            
          }) // cierra el foreach de personajes


}


const listarComics = (url) => {

  borrarContenidoHTML(contenedorDeCards);
  mostrar(resultadosTitulo);
  mostrar(cantidadDeResultados);

  fetch(`${url}`)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log(data)
    crearTarjetasDeComics(data)
    
    // ABRIR CARD DETALLE CON ONCLICK

    const todasLasCardsDeComics = $$(".card-comic-basica")

    todasLasCardsDeComics.forEach((comicCard, cardIndice) => {
      comicCard.onclick = () =>  {

           const comicCardElegida = comics[cardIndice]

           borrarContenidoHTML(contenedorDeCards);
           esconder(resultadosTitulo);
           esconder(cantidadDeResultados);
 
           crearTarjetaDetalleDeComic(comicCardElegida);
        
      }; // cierra el onclick
    }); // cierra el foreach

 }) // cierra el then
  .catch((err) => {
    console.log(err)
    seccionPrincipal.textContent = "No pudimos encontrar tu busqueda"
  })
  
 };


/***☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*
 *                PAGINACION
 **☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*/

const pagAnterior = $(".pagina-anterior")
const pagSiguiente = $(".pagina-siguiente")
const pagPrimera = $(".pagina-primera")
const pagUltima = $(".pagina-ultima")
const botonesPaginacion = $$(".paginacion-btn")

botonesPaginacion.forEach((btnPaginacion)=> {
  btnPaginacion.onclick = () => {
      if(btnPaginacion.classList.contains( 'pagina-primera' )){
        mostrarTarjetasDeComics("https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f");
      }else if(btnPaginacion.classList.contains( 'pagina-anterior' )){
        mostrarTarjetasDeComics("https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f");
      }else if(btnPaginacion.classList.contains( 'pagina-siguiente' )){
        mostrarTarjetasDeComics("https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f");
      }else if(btnPaginacion.classList.contains( 'pagina-ultima' )){
        mostrarTarjetasDeComics("https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f");
      }else {
        mostrarTarjetasDeComics("https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f");
      }
    }
})



/***☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*
 *                INICIALIZAR
 **☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*/

const inicializar = () => {
  
  listarComics(construirURL(getComics, actualizarQueryParams("&orderBy=title")))
}


inicializar();

/**Rutas comics
 * ordenado a-z
 construirURL(getComics, actualizarQueryParams("&orderBy=title"))
 
 * ordenado z-a
construirURL(getComics, actualizarQueryParams("&orderBy=-title"))

 * de mas nuevo a mas viejo
construirURL(getComics, actualizarQueryParams("&orderBy=modified"))

 * de mas viejo a mas nuevo
 construirURL(getComics, actualizarQueryParams("&orderBy=-modified"))

 * Rutas personajes
 * ordenado a-z
 construirURL(getPersonajes, actualizarQueryParams("&orderBy=name"))

 * ordenado z-a
 * construirURL(getPersonajes, actualizarQueryParams("&orderBy=name"))
 */