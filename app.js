var Slider = (function(){
	
	
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
			keyboardNav: true,
			touchNav: true,
			beforeTransition: function() {},
			afterTransition:  function() {}
		};
		
		
		var config,
			carouselElement,
			carouselChildren,
			carouselCounter,
			allSlides = [],
			activeSlide,
			nextSlide,
			prevSlide,
			interval;
		

		var setup = function(){
			
			//Overwrite default config if user defined
			if(typeof userConfig === "string"){
				config = defaultConfig;
				config.selector = userConfig;
			}
			else{
				config = object.merge(defaultConfig, userConfig);
			}
			
			//Set DOM elements
			carouselElement = document.querySelector(config.selector);
			carouselChildren = carouselElement.querySelector('.slides').children;
			carouselCounter = document.querySelectorAll('.carousel');
		
			//Loop slides and add to Array
			for(var ii = 0, length = carouselChildren.length; ii < length; ii++){
				dom.style("transitionDuration", config.transitionDuration + "ms", carouselChildren[ii]);
				dom.addClass('effect-' + config.transition, carouselChildren[ii]);
				allSlides.push(carouselChildren[ii]);
			}

			//Set default slides status and add default classes
			activeSlide = allSlides[0];
			nextSlide = allSlides[1];
			dom.addClass('active', activeSlide);
			dom.addClass('next-slide', nextSlide);
			if(config.wrapAround === true){
				prevSlide = allSlides[allSlides.length-1];
				dom.addClass('prev-slide', prevSlide);
			}
			
			//Start autorotation if true
			if(config.autoRotation === true){
				
				interval = setInterval(function(){
					goTo(1)
				}, config.interval);
			}
			
			eventListeners();
		};
		
		var goTo = function(number){
			
			//Set index of current and next slide
			var oldSlide = allSlides.indexOf(activeSlide);
			var goToSlide = oldSlide + number;

			//If negtive number go backwards, if positiv number go forwards
			if(number < 0){
				if(oldSlide == 0 && config.wrapAround === false){ return false; }
				
				dom.removeClass('right', carouselElement);
				dom.addClass('left', carouselElement);
			}
			else{
				if((allSlides.length - 1) <= oldSlide && config.wrapAround === false){ return false; }
			
				dom.removeClass('left', carouselElement);
				dom.addClass('right', carouselElement);
			}				
			
			//remove current classes
			if(prevSlide){ dom.removeClass('prev-slide', prevSlide); }
			if(nextSlide){ dom.removeClass('next-slide', nextSlide); }
			dom.removeClass('active', activeSlide);
			
			//Update slider position
			prevSlide = allSlides[goToSlide - 1];
			activeSlide = allSlides[goToSlide];
			nextSlide = allSlides[goToSlide + 1];
			
			if(!prevSlide){ prevSlide = allSlides[allSlides.length-1]; }
			if(!nextSlide){ nextSlide = allSlides[0]; }
			
			if(goToSlide == allSlides.length){
				activeSlide = allSlides[0];
				nextSlide = allSlides[1]; 
			}

			if(oldSlide == 0 && number < 0){
				activeSlide = allSlides[allSlides.length-1];
				prevSlide = allSlides[allSlides.length-2];
			}
			
			//Add new classes
			dom.addClass('prev-slide', prevSlide); 
			dom.addClass('next-slide', nextSlide);
			dom.addClass('active', activeSlide);
			
			//Add class to wrapper while animating
			dom.addClass('animating', carouselElement);
			
			//Run callback
			callback();

		};

		var callback = function(){
			config.beforeTransition(activeSlide);

			var transitionEnd = function(){
				dom.removeClass('animating', carouselElement);
				activeSlide.removeEventListener('transitionend', transitionEnd);
				config.afterTransition(activeSlide);
			};

			activeSlide.addEventListener('transitionend', transitionEnd);
		};

		//Next slide on eventlistener
		var eventNext = function(){
			if(!dom.hasClass('animating', carouselElement)){
				goTo(1);
				clearInterval(interval);
			}
		};

		//Previous slide on eventlistener
		var eventPrev = function(){
			if(!dom.hasClass('animating', carouselElement)){
				goTo(-1);
				clearInterval(interval);
			}
		};
		
		var touchEvents = {
			start: {x: 0, y: 0},
			current: {x: 0, y: 0},
			moved: false,

			touchStart: function(event){
				touchEvents.start.x = event.touches[0].pageX;
				touchEvents.start.y = event.touches[0].pageY;
			},

			touchMove:function(event) {
				if ( event.touches.length == 1 ) {
					touchEvents.current.x = event.touches[0].pageX;
					touchEvents.current.y = event.touches[0].pageY;
					touchEvents.moved = true;
				}
			},

			touchEnd: function(event){

				var length = touchEvents.start.x - touchEvents.current.x;

				if (length > 70  && touchEvents.moved) {
					eventNext();
					touchEvents.moved = false;
				}
				else if(length < -70 && touchEvents.moved){
					eventPrev();
					touchEvents.moved = false;
				}
			}
		};
		
		var eventListeners = function(){
			//Click listeneres
			var prevButton = carouselElement.querySelector('.prev');
			if(prevButton){ prevButton.addEventListener('click', eventPrev); }
	
			var nextButton = carouselElement.querySelector('.next');
			if(nextButton){ nextButton.addEventListener('click', eventNext); }
	
			//Keyboard listeneres
			if(carouselCounter.length == 1 && config.keyboardNav){
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
			
			//Touch listeneres
			if(config.touchNav){
				carouselElement.addEventListener('touchstart', touchEvents.touchStart);
				carouselElement.addEventListener('touchmove', touchEvents.touchMove);
				carouselElement.addEventListener('touchend', touchEvents.touchEnd);
			}
		};
		
		setup();

		return {
			nextSlide: eventNext,
			prevSlide: eventPrev,
		}
	};

	return {
		init: Carousel
	};

})();
