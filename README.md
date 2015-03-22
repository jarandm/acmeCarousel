Demo: http://jfm.no/carousel/
#acmeCarousel

- Flere karuseller på samme side
- Animasjon: Horisontal, vertikal eller fade (enkelt å lage egne animasjoner i css)
- Tastaturnavigering (ved bruk av èn karusell)
- Touch-navigering
- Autorotasjon
- Callbacks
- API

##Bruk
Enkel initalisering
```javascript
var slider1 = new acmeCarousel.init('.carousel1');
```

Initalisering med konfigurasjon
```javascript
var slider2 = new acmeCarousel.init({
	selector: '.carousel2',
	interval: 2500,
	transitionDuration: 500,
	wrapAround: false,
	autoRotation: false,
	afterTransition: function(index){
		console.log('Position (callback): ' + index);
	}
});
```

API
```javascript
slider1.nextSlide();
```

HTML
```html
<div class="carousel">
	<div class="slides">
		<div class="slide">12</div>
		<div class="slide">34</div>
		<div class="slide">56</div>
	</div>
		
	<div class="controllers">
		<div class="prev"></div>
		<div class="next"></div>
	</div>
</div>
```

##Konfigurasjon

#####selector (default: ".carousel"): 
Definerer hva som er karusellen.

#####interval (default: 3000): 
Tid mellom hver slide.

#####transitionDuration (default: 1000)
Tid på overgangen mellom hver slide.

#####transition (default: "slide")
Type overgang (muligheter: slide, slide-vertical eller fade)

#####autoRotation (default: true)
Aktiverer/deaktiverer om karusellen skal gå automatisk videre til neste slide (true / false)

#####wrapAround (default: true)
Aktiverer/deaktiverer om karusellen kan gå i loop (true / false)

#####keyboardNav
Akitverer/deaktiverer tastaturnavigering. Deaktiveres automatisk av ved bruk av flere karuseller i ett dokument.

#####touchNav (default: true)
Aktiverer/deaktiverer touch-navigering (true / false)

#####beforeTransition
Funksjon som kjører når transisjonen starter

#####afterTransition
Funksjon som kjører når transisjonen er ferdig

##API
#####nextSlide()
Tar karusellen til neste slide

#####prevSlide()
Tar karusellen til forrige slide

