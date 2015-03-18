var acmeCarousel = (function(){
	
	var dom = {
		addClass: function(classname, element) {
			element.classList.add(classname);
		},

		removeClass: function(classname, element) {
			element.classList.remove(classname);
		},

		hasClass: function(className, element) {
			return element.classList.contains(className);
		},

		style: function(style, value, element) {
			element.style[style] = value;
		}
	};

	var object = {
		merge: function(obj1, obj2) {
			var obj3 = {};
			
			for(var prop in obj1){
				if(obj2[prop] !== undefined){
					obj3[prop] = obj2[prop];
				}
				else{
					obj3[prop] = obj1[prop];
				}
			}

			return obj3;
		}
	};

	var Carousel = function(userConfig) {

		var defaultConfig = {
			selector: '.carousel',
			interval: 3000,
			transitionDuration: 1000,
			transition: 'slide', // slide / fade / slide-vertical
			autoRotation: true,
			wrapAround: true,
			touch: true,
			beforeTransition: function() {},
			afterTransition:  function() {}
		};
		
		if(typeof userConfig === "string"){
			var config = defaultConfig;
			config.selector = userConfig;
		}
		else{
			var config = object.merge(defaultConfig, userConfig);
		}

		var carouselElement = document.querySelector(config.selector),
			carouselChildren = carouselElement.querySelector('.slides').children,
			carouselCounter = document.querySelectorAll('.carousel'),
			allSlides = [],
			interval,
			currentSlide,
			nextSlide,
			prevSlide;
			
		var setup = function(){
		
			//Loop slides and add to Array
			for(var ii = 0, length = carouselChildren.length; ii < length; ii++){
				dom.style("transitionDuration", config.transitionDuration + "ms", carouselChildren[ii]);
				dom.addClass('effect-' + config.transition, carouselChildren[ii]);
				allSlides.push(carouselChildren[ii]);
			}

			//Set default slides status
			currentSlide = allSlides[0];
			nextSlide = allSlides[1];

			dom.addClass('active', currentSlide);
			dom.addClass('next-slide', nextSlide);

			if(config.wrapAround === true){
				prevSlide = allSlides[allSlides.length-1];
				dom.addClass('prev-slide', prevSlide);
			}

			//Start autorotation if set
			if(config.autoRotation === true){
				interval = setInterval(goToNextSlide, config.interval);
			}
		};

		//Next slide
		var goToNextSlide = function(){

			//Update slide status
			if(nextSlide){
				dom.removeClass('left', carouselElement);
				dom.addClass('right', carouselElement);

				if(prevSlide){ dom.removeClass('prev-slide', prevSlide); }
				dom.removeClass('active', currentSlide);
				dom.removeClass('next-slide', nextSlide);

				var index = allSlides.indexOf(currentSlide);

				prevSlide = currentSlide;
				currentSlide = allSlides[index+1];
				nextSlide = allSlides[index+2];

				if(config.wrapAround === true){
					if(!currentSlide && !nextSlide){
						currentSlide = allSlides[0];
						nextSlide = allSlides[1];
					}
					else if(!nextSlide){
						nextSlide = allSlides[0];
					}
				}

				if((config.wrapAround === false && index !== (allSlides.length-1)) || config.wrapAround === true){
					dom.addClass('animating', carouselElement);
				}

				if(prevSlide){ dom.addClass('prev-slide', prevSlide); }
				if(nextSlide){ dom.addClass('next-slide', nextSlide); }
				dom.addClass('active', currentSlide);

				callback();
			}
		};

		//Previous slide
		var goToPrevSlide = function(){
			if(prevSlide){
				dom.removeClass('right', carouselElement);
				dom.addClass('left', carouselElement);

				if(nextSlide){ dom.removeClass('next-slide', nextSlide); }
				dom.removeClass('active', currentSlide);
				dom.removeClass('prev-slide', prevSlide);

				var index = allSlides.indexOf(currentSlide);

				nextSlide = currentSlide;
				currentSlide = allSlides[index-1];
				prevSlide = allSlides[index-2];

				if(config.wrapAround === true){
					if(!currentSlide && !prevSlide){
						currentSlide = allSlides[allSlides.length-1];
						prevSlide = allSlides[allSlides.length-2];
					}
					else if(!prevSlide){
						prevSlide = allSlides[allSlides.length-1];
					}
				}


				if((config.wrapAround === false && index !== 0) || config.wrapAround === true){
					dom.addClass('animating', carouselElement);
				}

				if(nextSlide){ dom.addClass('next-slide', nextSlide); }
				if(prevSlide){ dom.addClass('prev-slide', prevSlide); }
				dom.addClass('active', currentSlide);

				callback();
			}
		};

		var callback = function(){
			config.beforeTransition(currentSlide);

			var transitionEnd = function(){
				dom.removeClass('animating', carouselElement);
				currentSlide.removeEventListener('transitionend', transitionEnd);
				config.afterTransition(currentSlide);
			};

			currentSlide.addEventListener('transitionend', transitionEnd);
		};


		//Next slide on eventlistener
		var eventNext = function(){
			if(!dom.hasClass('animating', carouselElement)){
				goToNextSlide();
				clearInterval(interval);
			}
		};

		//Previous slide on eventlistener
		var eventPrev = function(){
			if(!dom.hasClass('animating', carouselElement)){
				goToPrevSlide();
				clearInterval(interval);
			}
		};

		//Click listeneres
		var prevButton = carouselElement.querySelector('.prev');
		if(prevButton){ prevButton.addEventListener('click', eventPrev); }

		var nextButton = carouselElement.querySelector('.next');
		if(nextButton){ nextButton.addEventListener('click', eventNext); }

		
		//Keyboard listeneres
		if(carouselCounter.length == 1){
			document.addEventListener('keydown', function(event){
			
				switch(event.keyCode){
					case 37:
						eventPrev();
					break;
					case 39:
						eventNext();
					break;
				}
			});
		}

		var touchEvents = {
			start: {x: 0, y: 0},
			current: {x: 0, y: 0},
			moved: false,

			touchStart: function(event){
				event.preventDefault();
				touch.start.x = event.touches[0].pageX;
				touch.start.y = event.touches[0].pageY;
			},

			touchMove:function(event) {
				event.preventDefault();
				if ( event.touches.length == 1 ) {
					touch.current.x = event.touches[0].pageX;
					touch.current.y = event.touches[0].pageY;
					touch.moved = true;
				}
			},

			touchEnd: function(event){
				event.preventDefault();

				var length = touch.start.x - touch.current.x;

				if (length > 70  && touch.moved) {
					eventNext();
					touch.moved = false;
				}
				else if(length < -70 && touch.moved){
					eventPrev();
					touch.moved = false;
				}
			}
		};
		
		//Touch listeneres
		if(config.touch){
			carouselElement.addEventListener('touchstart', touchEvents.touchStart);
			carouselElement.addEventListener('touchmove', touchEvents.touchMove);
			carouselElement.addEventListener('touchend', touchEvents.touchEnd);
		}
		

		setup();
		
		return {
			nextSlide: goToNextSlide,
			prevSlide: goToPrevSlide
		}
	};

	return {
		init: Carousel,
	};

})();
