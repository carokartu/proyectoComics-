const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

let comics = [];  // guarda la data de comics traida de la api
let personajes = []; // guarda la data de personajes traida de la api

const API_KEY = 'b1ee9360739b9c7554ec7be096d4d06f'
const BASE_URL = 'https://gateway.marvel.com/v1/public'

let offset = 0
let paginaActual = 0
let ultimaBusqueda = ""

const formulario = $(".formulario")
const seccionPrincipal = $(".seccion-principal");
const resultadosTitulo = $(".resultados-titulo-contenedor");
const cantidadDeResultados = $(".cantidad-resultados")
const contenedorDeCards = $(".resultados-cards-contenedor");
const loader = $(".loader-contenedor");



/**  RUTAS */
const getComics = `${BASE_URL}/comics?apikey=${API_KEY}`;
const getPersonajes = `${BASE_URL}/characters?apikey=${API_KEY}`;



/**  FUNCIONES GENERALES  */

// construirURL: junta dos strings, una ruta base mas sus parametros de busqueda y los devuelve
const construirURL = (endpoint, queryParams) => {
  return `${endpoint}${queryParams}`
}

//actualizarQueryparamas: recibe un parametro de busqueda y lo une al parametro offset que va siempre
const actualizarQueryParams = (query) => {
  let queryParams = `&offset=${offset}`;
  queryParams += query;
  return queryParams
}


const borrarContenidoHTML = (elemento) => {
  elemento.innerHTML = ``;
}

const ocultar = (elemento) => {
  elemento.classList.add("is-hidden")
}

const mostrar = (elemento) => {
  elemento.classList.remove("is-hidden")
}



/**  FUNCIONES PRINCIPALES  */ 

//crearTarjetasDeComics : dibuja las cards de comisc en HTML a partir de la data que recibe como parametro

const crearTarjetasDeComics = (data) => {
  ocultar(loader)
  comics = data.data.results

  comics.map((comic) => {
    resultadosTitulo.classList.toggle("is-hidden");
    cantidadDeResultados.textContent = ` ${data.data.total}`;

    contenedorDeCards.innerHTML += `
    <article class="card-comic-positionator">        
      <div class="card-comic-basica in-stack">
            <div class="comic-img-contenedor ">              
              <img src="${comic.thumbnail.path}.jpg" />        
            </div>   
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


// crearTarjetaDEtalleDelComic: dibuja en HTML la tarejta detalle de comic a partir de la data de la tarjeta Clickeada
//                               que recibe como parametro.
const crearTarjetaDetalleDeComic = (comicCardElegida) => {

  contenedorDeCards.innerHTML = `
 
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

  creadores.forEach(creador => {
    guionistasNombres.innerHTML += `
              ${creador.name} - 
              `
  }) //cierra foreach de creadores


  // rellenar tarjetas de personajes dentro de la card comic detalle
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

const crearTarjetasDePersonajes = (data) => {


  // LOGICA DE CARO
 // guiate por el codigo de la linea 65 a 86


  

}

// listarCards: rellena el  <div class="resultados-cards-contenedor"></div> en el HTML con 
//              tarjetas basicas de comics o personajes

const listarCards = (url) => {

  borrarContenidoHTML(contenedorDeCards);
  mostrar(resultadosTitulo);
  mostrar(cantidadDeResultados);
  const tipo = $("#tipo").value;
  ultimaBusqueda = url;

  fetch(`${url}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)

      if(tipo === "comics") {
        crearTarjetasDeComics(data)
      }else crearTarjetasDePersonajes(data)

      
      // ABRIR CARD DETALLE DE COMIC CON ONCLICK

      const todasLasCardsDeComics = $$(".card-comic-basica")

      todasLasCardsDeComics.forEach((comicCard, cardIndice) => {
        comicCard.onclick = () => {

          const comicCardElegida = comics[cardIndice]

          borrarContenidoHTML(contenedorDeCards);
          ocultar(resultadosTitulo);
          ocultar(cantidadDeResultados);

          crearTarjetaDetalleDeComic(comicCardElegida);

        }; // cierra el onclick
      }); // cierra el foreach


       // ABRIR CARD DETALLE DE PERSONAJE CON ONCLICK
       // LOGICA DE ANGIE
       // guiate por el codigo de la linea 214 a 225
       // crea una funcion aparte que se llame parecido a crearTarjetaDetalleDePersonaje() donde metas el maquetado






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

botonesPaginacion.forEach((btnPaginacion) => {
  btnPaginacion.onclick = () => {
    if (btnPaginacion.classList.contains('pagina-primera')) {
      mostrarTarjetasDeComics(getComics);
    } else if (btnPaginacion.classList.contains('pagina-anterior')) {
      mostrarTarjetasDeComics(getComics);
    } else if (btnPaginacion.classList.contains('pagina-siguiente')) {
      mostrarTarjetasDeComics(getComics);
    } else if (btnPaginacion.classList.contains('pagina-ultima')) {
      mostrarTarjetasDeComics(getComics);
    } else {
      mostrarTarjetasDeComics(getComics);
    }
  }
})


/***☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*
 *     FORMULARIO - BUSQUEDA POR PARAMETROS
 **☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*/

formulario.onsubmit = (e) => {
  console.log("enviaste el formulario")
  e.preventDefault();
  mostrar(loader);
  const busqueda = $("#input-search").value;
  const tipo = $("#tipo").value;
  const orden = $("#orden").value;
  let busquedaValue = ``;

  if (tipo === 'comics') {
    console.log("buscaste comics")
    console.log(tipo)
    console.log(orden)
    console.log(busqueda)

    if (busqueda.length) {
      busquedaValue = `&titleStartsWith=${busqueda}`
    }
    if (orden === 'a-z') {
      queryParams = actualizarQueryParams(`${busquedaValue}&orderBy=title`)
    }
    if (orden === 'z-a') {
      queryParams = actualizarQueryParams(`${busquedaValue}&orderBy=-title`)
    }
    if (orden === 'mas-nuevos') {
      queryParams = actualizarQueryParams(`${busquedaValue}&orderBy=modified`)
    }
    if (orden === 'mas-viejos') {
      queryParams = actualizarQueryParams(`${busquedaValue}&orderBy=-modified`)
    }

    listarCards(construirURL(getComics, queryParams))

  } else {
    console.log("buscaste personajes")

    if (busqueda.length) {
      queryParams = actualizarQueryParams(`&nameStartWith=${busqueda.value}`)
    }

    if (orden.value === 'a-z') {
      console.log("pronto te mostraremos los personajes que buscaste")
    }
    if (orden.value === 'z-a') {
      console.log("pronto te mostraremos los personajes que buscaste")
    }

    listarCards(construirURL(getPersonajes, queryParams))
  }


}


/***☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*
 *    BOTONES HOME Y BACK
 **☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*/

const botonInicio = $(".boton-inicio");
const botonVolver = $(".boton-volver");

botonInicio.onclick = () => {
  console.log("clickeaste home")
  inicializar();
}

botonVolver.onclick = () => {
  console.log("clickeaste back")
  console.log(ultimaBusqueda)
  mostrar(loader)
  if(ultimaBusqueda.length){
    listarCards(ultimaBusqueda);
  }else inicializar()
  
}


/***☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*
 *                INICIALIZAR
 **☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*/

const inicializar = () => {
  mostrar(loader)
  listarCards(construirURL(getComics, actualizarQueryParams("&orderBy=title")))
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


//  MAQUETADO DETALLE PERSONAJE

// <div class="card-detalle-contenedor">
// <div class="card-personaje-detalle-contenedor">
//     <div class="personaje-img-contenedor">
//         <img class="personaje-img" src="http://i.annihil.us/u/prod/marvel/i/mg/6/00/6026d944c0e3a.jpg">
//     </div>
//     <div class="comic-contenido-contenedor">
//         <h1 class="comic-contenido-titulo">Slick</h2>
//             <h3>Publicado:</h3>
//             <p>22/22/2222</p>
//             <h3>Guionistas:</h3>
//             <p class="guionistas-nombres">Coco cocote</p>

//             <h3>Descripción: </h3>
//             <p>Hola pepo, soy la descripción</p>
//     </div>
// </div>
// <div class="comics-contenedor">
//     <h3>Comics</h3>
//     <h4><span class="cantidad-comics">3</span> ENCONTRADOS
//     </h4>
//     <div class="comics-cards-contenedor">

//     </div>
// </div>
// </div>

