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
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    comics = data.data.results
  
    comics.map((comic) => {
      resultadosTitulo.classList.toggle("is-hidden");
      cantidadDeResultados.textContent = ` ${data.data.count}`;
  
      contenedorDeCards.innerHTML += `
              <article class="card-comic-basica">
                    <div class="comic-img-contenedor ">              
                        <img src="${comic.thumbnail.path}.jpg" />        
                    </div>   
                    <div class="comic-titulo-contenedor">
                        <h3 class="comic-titulo">${comic.title}</h3>
                    </div>
               </article>
          `;
    });
  
  })
  .catch((err) => {
    console.log(err)
    seccionPrincipal.textContent = "No pudimos encontrar tu busqueda"
  })
  
};

mostrarTarjetasDeComics("https://gateway.marvel.com/v1/public/comics?apikey=b1ee9360739b9c7554ec7be096d4d06f");

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