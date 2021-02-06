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

mostrarTarjetasDeComics = () => {

  fetch('https://gateway.marvel.com/v1/public/comics?apikey=******************')
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
  
  })
  .catch((err) => {
    console.log(err)
    seccionPrincipal.textContent = "No pudimos encontrar tu busqueda"
  })
  
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
