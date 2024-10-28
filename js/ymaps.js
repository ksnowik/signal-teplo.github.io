if($('.buy-content').length) {

	var script = document.createElement('script');
	script.src = 'https://api-maps.yandex.ru/2.1/?apikey=e77b1d93-76df-44af-af4f-93ffb21f3605&lang=ru_RU';
	script.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(script);

	script.onload = function () {
		ymaps.ready(init);
	};

	function init() {
		var acc = document.querySelectorAll(".contacts-acc");
		var viewportWidth = window.innerWidth;

		var i, db = [];
		for (i = 0; i < acc.length; i++) {
			db.push({
				coords: acc[i].dataset.coords.split(','),
				name: acc[i].querySelector(".contacts-title").innerText,
			});
		}
		;
		BalloonContentLayout2 = ymaps.templateLayoutFactory.createClass(
		 {
		  // Переопределяем функцию build, чтобы при создании макета начинать
		  // слушать событие click на кнопке-счетчике.
		  build: function () {
			  // Сначала вызываем метод build родительского класса.
			  BalloonContentLayout.superclass.build.call(this);
		  },

		  // Аналогично переопределяем функцию clear, чтобы снять
		  // прослушивание клика при удалении макета с карты.
		  clear: function () {
			  // Выполняем действия в обратном порядке - сначала снимаем слушателя,
			  // а потом вызываем метод clear родительского класса.
			  BalloonContentLayout.superclass.clear.call(this);
		  }
		});
		var j, collection = new ymaps.GeoObjectCollection();
		for (j = 0; j < db.length; j++) {
			collection.add(new ymaps.Placemark(db[j].coords, {
				hintContent: db[j].name,
			}, {
				preset: 'islands#blueDotIcon',
				balloonContentLayout: BalloonContentLayout2,
		// Запретим замену обычного балуна на балун-панель.
		// Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
		balloonPanelMaxMapArea: 0,
		// Опции.
		// Необходимо указать данный тип макета.
		iconLayout: 'default#image',
		// Своё изображение иконки метки.
		iconImageHref: '../img/baloon.svg',
		// Размеры метки.
		iconImageSize: [64,75],
		// Смещение левого верхнего угла иконки относительно
		// её "ножки" (точки привязки).
		iconImageOffset: [-30, -75]
			}));
		}
		;

		destinations = {
			'664': [53.241471, 50.211351],
			'659': [53.211401, 50.244678],
			'657': [53.187699, 50.090959],
			'652': [53.196898, 50.177924],
			'650': [53.209287, 50.139953],
			'648': [53.202675, 50.125364],
			'215': [53.257704, 50.226191],
			'79': [53.233937, 50.187474],
		};

		var isMapFocused = true;
		var activeAccIndex;

		for (var i = 0, n = acc.length; i < n; ++i) {
			if (acc[i].getAttribute('aria-expanded') === 'true') {
				activeAccIndex = acc[i].dataset.id;
				break;
			}
		}

		var myMap = new ymaps.Map('map', {
			// center: destinations[activeAccIndex],
			center: destinations['79'],
			zoom: 12,
			behaviors: ['drag'],
			controls: [],
		});

		myMap.controls.add('zoomControl');
		myMap.controls.add('geolocationControl');
		if (viewportWidth <= 1023) {
			myMap.behaviors.disable('drag'),
				document.getElementById('map').addEventListener('click', function () {
					return myMap.behaviors.enable('drag');
				});
		}
		;
		myMap.geoObjects.add(collection);

		function clickGoto() {
			var pos = this.dataset.id;

			if (activeAccIndex === pos && isMapFocused) {
				myMap.setZoom(12);
				isMapFocused = false;
			} else {
				myMap.setCenter(destinations[pos]);
				myMap.setZoom(16);
				isMapFocused = true;
				activeAccIndex = pos;
			}

			console.log('test');

			var p = 1;
			const container = document.getElementsByClassName('.filialbox__filial');
			var nextPage = function () {
				var topPos = this.next('.accordion-content').offsetTop;
				container.scrollTo({top: topPos, behavior: 'smooth'});
			}


			return false;
		}

		for (var i = 0, n = acc.length; i < n; ++i) {
			acc[i].onclick = clickGoto;
		}
	}

}
document.addEventListener('DOMContentLoaded', function(){
    let checkLoad = 0;

    function init () {
        var myPlacemark = new ymaps.Placemark([51.399389, 46.066084], {

        }, {
				preset: 'islands#blueDotIcon',
		// Запретим замену обычного балуна на балун-панель.
		// Если не указывать эту опцию, на картах маленького размера откроется балун-панель.
		balloonPanelMaxMapArea: 0,
		// Опции.
		// Необходимо указать данный тип макета.
		iconLayout: 'default#image',
		// Своё изображение иконки метки.
		iconImageHref: '../img/baloon.svg',
		// Размеры метки.
		iconImageSize: [64,75],
		// Смещение левого верхнего угла иконки относительно
		// её "ножки" (точки привязки).
		iconImageOffset: [-30, -75]
			});

        let myMap = new ymaps.Map("contacts__map", {
            center: [51.399389, 46.066084],
            zoom: 16,
            controls: ['zoomControl', 'typeSelector']
        });
    	
    	myMap.controls.add(
    	   new ymaps.control.ZoomControl()
    	);

    	myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom');

        let layer = myMap.layers.get(0).get(0);
    }

    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function (resolve, reject) {
            let tc = getTileContainer(layer), readyAll = true;
            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function() {
                    resolve();
                });
            }
        });
    }

    function getTileContainer(layer) {
        for (let k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer || layer[k] instanceof ymaps.layer.tileContainer.DomContainer) {
                    return layer[k];
                }
            }
        }
        return null;
    }

    function loadScript(url, callback){

        let script = document.createElement("script");

        if (script.readyState){  //IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    let ymap = function() {
    	let page_content = document.querySelector('.contact__map');
    	let maps_api = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1";
        page_content.addEventListener('mouseenter', (e) => {
            if (checkLoad == 0) {
                checkLoad = 1;
                loadScript(maps_api, function(){
                    ymaps.load(init);
                }); 
            }
        });
		page_content.addEventListener("pointerenter", (e) => {
		    page_content.releasePointerCapture(e.pointerId) // <- Important!
	        if (checkLoad == 0) {
	            checkLoad = 1;
	            loadScript(maps_api, function(){
	                ymaps.load(init);
	            }); 
	        }
		})
    };
    ymap();

});