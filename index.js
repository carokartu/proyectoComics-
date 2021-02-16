const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

let comics = [];


const API_KEY = 'b1ee9360739b9c7554ec7be096d4d06f'
const BASE_URL = 'https://gateway.marvel.com/v1/public'

let offset = 0
let paginaActual = 0

const formulario = $(".formulario")
const seccionPrincipal = $(".seccion-principal");
const resultadosTitulo = $(".resultados-titulo-contenedor");
const cantidadDeResultados = $(".cantidad-resultados")
const contenedorDeCards = $(".resultados-cards-contenedor");
const loader = $(".loader-contenedor");
console.log(loader)

/**  RUTAS */
const getComics = `${BASE_URL}/comics?apikey=${API_KEY}`;
const getPersonajes = `${BASE_URL}/charactersapikey=${API_KEY}`;




const construirURL = (endpoint, queryParams) => {
  return `${endpoint}${queryParams}`
}

const actualizarQueryParams = (query) =>{
  let queryParams = `&offset=${offset}`;
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

const ocultar = (elemento) => {
  elemento.classList.add("is-hidden")
}

const mostrar = (elemento) => {
  elemento.classList.remove("is-hidden")
}

const crearTarjetasDeComics = (data) => {
  ocultar(loader)
  comics = data.data.results
  
  comics.map((comic) => {
    resultadosTitulo.classList.toggle("is-hidden");
    cantidadDeResultados.textContent = ` ${data.data.total}`;

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

const buscarPersonaje = (url) => {
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

const buscarImagenDePersonaje = (url) => {
  console.log(url);
  const personaje = buscarPersonaje(url);
  imgPersonaje = `${personaje.data.results.thumbnail.path}.${personaje.data.results.thumbnail.extension}`;
  console.log(imgPersonaje)
  return imgPersonaje
}

const crearTarjetaDetalleDeComic = (comicCardElegida) => {

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


const listarCards = (url) => {

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
           ocultar(resultadosTitulo);
           ocultar(cantidadDeResultados);
 
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
        mostrarTarjetasDeComics(getComics);
      }else if(btnPaginacion.classList.contains( 'pagina-anterior' )){
        mostrarTarjetasDeComics(getComics);
      }else if(btnPaginacion.classList.contains( 'pagina-siguiente' )){
        mostrarTarjetasDeComics(getComics);
      }else if(btnPaginacion.classList.contains( 'pagina-ultima' )){
        mostrarTarjetasDeComics(getComics);
      }else {
        mostrarTarjetasDeComics(getComics);
      }
    }
})

formulario.onsubmit = (e) => {
  console.log("enviaste el formulario")
  e.preventDefault();
  
  mostrar(loader);
  const busqueda = $("#input-search");
  const tipo = $("#tipo");
  const orden = $("#orden")
  let busquedaValue = ``;
  
 
  if(tipo.value === 'comics') {
    console.log("buscaste comics")

    if(busqueda.value.length) {
       busquedaValue = `&titleStartsWith=${busqueda.value}`
    }

    if(orden.value === 'a-z') {
      queryParams = actualizarQueryParams(`${busquedaValue}&orderBy=title`)  
    }
    if(orden.value === 'z-a') {
      queryParams = actualizarQueryParams(`${busquedaValue}&orderBy=-title`) 
    }
    if(orden.value === 'mas-nuevos') {
      queryParams = actualizarQueryParams(`${busquedaValue}&orderBy=modified`)   
    }
    if(orden.value === 'mas-viejos') {
      queryParams = actualizarQueryParams(`${busquedaValue}&orderBy=-modified`) 
    }
    listarCards(construirURL(getComics, queryParams))

  }else {
    console.log("buscaste personajes")

    if(busqueda.value.length) {
      queryParams = actualizarQueryParams(`&nameStartWith=${busqueda.value}`)
    }

    if(orden.value === 'a-z') {
      console.log("pronto te mostraremos los personajes que buscaste")
    }
    if(orden.value === 'z-a') {
      console.log("pronto te mostraremos los personajes que buscaste")
    }

  }

  
}

const botonInicio = $(".boton-inicio");
const botonVolver =$(".boton-volver");

botonInicio.onclick = () => {
  console.log("clickeaste home")
  inicializar();
}

botonVolver.onclick = () => {
  console.log("clickeaste back")
  mostrar(loader)
  window.history.back();
}

/***☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*
 *                INICIALIZAR
 **☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*/

const inicializar = () => {
  mostrar(loader)
  listarCards(construirURL(getComics, actualizarQueryParams("&orderBy=-modified")))
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