const URL_UPLOAD = "https://upload.giphy.com/v1/gifs";
const video = document.getElementById("video");

let recorder;

let blob;
let form = new FormData()
let timer;
let hours = '00';
let minutes = '00';
let seconds = '00'
const startButton = document.getElementById('botoncomenzar')
const recordButton = document.getElementById('botongrabar')
const stoprecordButton = document.getElementById('botonfinalizar')
const uploadGif = document.getElementById('botonsubir')
const h1text = document.getElementsByClassName("h1text")
const h3text = document.getElementsByClassName("h3text")
const previsualizar = document.getElementById("previsualizar")
const preview_overlay = document.getElementById('preview_overlay')
const reloj = document.getElementById('reloj')
const stepOne = document.getElementById("step_one")
const stepTwo = document.getElementById("step_two")
const stepThree = document.getElementById("step_three")
const uploadGifEndpoint = 'https://upload.giphy.com/v1/gifs'
const repetirCaptura = document.getElementById('repetir')
const createNew = document.getElementById('createnew')

//Obtenemos video//


const getStreamingVideo = async () => {
	stepOne.style.background="#572ee5";
		stepOne.style.color="white";
		h1text.innerHTML= "¿Nos das acceso a tu cámara?";
		h3text.innerHTML= "El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.";
   
   
		await navigator.mediaDevices.getUserMedia({
		audio: false,
		video: { 
			height: { max: 480 }
		}
	})
    .then((StreamObj) => {
		
		h1text.innerHTML= "";
		h3text.innerHTML= "";
		stepOne.style.background="white";
				stepOne.style.color="#572ee5";
				stepTwo.style.background="#572ee5";
				stepTwo.style.color="white";
				startButton.style.display = "none"
		recordButton.classList.remove("ocultar")
				video.style.display = "block";
		video.srcObject = StreamObj;
		video.play();
		

		recorder = RecordRTC(StreamObj, {
			type: 'gif',
			frameRate: 1,
			quality: 10,
			width: 360,
			hidden: 240,
			onGifRecordingStarted: function() {
				console.log('started')
			},
		});
	
	})
	.catch((err) => console.log(err));
};

startButton.addEventListener('click', getStreamingVideo)
	
			
		const createGifoProcess = () => {
			console.log("recording")
			recordButton.classList.add("ocultar")
			stoprecordButton.classList.remove("ocultar")
			
			recorder.startRecording();
			timer = setInterval(showTimer, 1000)

		}
		recordButton.addEventListener('click', createGifoProcess)
function stopCreateGifoProcess () {
	video.style.display = "none"
	previsualizar.style.display = "flex"
	
	recorder.stopRecording(() => {

		blob = recorder.getBlob();
		previsualizar.src = URL.createObjectURL(blob)
		form.append("file", recorder.getBlob(), 'creado.gif');
		console.log(form.get('file'))
		
	})
	stoprecordButton.classList.add("ocultar")
	uploadGif.classList.remove("ocultar");
	reloj.style.display = "none"
	repetirCaptura.classList.remove("ocultar")
	

	clearInterval(timer);
	hours = '00';
	minutes = '00';
	seconds = '00'; 
	timer.innerText = `${hours}:${minutes}${seconds}`;
}

stoprecordButton.addEventListener('click', stopCreateGifoProcess)


const uploadMyGifo = async () => {
	preview_overlay.style.display = 'flex'
	preview_overlay.style.backgroundImage = "url('../assets/loader.svg')"
	preview_overlay.style.backgroundRepeat = "no-repeat"
	preview_overlay.style.backgroundPosition = "50% 40%"
	stepTwo.style.backgroundColor = 'white'
	stepTwo.style.color = '#572ee5'
	stepThree.style.backgroundColor = '#572ee5'
	stepThree.style.color = "white"

	await fetch(`${uploadGifEndpoint}?api_key=${API_KEY}`,
	{
		method: 'POST',
		body: form,
	})
	.then((response) => response.json())
	.then((myGifo) => {
		let myGifoId = myGifo.data.id
		console.log(myGifoId);
		uploadGif.innerHTML = "Subido!"
		preview_overlay.style.backgroundImage = "url('../assets/check.svg')"
		preview_overlay.innerHTML = "GIFO subido con exito !"
		repetirCaptura.classList.add("ocultar")
		createNew.classList.remove("ocultar")
		saveGif(myGifoId)
		console.log("Saving gif in localStorage")
	}) 
	.catch(error => {
		console.error('Error al subir el Gif:', error)
	});
}

uploadGif.addEventListener('click', uploadMyGifo)

 repetirCaptura.addEventListener('click', repeatCreateProcess)
 createNew.addEventListener('click', repeatCreateProcess) 
 
 
function repeatCreateProcess (e)
 {
e.preventDefault();
recorder.clearRecordedData();
stepTwo.style.backgroundColor = "#572ee5"
stepTwo.style.color = "white"
stepThree.style.color = "#572ee5"
stepThree.style.backgroundColor = "white"
preview_overlay.style.backgroundImage = "url('../assets/loader.svg')"
preview_overlay.innerHTML = "Estamos subiendo tu gifo"
preview_overlay.style.display = "none"
createNew.classList.add("ocultar")
uploadGif.innerHTML = "SUBIR"
repetirCaptura.classList.add("ocultar")
recordButton.classList.remove("ocultar")
uploadGif.classList.add("ocultar")
video.style.display = "block";
previsualizar.src = ""
previsualizar.style.display = "none"
navigator.mediaDevices.getUserMedia({
	audio: false,
	video: { 
		height: { max: 480 }
	}
})
.then((StreamObj) => {
	
	h1text.innerHTML= "";
	h3text.innerHTML= "";
	stepOne.style.background="white";
			stepOne.style.color="#572ee5";
			stepTwo.style.background="#572ee5";
			stepTwo.style.color="white";
			startButton.style.display = "none"
	recordButton.classList.remove("ocultar")
			video.style.display = "block";
	video.srcObject = StreamObj;
	video.play();
	

	recorder = RecordRTC(StreamObj, {
		type: 'gif',
		frameRate: 1,
		quality: 10,
		width: 360,
		hidden: 240,
		onGifRecordingStarted: function() {
			console.log('started')
		},
	});

})
.catch((err) => console.log(err));
 }
function showTimer() {
	reloj.style.display = "block"
	seconds++;

	if (seconds < 10) seconds = `0` + seconds;

	if (seconds > 59) {
		seconds = `00`;
		minutes ++;

		if (minutes < 10) minutes = `0` + minutes;
	}

	if (minutes > 59) {
		minutes = `00`;
		hours++;

		if (hours < 10) hours = `0` + hours;
	}

	reloj.innerHTML = `${hours}:${minutes}:${seconds}`;
} 

let arrayMisGifs = JSON.parse(localStorage.getItem('myGifosLocalStorage')) || []
async function saveGif (id){
	
 await fetch('https://api.giphy.com/v1/gifs/'+id+'?api_key=7NMSZCoKqgRfbYLtNu5YcJTxT0DzCmjh')
 .then((response) => response.json())
		.then((myGif) => {

		let mygifo = myGif.data	
		arrayDataGif = {
			'id': id,
			'titulo': mygifo.title,
			'usuario': mygifo.username,
			'url': mygifo.images.original.url
		};
		arrayMisGifs.push(arrayDataGif)
		localStorage.setItem("myGifosLocalStorage", JSON.stringify(arrayMisGifs));
		console.log(arrayMisGifs)
	})
}