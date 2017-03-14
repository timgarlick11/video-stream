var video = document.querySelector("#videoElement");

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

var mediaStream;
$('.start').click(function() {
	if (navigator.getUserMedia) {       
		navigator.getUserMedia({video: true}, handleVideo, videoError);

	}
});

function handleVideo(stream) {
	video.src = window.URL.createObjectURL(stream);
	mediaStream = stream.getTracks()[0];
}

function videoError(e) {
	alert('video stream not available at this time')
}

var mediaStream;

$('.stop').click(function() {

	mediaStream.stop();

});