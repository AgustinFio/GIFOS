const cambioCheckbox = document.getElementById("checkbox");
const containerDark = document.getElementById("container");
const modalWindow = document.getElementById('modalWindow')
const misGifos = document.getElementById('misgifos')
const addBoton = document.getElementById('add')
const mainCont = document.getElementById('mainbox')
const createGifoSec = document.getElementById('creategifosec')
const logo = document.getElementById('logo')
const und = document.getElementById("und")
const tendencia = document.getElementById('tendencia')
const mira = document.getElementById('mira')
const elems = document.getElementsByClassName("text")
const insp = document.getElementsByClassName("in")
const diurno = document.getElementsByClassName('mode')
const headerMobile = document.getElementById("header")


//Volver a la seccion HOME de la pagina//
logo.addEventListener("click", function() { window.location = "index.html"; });

//Cambio de modo Diurno a Nocturno y viceversa//
cambioCheckbox.addEventListener("click", checkMode);
function checkMode() {
  console.log("checking...");
  if (cambioCheckbox.checked) {
    console.log("dark on");
    darkModeOn();
  } else {
    console.log("dark off");
    darkModeOff();
  }
}
function darkModeOn() {
  document.body.classList.add("dark-mode");
  
  containerDark.style.backgroundColor = "#222326";
  und.style.color = "white";
  tendencia.style.color = "white"
  mira.style.color = "white"
 
  for (var i = 0; i < diurno.length; i++) {
    diurno[i].textContent = "MODO DIURNO"
} 
    for (var i = 0; i < insp.length; i++) {
      insp[i].style.color = "white"
  }
  
  headerMobile.classList.add("headerdark")
  }

function darkModeOff() {
  document.body.classList.remove("dark-mode");

  containerDark.style.backgroundColor = "#F3F5F8"
  und.style.color = "#572EE5"
  tendencia.style.color = "#572EE5"
  mira.style.color = "black"
  headerMobile.classList.remove("headerdark")
  headerMobile.style.backgroundColor = "#572EE5 90%"


for (var i = 0; i < insp.length; i++) {
  insp[i].style.color = "#572EE5"
}
for (var i = 0; i < diurno.length; i++) {
  diurno[i].textContent = "MODO NOCTURNO"
}
}
//Menu hamburguesa//
function myFunction() {
  
 
  if (headerMobile.style.display === "flex") {
    headerMobile.style.display = "none";
  } else {
    headerMobile.style.display = "flex";
    addBoton.remove()
    }
    
  
}

//Seccion de Tendencias//
let imn = document.getElementById("imn")
const API_KEY = '7NMSZCoKqgRfbYLtNu5YcJTxT0DzCmjh';
const URL_TRENDING = 'https://api.giphy.com/v1/gifs/trending';
const URL_TRENDING_TAGS = 'https://api.giphy.com/v1/trending/searches';
const URL_SEARCH = 'https://api.giphy.com/v1/gifs/search';

async function ObtenerAleatorios() {
    const resultadosAleatorios = await fetch(`${URL_TRENDING}?api_key=${API_KEY}`);
    const resultadocomoJSON = await resultadosAleatorios.json();
    return resultadocomoJSON;
}
ObtenerAleatorios()

function addRandomToDom (gif, usuario, titulo){
    let caja = document.createElement('div');
    caja.classList.add("ima")
    caja.innerHTML = `
    
<div class="btncontainer">
				<div class="boti" onclick="likedGif('${gif}','${usuario}','${titulo}')"></div>
				<div class="botin" onclick="downloadGif('${gif}','${titulo}')"></div>
        <div class="ult" onclick="maximizeGif('${gif}','${usuario}','${titulo}')"></div>
        </div>
			</div>
			<div class="fondohover"></div>
				<div class="usuario">${usuario}</div>
        <div class="titulo">${titulo}</div>
        <img src="${gif}" class="sorc">
        `
    
    imn.appendChild(caja);
}

async function getRandomAndConsume(){
    const Random = await ObtenerAleatorios();
    console.log(Random);
    for (let i = 0; i < Random.data.length; i++){
        addRandomToDom(Random.data[i].images.original.url, Random.data[i].username, Random.data[i].title)
    }
}

getRandomAndConsume();

const atras = document.getElementById("atras");
const adelante = document.getElementById("bot");

atras.addEventListener("click", () => {
  imn.scrollLeft = imn.scrollLeft - 400;
});

adelante.addEventListener("click", () => {
  imn.scrollLeft = imn.scrollLeft + 400;
});

//Elaborar la funcion que obtenga la busqueda del usuario (API) y luego que se muestren en el DOM.
const cajita = document.getElementById("cajita");
const inputDeBusqueda = document.getElementById("search");
const gifForm = document.querySelector("#gif-form");
const contMid = document.getElementById("mid");
//Sugerencias//
inputDeBusqueda.addEventListener("keyup", () => {
  let autocomplete = fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=7NMSZCoKqgRfbYLtNu5YcJTxT0DzCmjh&limit=6rating=g&q=${inputDeBusqueda.value}`).then((response) => response.json());

  autocomplete
  .then((respuestasDelServidor) => {
    addSugerenciasAutocompletadas(respuestasDelServidor.data);
  })
  .catch((err) => console.log("ha ocurrido un error: ", err));
} );

function addSugerenciasAutocompletadas(suggestions) {
  removeOldSuggestions();
  const searchSuggestions = document.createElement('ul');
  searchSuggestions.setAttribute("id", "sugerenciasDeBusqueda");
  suggestions.forEach((suggestion) => {
    const sugerencia = document.createElement('li');
    sugerencia.textContent = suggestion.name;
    sugerencia.classList = "autocompletar";
    searchSuggestions.appendChild(sugerencia)
    inputDeBusqueda.classList.remove("search");
    inputDeBusqueda.classList.add("searchi");
    sugerencia.addEventListener("click", sugClick);
    inputDeBusqueda.addEventListener("focusout", hideSug);

  })
  
function sugClick (e) {
  gifContainer.innerHTML = null
    e.preventDefault();
    const searchTermi = e.target.textContent
    fetch(`https://api.giphy.com/v1/gifs/search?&q=${searchTermi}&limit=&api_key=7NMSZCoKqgRfbYLtNu5YcJTxT0DzCmjh`)
    .then((response) => {return response.json(); })
    .then((resp => {
        let dataArray = resp.data
        displaySearchGif(dataArray);
    }))
    .catch(err => console.log(err)); 
}

function hideSug () {
  setTimeout(() => {
    searchSuggestions.remove();
    inputDeBusqueda.classList.remove("searchi");
    inputDeBusqueda.classList.add("search");


  }, 300);
}
  contMid.appendChild(searchSuggestions);
  
}

function removeOldSuggestions() {
  const oldSuggestions = document.getElementById("sugerenciasDeBusqueda")
  if (oldSuggestions) {
    oldSuggestions.remove();
    inputDeBusqueda.classList.remove("searchi");
    inputDeBusqueda.classList.add("search");
  }
}
//Tags de tendencias//
const taglist = document.getElementById('taglist')
const trendingTopics = async () => {
	await fetch(`https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`)
		.then((response) => response.json())
		.then((trendingTags) => {
			console.log(trendingTags);
			showTrendingTags(trendingTags);
		})
		.catch((err) => console.log(err));
};

trendingTopics();

const showTrendingTags = (trendingTags) => {
  for(let i = 0; i < 5; i++) {
    let trendingTagCont = document.createElement('div')
    trendingTagCont.setAttribute("onclick", `getSearchByTrendingTag("${trendingTags.data[i]}")`)
    trendingTagCont.classList.add("trendingtag")
    trendingTagCont.innerHTML = `${trendingTags.data[i]}`
    taglist.appendChild(trendingTagCont)
  }
}



const gifContainer = document.querySelector(".gifcont");
const verMas = document.getElementById('vermas')
const cont = document.querySelector(".contenedor");
let numberGifInit = 12
let offSetVariable = 0

//Realizar busqueda al hacer click en un tag de tendencias//

const getSearchByTrendingTag = async (trendingTag) => {
 
	
  gifContainer.innerHTML = null
  gifContainer.style.display = "flex"
	await fetch(
		`https://api.giphy.com/v1/gifs/search?&q=${trendingTag}&limit=&offset=0&api_key=7NMSZCoKqgRfbYLtNu5YcJTxT0DzCmjh`
	)
		.then((response) => response.json())
		.then((resp => {
            
            let dataArray = resp.data
            deleteOldSearchs()
				displaySearchGif(dataArray);
			}
		))
		.catch((err) => console.log(err));
}

//Realizar una busqueda desde la barra de busqueda//

const getSearch = async (e) => {
  if ((e.key === 'Enter') || (e.keyCode === 13)){
	e.preventDefault();
  gifContainer.innerHTML = null
  const searchTerm = document.getElementById('search').value
  
	

	
	if (offSetVariable === 0) {
		gifContainer.innerHTML = '';
	}

	//-----------fetch
	await fetch(
		`https://api.giphy.com/v1/gifs/search?&q=${searchTerm}&limit=&offset=0&api_key=7NMSZCoKqgRfbYLtNu5YcJTxT0DzCmjh`
	)
		.then((response) => response.json())
		.then((resp => {
            
            let dataArray = resp.data
            deleteOldSearchs()
				displaySearchGif(dataArray);
			}
		))
		.catch((err) => console.log(err));
}
};
//Borrar busquedas anteriores//
function deleteOldSearchs () {
  searchText.innerHTML = null
gifContainer.innerHTML = null
}

inputDeBusqueda.addEventListener("keypress", getSearch)
// TODO ---------------------- Búsqueda ----------------------  \\
const searchText = document.getElementById("searchtext")

//Mostrar Gifos en pantalla al realizar la busqueda//
const displaySearchGif = (dataArray) => {
    
    und.style.display = "none";
    gifContainer.style.display = "flex";
    console.log(dataArray)


    if(dataArray.length === 0) {
        verMas.style.display = "none"
        searchText.style.display = "block";
          searchText.innerHTML ="Busqueda no Encontrada";
                const errorImg = document.createElement("img");
                const errorP = document.createElement("p");
                errorP.style.fontSize="22px";
                errorP.style.color="#50E3C2";
                errorP.innerHTML="Intenta con otra Cosa";
                errorImg.setAttribute('src', "icon-busqueda-sin-resultado.svg");
                errorImg.style.width='150px';
                errorImg.style.display='flex';
                errorImg.style.justifyContent= 'center';
                errorImg.style.paddingTop='150px';
                errorImg.style.marginLeft='auto';
            errorImg.style.marginRight='auto';
            searchText.appendChild(errorImg);
            searchText.appendChild(errorP);
    }

else {
    if(dataArray.length > 12) {
        verMas.style.display = "block"
    }

	for (let i = 0; i < dataArray.length; i++) {
		const caja = document.createElement('div');
        caja.classList.add('caj');
		caja.innerHTML = ` 
<div class="btncontainer">
				<div class="boti" onclick="likedGif('${dataArray[i].images.original.url}','${dataArray[i].username}','${dataArray[i].title}')"></div>
				<div class="botin" onclick="downloadGif('${dataArray[i].images.original.url}','${dataArray[i].title}')"></div>
        <div class="ult" onclick="maximizeGif('${dataArray[i].images.original.url}','${dataArray[i].username}','${dataArray[i].title}')"></div>
        </div>
			</div>
			<div class="fondohover"></div>
				<div class="usuario">${dataArray[i].username}</div>
        <div class="titulo">${dataArray[i].title}</div>
        <img src="${dataArray[i].images.original.url}">
			
		
        `;
        
		gifContainer.appendChild(caja);
    }
}

let items = Array.from(document.querySelectorAll(".caj"));
		
		cantidad = 12;
		
		items.forEach(function (item, index) {
			
			if (index > cantidad - 1) {
				item.classList.add('ocultar');
			}
			
			
		});
};
addBoton.addEventListener('click', createGifoSection)
//Seccion de crear gifos//
function createGifoSection () {
mainCont.classList.add("hidden")
gifContainer.style.display = "flex"
createGifoSec.classList.remove("hidden")
}
//Maximizar Gifs//
function maximizeGif (gif, usuario, titulo) {
modalWindow.style.display = "block"
modalWindow.innerHTML = `<img src="${gif}" class="modal-content">
<div class="close" onclick="closeFunction()"></div>
<div class="flech"></div>
<div class="der"></div>
<div class="us">${usuario}</div>
<div class="titlegif">${titulo}</div>
<div class="like" onclick="likedGif('${gif}','${usuario}','${titulo}')"></div>
<div class="download" onclick="downloadGif('${gif}', '${titulo}')"></div>`
}
//Maximizar gifs de Favoritos//
function maxFavGifs (gif, usuario, titulo) {
  modalWindow.style.display = "block"
modalWindow.innerHTML = `<img src="${gif}" class="modal-content">
<div class="closemaxfav" onclick="closeFunction()"></div>
<div class="flech"></div>
<div class="der"></div>
<div class="us">${usuario}</div>
<div class="titlegif">${titulo}</div>
<div class="likemax" onclick="removeFromFav('${gif}')"></div>
<div class="downloadmaxfav" onclick="downloadGif('${gif}','${titulo}')"></div>`

}
  //Cerrar ventana modal//
function closeFunction () {
  modalWindow.style.display = "none"
}

//Anadir gif a Local Storage(Favoritear Gif)
const imagEnLocalST = JSON.parse(localStorage.getItem('gif')) || []

function likedGif (gif, usuario, titulo) {
  
  gifObject = {
    gif: gif,
    usuario: usuario,
    titulo: titulo
  }
  imagEnLocalST.push(gifObject);
  
    localStorage.setItem("gif", JSON.stringify(imagEnLocalST));
  
}
// Descarga de gifs//
async function downloadGif (gif, titulo) {
    //create new a element
    let a = document.createElement('a');
    // get image as blob
    let response = await fetch(gif);
    let file = await response.blob();
    // use download attribute https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
    a.download = titulo;
    a.href = window.URL.createObjectURL(file);
    //store download url in javascript https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes#JavaScript_access
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    //click on element to start download
    a.click();
  };


//Boton de VerMas//
verMas.addEventListener("click", function() {	
	ocultos = Array.from(document.querySelectorAll(".ocultar"));
	
	ocultos.forEach(function (item, index) {
		
		if (index < cantidad) { item.classList.remove('ocultar'); }
		
		if (document.querySelectorAll('.ocultar').length === 0) { verMas.style.display = "none";}
		
  });
  

	
	
});
const favGifs = document.getElementById("favo");
//Mostrar Favoritos en pantalla//
 favGifs.addEventListener("click", mostrarFav);
 function mostrarFav () {
  mainCont.classList.remove("hidden")
  gifContainer.innerHTML = null
  gifContainer.style.display = "flex"
  createGifoSec.classList.add("hidden")
  searchText.style.display = "flex"
  Array.from(document.querySelectorAll('.cont')).forEach(el => el.remove())
  searchText.innerHTML = `
  <div class="favicon"></div>
  <p class="favtext">Favoritos</p>`
  
 const storedGifs = JSON.parse(localStorage.getItem("gif"));

 if(storedGifs === null || storedGifs === [] || storedGifs.length === 0){
   verMas.style.display = "none"
   gifContainer.innerHTML = `
   <div class="nofavicon"></div>
   <p class="nofavtext">"¡Guarda tu primer GIFO en Favoritos<br> 
   para que se muestre aquí!"</p>
   `
 }

 if (storedGifs.length < 12) {
   verMas.style.display = "none"
 }

 if(storedGifs.length > 12) {
   verMas.style.display = "block";
 }
 
 //Crear el bucle para que se carguen todos los gifs del local Storage//
 storedGifs.forEach((storedGifs) => {
   console.log(storedGifs)
  const caja = document.createElement('div')
  caja.classList.add("caj")
  caja.innerHTML = `	
  <div class="btncontainer">
  <div class= "likedbtn" onclick="removeFromFav('${storedGifs.gif}')"></div>
  <div class="botin" onclick="downloadGif('${storedGifs.gif}','${storedGifs.titulo}')"></div>
  <div class="ult" onclick="maxFavGifs('${storedGifs.gif}','${storedGifs.usuario}','${storedGifs.titulo}')"></div>
</div>
<div class="fondohover"></div>
  <div class="usuario">${storedGifs.usuario}</div>
  <div class="titulo">${storedGifs.titulo}</div>
  <img src="${storedGifs.gif}">`
  
   gifContainer.appendChild(caja)
  
   
})
let items = Array.from(document.querySelectorAll(".caj"));
	
	cantidad = 12;
	
	items.forEach(function (item, index) {
		
		if (index > cantidad - 1) {
			item.classList.add('ocultar');
		}
	});
 
}
//Remover Gifs de favoritos//
function removeFromFav(gif) {
  let storedGifs = JSON.parse(localStorage.getItem('gif'));
	console.log(storedGifs);
	for (let i = 0; i < storedGifs.length; i++) {
		if (storedGifs[i].gif === gif) {
			storedGifs.splice(i, 1);
			localStorage.setItem(
				'gif', JSON.stringify(storedGifs)
			)
		mostrarFav()
		}
	}
}
//Mostrar gifs creados//
function displayMisGifos () {
  mainCont.classList.remove("hidden")
  gifContainer.style.display = "flex"
  createGifoSec.classList.add("hidden")
  Array.from(document.querySelectorAll('.cont')).forEach(el => el.remove())
  searchText.style.display = "block"
  searchText.innerHTML = "Mis GIFOS"
  gifContainer.innerHTML = null;
  let storedGifs = JSON.parse(localStorage.getItem("myGifosLocalStorage"));
  if(storedGifs === null || storedGifs.length === 0) {
    verMas.style.display = "none"
    gifContainer.innerHTML = `<div class="migifoicon"></div>
    <p class="migifotexto">!Animate a crear tu primer GIFO!</p>`
  }
 
  if (storedGifs.length < 12) {
    verMas.style.display = "none"
  }
 
  if(storedGifs.length > 12) {
    verMas.style.display = "block";
  }

  for (let i = 0; i < storedGifs.length; i++) {
    console.log(storedGifs)
   const caja = document.createElement('div')
   caja.classList.add("caj")
   caja.innerHTML = `	
   
   <div class="btncontainer">
   <div class= "removebtn" onclick="removeFromMyGifos('${storedGifs[i].id}')"></div>
   <div class="botin" onclick="downloadGif('${storedGifs[i].url}','${storedGifs[i].titulo}')"></div>
   <div class="ult" onclick="maxFavGifs('${storedGifs[i].url}','${storedGifs[i].usuario}','${storedGifs[i].titulo}')"></div>
 </div>
 <div class="fondohover"></div>
   <div class="usuario">${storedGifs[i].usuario}</div>
   <div class="titulo">${storedGifs[i].titulo}</div>
   <img src="${storedGifs[i].url}">`
   
    gifContainer.appendChild(caja)
}
}

//Remover gifos creados//
function removeFromMyGifos(id) {
  let storedGifs = JSON.parse(localStorage.getItem('myGifosLocalStorage'));
	console.log(storedGifs);
	for (let i = 0; i < storedGifs.length; i++) {
		if (storedGifs[i].id === id) {
			storedGifs.splice(i, 1);
			localStorage.setItem('myGifosLocalStorage', JSON.stringify(storedGifs))
		displayMisGifos()
		}
  }
}
misGifos.addEventListener('click', displayMisGifos)




addBoton.addEventListener('click', createGifoSection)
//Seccion de crear Gifos//
function createGifoSection () {
mainCont.classList.add("hidden")
createGifoSec.classList.remove("hidden");
}