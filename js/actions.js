var video = document.querySelector("#videoElement");

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

var mediaStream;
$('.start').click(function() {
	$('.stop').prop('disabled', false).css('opacity', '1');
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


// Global for recaptcha


$(function ($) {

	results_enable = $('button.results');
	var start = true;
	var questionNumber = $('.pagination-container button');
	var form = $('form');
	var checkboxChecked = 0;

	$("button").prop("disabled", true).css('opacity', '.5');//set all buttons to disabled on page load

	var pageLoad = function() {
		if (start === true) {
			$("#industry").show();
			$('.start').addClass('highlight').prop('disabled', false).css('opacity', '1');
			$('button.showPrev').prop('disabled', false).css('opacity', '1');
			$('button.results').prop('disabled', true).css('opacity', '.5');
		}
	}
	pageLoad();

	$('.showNext').click(function(e) {
		$(this).css("box-shadow", "0 0 0");

		var numberFilter = $(this).parent().data('number');
		
		questionNumber.removeClass('highlight');
		questionNumber.eq(numberFilter).each(function(index, element) {
			$(this).next().prop('disabled', false).css('opacity', '1').addClass('highlight');
		});
		$(this).parent().next().fadeIn(500);
		$(this).parent().fadeOut(-500);


	});

	$('.showPrev').click(function(e) {
		var numberFilter = $(this).parent().data('number');
		questionNumber.removeClass('highlight');
		questionNumber.eq(numberFilter).each(function(index, element) {
			$(this).prev().addClass('highlight');

		});
		$(this).parent().prev().fadeIn(500);
		$(this).parent().fadeOut(-500);



	});

	$("input:radio").change(function (checkbox) { 
		$(this).parent('label').siblings('.showNext').prop('disabled', false).css('opacity', '1');
		var parentChecked = $(this).parent().parent().data('number');
		var otherChecked = $(this).data('recommendation');
		if (parentChecked === 1 && otherChecked === "other") {
			$('.other').fadeIn(500);
			$(this).parent('label').siblings('.showNext').prop('disabled', true).css('opacity', '.5');
		} else { $('.other').fadeOut(500);}
	});
	$('.other').keyup(function() {

		if( $(this).val() ) {
			$(this).siblings('.showNext').prop('disabled', false).css('opacity', '1');
		} else { $(this).siblings('.showNext').prop('disabled', true).css('opacity', '.5');}
	})
	$("input.industry:checkbox").change(function (e) { 

		checkBoxDetect($(this));

	});
	$("input.revenue:checkbox").change(function (e) { 

		checkBoxDetect($(this));

	});

	$("input.plugin-recommendation:checkbox").change(function (e) { 

		checkBoxDetect($(this))

	});

	var checkBoxDetect = function(checkbox) {
		var checkedState = $('input.' + checkbox[0].classList[1] + ':checkbox:checked').length;
		var buttonState = checkbox.parent('label').siblings('.showNext');	

		if (checkedState > 0) {
			buttonState.prop('disabled', !checkedState).css('opacity', '1');	
		}
		else {
			buttonState.prop('disabled', !checkedState).css('opacity', '.5');
		}


	}

	// form validation

	$('input[type="tel"], input[type="number"]').keypress(function(e) {
		if(e.which >= 48 && e.which <= 57) {
			return true;
		}
		else { return false; }
	})



	

	var recommendations = [];
	form.on('submit', function(e) {
		if($('form').data('form') === 'roi-form' ) {
			e.preventDefault();
			$('.form-container').fadeOut(300);
			$('.chart-container').fadeIn(450);

			inputValues();
		}
		else {
			$.each(form[0], function(i,el) {
				if (el.checked === true) {
					recommendations.push(el.dataset.recommendation);
				}
			});
			localStorage.setItem("user_recommendations", JSON.stringify(recommendations));
		}

		
	});

	var inputValueCounter = function(inputField) {
		var button = ".login";
		var inputFieldParents = inputField.parents('#login')
		var currentContainer = inputFieldParents.children('.login');
		var currentContainerButton = inputFieldParents.children('.loginButton');
		var counter = 0;

		$.each(currentContainer, function(i,el) {
			var inputs = el.value;
			console.log(inputs);
			if(inputs) {
				counter = counter + 1;
				if(counter === currentContainer.length) {
					currentContainerButton.prop('disabled', false).css('opacity', '1');
				}
			}
			else {
				counter = counter - 1; 
				if(counter < currentContainer.length) {
					currentContainerButton.prop('disabled', true).css('opacity', '.5');
				}
			}



		});
	}

	$('.login').keyup(function() {
		inputValueCounter($(this))
	});

	$('.loginButton').click(function() {

		$('#login').fadeOut(300);
		$('#main-content').fadeIn(400);

	});
	$('#campaign').click(function() {

		var campaign = $('input[name="campaign"').val();
		$("#main-content").fadeOut(500);
		$("#video-container").fadeIn(700);
	})
	var collectingData = parseInt($('input[name="collecting-data"').val());

	
});
