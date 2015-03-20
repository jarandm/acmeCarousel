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
				dom.style("webkitAnimationDuration", config.transitionDuration + "ms", carouselChildren[ii]);
				dom.addClass('effect-' + config.transition, carouselChildren[ii]);
				allSlides.push(carouselChildren[ii]);
			}

			//Set default slides status
			activeSlide = allSlides[0];
			nextSlide = allSlides[1];

			dom.addClass('active', activeSlide);
			if(nextSlide){ dom.addClass('next-slide', nextSlide); }
			if(config.wrapAround === true){
				prevSlide = allSlides[allSlides.length-1];
				if(prevSlide){ dom.addClass('prev-slide', prevSlide); }
			}

			//Start autorotation if set
			if(config.autoRotation === true){
				interval = setInterval(function(){
					goTo('next')
				}, config.interval);
			}
			
			eventListeners();
		};
		
		//direction: "prev" or "next" 
		var goTo = function(direction){
			if(allSlides.length <= 1){ return false; }
			
			var oldSlide = allSlides.indexOf(activeSlide);
			
			if(direction == 'prev'){
				if(oldSlide == 0 && config.wrapAround === false){ return false; }
				
				dom.removeClass('right', carouselElement);
				dom.addClass('left', carouselElement);
			}
			else{
				if((allSlides.length - 1) <= oldSlide && config.wrapAround === false){ return false; }
				
				//Add class to define animation direction
				dom.removeClass('left', carouselElement);
				dom.addClass('right', carouselElement);
			}
			
			//Remove current classes
			if(prevSlide){ dom.removeClass('prev-slide', prevSlide); }
			if(nextSlide){ dom.removeClass('next-slide', nextSlide); }
			dom.removeClass('active', activeSlide);
			
			
			if(direction == 'next'){
				//Update slide status
				prevSlide = activeSlide;
				activeSlide = allSlides[oldSlide+1];
				nextSlide = allSlides[oldSlide+2];
	
				if(!activeSlide && !nextSlide){
					activeSlide = allSlides[0];
					nextSlide = allSlides[1];
				}
				else if(!nextSlide){
					nextSlide = allSlides[0];
				}
			}
			else{
				//Update slide status
				nextSlide = activeSlide;
				activeSlide = allSlides[oldSlide-1];
				prevSlide = allSlides[oldSlide-2];
					
				if(!activeSlide && !prevSlide){
					activeSlide = allSlides[allSlides.length-1];
					prevSlide = allSlides[allSlides.length-2];
				}
				
				else if(!prevSlide){
					prevSlide = allSlides[allSlides.length-1];
				}
			}

			//Add class to wrapper while animating
			dom.addClass('animating', carouselElement);
			
			//Add classes
			if(prevSlide){ dom.addClass('prev-slide', prevSlide); }
			if(nextSlide){ dom.addClass('next-slide', nextSlide); }
			dom.addClass('active', activeSlide);

			callback();			
		};

		var callback = function(){
			config.beforeTransition(activeSlide);

			var transitionEnd = function(){
				//remove animating class when animation is finished
				dom.removeClass('animating', carouselElement);
				
				//Remove eventlistener
				activeSlide.removeEventListener('webkitAnimationEnd', transitionEnd);
				
				//Run callback
				config.afterTransition(activeSlide);
			};

			activeSlide.addEventListener('webkitAnimationEnd', transitionEnd);
		};

		//Next slide on eventlistener
		var eventNext = function(){
			if(!dom.hasClass('animating', carouselElement)){
				goTo('next');
				clearInterval(interval);
			}
		};

		//Previous slide on eventlistener
		var eventPrev = function(){
			if(!dom.hasClass('animating', carouselElement)){
				goTo('prev');
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
			if(prevButton){ prevButton.addEventListener('click', eventPrev.bind(this)); }
	
			var nextButton = carouselElement.querySelector('.next');
			if(nextButton){ nextButton.addEventListener('click', eventNext.bind(this)); }
	
			
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
			nextSlide: function(){
				goTo('next');
			},
			prevSlide: function(){
				goTo('prev');
			}
		}
	};

	return {
		init: Carousel
	};

})();
