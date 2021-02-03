console.log("hola Comics");

const comics = [
  {
    titulo: "100th Anniversary Special (2014) #1",
    imagenComic: "http://i.annihil.us/u/prod/marvel/i/mg/3/a0/53c406e09649c.jpg",
    fechaDePublicacion: 23 / 7 / 2014,
    guionistas: "",
    descripcion:"THE AVENGERS Following the failed Badoon invasion of Earth and America disappearance into the Negative Zone, how will the Avengers of 2061",
    personajes: [{
    nombre: "personaje 1",
    imagenPersonaje: 
    }, {}
    ]
  },
  {},
  {},
  {},
];

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
            <article class="card-comic-basica">
                  <div class="comic-img-contenedor">              
                      <img src="${comic.img}" />        
                  </div>   
                  <div class="comic-titulo-contenedor">
                      <h3 class="title is-5">${comic.titulo}</h3>
                  </div>
             </article>
        `;
  });
};

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
