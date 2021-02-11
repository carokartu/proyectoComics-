let comics = [];

const seccionPrincipal = document.querySelector(".seccion-principal");
const resultadosTitulo = document.querySelector(
  ".resultados-titulo-contenedor"
);
const cantidadDeResultados = document.querySelector(".cantidad-resultados")

const contenedorDeCards = document.querySelector(
  ".resultados-cards-contenedor"
);

/***☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*
 *                CARDS
 **☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*/

mostrarTarjetasDeComics = (url) => {

  contenedorDeCards.innerHTML = ``;

  fetch(`${url}`)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
    console.log(data)
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
  


    // ABRIR CARD DETALLE CON ONCLICK

    const todasLasCardsDeComics = document.querySelectorAll(".card-comic-basica")

    todasLasCardsDeComics.forEach((comicCard, cardIndice) => {
      comicCard.onclick = () =>  {

           const comicCardElegida = comics[cardIndice]

           contenedorDeCards.innerHTML = ``;
           resultadosTitulo.classList.toggle("is-hidden");
           cantidadDeResultados.classList.toggle("is-hidden");
 
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
          const guionistasNombres = document.querySelector(".guionistas-nombres")
              
          creadores.forEach(creador=> {
              guionistasNombres.innerHTML += `
              ${creador.name} - 
              `
          }) //cierra foreach de creadores

           

          // rellenar tarjetas de personajes
          const personajes = comicCardElegida.characters.items
          const todasLasCardsDePersonajes = document.querySelector(".personajes-cards-contenedor")

          personajes.forEach(personaje => {
     
            todasLasCardsDePersonajes.innerHTML += `
                <article class= "card-personaje-simple">
                    <div class="personaje-img-contenedor">              
                        <img src="${personaje.resourceURI}.jpg"/>        
                    </div>   
                    <div class="personaje-nombre-contenedor">
                        <h3 class="personaje-nombre">${personaje.name}</h3>
                    </div>
                </article> 
            `            
          }) // cierra el foreach de personajes






      }; // cierra el onclick
    }); // cierra el foreach

 }) // cierra el then
  .catch((err) => {
    console.log(err)
    seccionPrincipal.textContent = "No pudimos encontrar tu busqueda"
  })
  
};

mostrarTarjetasDeComics("https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f");

  
   /**  MOSTRAR CREADORES Y PERSONAJES

 

  ${comicCardElegida.creators.items.forEach(item => {
    const guionistasNombres = document.querySelector(".guionistas-nombres")
    
    guionistasNombres.innerHTML += `
    ${item.name}
    `
    })}

  }
  })


    ${comicCardElegida.characters.items.forEach(item => {
     
      todasLasCardsDePersonajes.innerHTML += `
          <article class= "card-personaje-simple">
              <div class="personaje-img-contenedor">              
                  <img src="${item.resourceURI}.jpg" />        
              </div>   
              <div class="personaje-nombre-contenedor">
                  <h3 class="personaje-nombre">${item.name}</h3>
              </div>
          </article> 
      `
       }
      )}

*/


/***☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*
 *                PAGINACION
 **☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*――*☆*/

const pagAnterior = document.querySelector(".pagina-anterior")
const pagSiguiente = document.querySelector(".pagina-siguiente")
const pagPrimera = document.querySelector(".pagina-primera")
const pagUltima = document.querySelector(".pagina-ultima")
const botonesPaginacion = document.querySelectorAll(".paginacion-btn")

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