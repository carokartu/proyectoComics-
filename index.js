const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

let comics = [];  // guarda la data de comics traida de la api
let personajes = []; // guarda la data de personajes traida de la api

const API_KEY = 'b1ee9360739b9c7554ec7be096d4d06f'
const BASE_URL = 'https://gateway.marvel.com/v1/public'

let offset = 0
let paginaActual = 0
let ultimaBusqueda = ""
let comicsPorPagina = 20

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
  let personajeUnico = {};
  fetch(`${url}?apikey=${API_KEY}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      personajeUnico += data.data.results
      console.log(personajeUnico)
      // falta resolver bug de como retornar esto luego del fetch
      imgPersonaje = `${personajeUnico.results.characters.thumbnail.path} ${personajeUnico.data.results.thumbnail.extension}`;
      console.log(imgPersonaje)
      return personajeUnico
    })
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
  const personajesEncontradosComic = $(".cantidad-personajes")
  personajesEncontradosComic.textContent = ` ${comicCardElegida.characters.available}`;

  personajes.forEach(personaje => {

    todasLasCardsDePersonajes.innerHTML += `
                <article class= "card-personaje-simple">
                    <div class="personaje-img-contenedor">              
                        <img src="${comicCardElegida.characters.collectionURI}.jpg"/>        
                    </div>   
                    <div class="personaje-nombre-contenedor">
                        <h3 class="personaje-nombre">${personaje.name}</h3>
                    </div>
                </article> 
            `
  }) // cierra el foreach de personajes


}

const crearTarjetasDePersonajes = (data) => {

  const todasLasCardsDePersonajes = $(".resultados-cards-contenedor")
  personajes = data.data.results
  ocultar(loader)
  personajes.forEach(personaje => {
    todasLasCardsDePersonajes.innerHTML += `
                <article class= "card-personaje-simple">
                    <div class="personaje-img-contenedor">              
                    <img src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}" />
                    </div>   
                    <div class="personaje-nombre-contenedor">
                        <h3 class="personaje-nombre">${personaje.name}</h3>
                    </div>
                </article> 
            `
  }) // cierra el foreach de personajes
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
  // ultimaBusqueda = url;

  fetch(`${url}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log(data)

      if (tipo === "comics") {
        crearTarjetasDeComics(data)
      }
      else {
        crearTarjetasDePersonajes(data)
      }

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
    let btnAnterior = document.querySelector(".pagina-anterior")
    let btnPrimera = document.querySelector(".pagina-primera")

    if (btnPaginacion.classList.contains('pagina-primera')) {
      btnAnterior.disabled = true;
      btnPrimera.disabled = true;
      paginaActual = 0
      listarCards(`https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f&offset=${paginaActual * comicsPorPagina}&orderBy=title`)

    } else if (btnPaginacion.classList.contains('pagina-anterior')) {
      paginaActual--
      console.log("pagina actual", paginaActual)
      listarCards(`https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f&offset=${paginaActual * comicsPorPagina}&orderBy=title`)

      if (paginaActual === 0) {
        btnAnterior.disabled = true;
        btnPrimera.disabled = true;
      }
      else {
        btnAnterior.disabled = false;
        btnPrimera.disabled = false;
      }

    } else if (btnPaginacion.classList.contains('pagina-siguiente')) {
      paginaActual++
      console.log("pagina actual", paginaActual)
      listarCards(`https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f&offset=${paginaActual * comicsPorPagina}&orderBy=title`)
      btnAnterior.disabled = false;
      btnPrimera.disabled = false;

    } else if (btnPaginacion.classList.contains('pagina-ultima')) {
      listarCards(`https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f&offset=${paginaActual * comicsPorPagina}&orderBy=title`)

    } else {
      listarCards(`https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f&offset=${paginaActual * comicsPorPagina}&orderBy=title`)

    }
  }
})

let buscarComics = (paginaActual) => {
  console.log("buscando comics...")
  fetch(`https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f&offset=${paginaActual * comicsPorPagina}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      comics = data.data.results
      contenedorDeCards.innerHTML = ` `
      comics.map((comic) => {

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


        console.log("llegué al inner")


      })
      listarCards(`https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f&offset=${paginaActual * comicsPorPagina}`)

    })

}

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
      busquedaValue = `&nameStartsWith=${busqueda}`
    }

    if (orden === 'a-z') {
      console.log("pronto te mostraremos los personajes que buscaste")
      queryParams = actualizarQueryParams(`${busquedaValue}&orderBy=name`)
    }
    if (orden === 'z-a') {
      console.log("pronto te mostraremos los personajes que buscaste")
      queryParams = actualizarQueryParams(`${busquedaValue}&orderBy=name`)
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
  if (ultimaBusqueda.length) {
    listarCards(ultimaBusqueda);
  } else inicializar()

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

