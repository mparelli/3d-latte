// window.HELP_IMPROVE_VIDEOJS = false;

// var INTERP_BASE = "./static/interpolation/stacked";
// var NUM_INTERP_FRAMES = 240;

// var interp_images = [];
// function preloadInterpolationImages() {
//   for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
//     var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
//     interp_images[i] = new Image();
//     interp_images[i].src = path;
//   }
// }


// function setInterpolationImage(i) {
//   var image = interp_images[i];
//   image.ondragstart = function() { return false; };
//   image.oncontextmenu = function() { return false; };
//   $('#interpolation-image-wrapper').empty().append(image);
// }


// $(document).ready(function() {
//     // Check for click events on the navbar burger icon
//     $(".navbar-burger").click(function() {
//       // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
//       $(".navbar-burger").toggleClass("is-active");
//       $(".navbar-menu").toggleClass("is-active");

//     });

//     var options = {
// 			slidesToScroll: 1,
// 			slidesToShow: 3,
// 			loop: true,
// 			infinite: true,
// 			autoplay: false,
// 			autoplaySpeed: 3000,
//     }

// 		// Initialize all div with carousel class
//     var carousels = bulmaCarousel.attach('.carousel', options);

//     // Loop on each carousel initialized
//     for(var i = 0; i < carousels.length; i++) {
//     	// Add listener to  event
//     	carousels[i].on('before:show', state => {
//     		console.log(state);
//     	});
//     }

//     document.addEventListener('DOMContentLoaded', () => {
//       bulmaCarousel.attach('#examples-carousel', {
//         slidesToScroll: 1,
//         slidesToShow: 1,
//         loop: true,
//         autoplay: false,
//         pauseOnHover: true,
//         navigation: true,
//         pagination: true
//       });
    
//       // (You can keep any existing Nerfies JS in here too)
//     });
    

//     // Access to bulmaCarousel instance of an element
//     var element = document.querySelector('#my-element');
//     if (element && element.bulmaCarousel) {
//     	// bulmaCarousel instance is available as element.bulmaCarousel
//     	element.bulmaCarousel.on('before-show', function(state) {
//     		console.log(state);
//     	});
//     }

//     /*var player = document.getElementById('interpolation-video');
//     player.addEventListener('loadedmetadata', function() {
//       $('#interpolation-slider').on('input', function(event) {
//         console.log(this.value, player.duration);
//         player.currentTime = player.duration / 100 * this.value;
//       })
//     }, false);*/
//     preloadInterpolationImages();

//     $('#interpolation-slider').on('input', function(event) {
//       setInterpolationImage(this.value);
//     });
//     setInterpolationImage(0);
//     $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

//     bulmaSlider.attach();

// })




window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];

function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    var img = new Image();
    img.src = path;
    interp_images[i] = img;
  }
}

function setInterpolationImage(i) {
  i = Number(i) || 0;
  var image = interp_images[i];

  // Guard against undefined images
  if (!image) {
    console.warn("No interpolation image for index", i);
    return;
  }

  image.ondragstart = function () { return false; };
  image.oncontextmenu = function () { return false; };

  var $wrapper = $('#interpolation-image-wrapper');
  if ($wrapper.length) {
    $wrapper.empty().append(image);
  } else {
    console.warn("#interpolation-image-wrapper not found");
  }
}

$(document).ready(function () {
  // Navbar burger
  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // ===== Carousel setup =====
  if (window.bulmaCarousel) {
    // Results carousel (many videos → show 3)
    var resultsCarousel = document.querySelector('#results-carousel');
    if (resultsCarousel) {
      bulmaCarousel.attach('#results-carousel', {
        slidesToScroll: 1,
        slidesToShow: 2,
        loop: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 3000
      });
    }

    // Examples carousel (currently 1 item → show 1)
    var examplesCarousel = document.querySelector('#examples-carousel');
    if (examplesCarousel) {
      bulmaCarousel.attach('#examples-carousel', {
        slidesToScroll: 1,
        slidesToShow: 2,
        loop: true,
        autoplay: false,
        pauseOnHover: true,
        navigation: true,
        // pagination: true
      });
    }

    // Optional: access a specific element's carousel instance
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
      element.bulmaCarousel.on('before-show', function (state) {
        console.log('my-element before-show', state);
      });
    }
  } else {
    console.warn("bulmaCarousel not loaded");
  }

  // ===== Interpolation images + slider =====
  preloadInterpolationImages();

  var $slider = $('#interpolation-slider');
  if ($slider.length) {
    $slider.on('input', function () {
      setInterpolationImage(this.value);
    });
    $slider.prop('max', NUM_INTERP_FRAMES - 1);
    setInterpolationImage(0);
  } else {
    console.warn("#interpolation-slider not found");
  }

  // ===== bulmaSlider (if present) =====
  if (window.bulmaSlider) {
    bulmaSlider.attach();
  } else {
    console.warn("bulmaSlider not loaded");
  }
});