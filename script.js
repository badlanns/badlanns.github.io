/*
 *  yahiarefaiea-official-website-beta 1.0.0
 *  
 *  I’m a 21 years old handsome guy who grows up in a small town in Syria.
 *  http://beta.yahiarefaiea.com/
 *  hello@yahiarefaiea.com
 *  
 *  Last update on: 2018/10/24
 *  ©2018 Yahia Refaiea. all rights reserved.
 */

$(document).ready(function () {
  var input = $('.field').find('input, textarea');
  input.keyup(function () {
    inputTest(this);
  });
});

function inputTest(that) {
  var field = $(that).closest('.field');
  var form = $(that).closest('form, .form');
  var length = $.trim($(that).val()).length;

  //  FILLED
  if (length > 0) field.addClass('filled');else field.removeClass('filled');

  //  VALIDATED
  if (length >= 4) {
    field.addClass('validated');
    form.addClass('validated');
  } else {
    field.removeClass('validated');
    form.removeClass('validated');
  }
}
var Timer = {
  length: null,
  time: null,
  selector: null,
  interval: null,
  callback: null,

  //  RUN
  run: function (selector, callback, length) {
    Timer.length = length;
    Timer.time = Timer.length;
    Timer.selector = selector;
    Timer.callback = callback;
    $(Timer.selector).text(Timer.length);
    Timer.interval = setInterval(Timer.count, 1000);
  },

  //  COUNT
  count: function () {
    Timer.time = Timer.time - 1;
    $(Timer.selector).text(Timer.time);
    if (Timer.time <= 0) {
      if (typeof Timer.callback === 'function' && Timer.callback) Timer.callback();
      Timer.reset();
    }
  },

  //  RESET
  reset: function () {
    clearInterval(Timer.interval);
    Timer.length = null;
    Timer.time = null;
    Timer.selector = null;
    Timer.interval = null;
    Timer.callback = null;
  }
};
var Identity = {
  duration: 1400,
  delay: 500,
  iteration: 0,
  processing: false,
  enough: false,
  interval: null,
  callback: null,
  status: 'loading',
  id: '#identity',
  selector: '#identity div',
  classes: 'working rest robot',

  //  WORK
  work: function () {
    if (Identity.status != 'loading') Identity.status = 'working';
    Identity.wait(function () {
      $(Identity.id).addClass('working');
    });
  },

  //  ROBOT
  robot: function () {
    Identity.status = 'robot';
    Identity.wait(function () {
      $(Identity.id).addClass('robot');
    });
  },

  //  REST
  rest: function () {
    Identity.abort();
    Identity.status = 'rest';
    setTimeout(function () {
      Identity.abort();
      $(Identity.id).addClass('rest');
    }, Identity.delay);
  },

  //  WAIT
  wait: function (call) {
    if (Identity.processing != true) {
      Identity.abort();
      Identity.processing = true;

      setTimeout(function () {
        if (typeof call === 'function' && call) call();
        Identity.waiting();
        Identity.interval = setInterval(Identity.waiting, Identity.duration);
      }, Identity.delay);
    }
  },

  //  WAITING
  waiting: function () {
    if (Identity.enough != true) {
      ++Identity.iteration;
      return;
    }

    Identity.stopping();
  },

  //  STOP
  stop: function (callback) {
    setTimeout(function () {
      if (Identity.processing == true) {
        Identity.enough = true;
        Identity.callback = callback;

        $(Identity.selector).attr('style', 'animation-iteration-count: ' + Identity.iteration + '; -webkit-animation-iteration-count: ' + Identity.iteration + ';');
      }
    }, Identity.delay);
  },

  //  STOPPING
  stopping: function () {
    clearInterval(Identity.interval);
    Identity.rest();

    if (typeof Identity.callback === 'function' && Identity.callback) Identity.callback();
    Identity.reset();
  },

  //  ABORT
  abort: function () {
    if (Identity.status == 'robot') $(Identity.id).removeClass('robot');else if (Identity.status != 'loading' && Identity.processing != true) $(Identity.id).removeClass(Identity.classes + ' loading');else $(Identity.id).removeClass(Identity.classes);
  },

  //  RESET
  reset: function () {
    Identity.iteration = 0;
    Identity.processing = false;
    Identity.enough = false;
    Identity.interval = null;
    Identity.callback = null;

    $(Identity.selector).removeAttr('style');
  }
};
var Stars = {
  canvas: null,
  context: null,
  circleArray: [],
  colorArray: ['#4c1a22', '#4c1a23', '#5d6268', '#1f2e37', '#474848', '#542619', '#ead8cf', '#4c241f', '#d6b9b1', '#964a47'],

  mouseDistance: 50,
  radius: .5,
  maxRadius: 1.5,

  //  MOUSE
  mouse: {
    x: undefined,
    y: undefined,
    down: false,
    move: false
  },

  //  INIT
  init: function () {
    this.canvas = document.getElementById('stars');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.display = 'block';
    this.context = this.canvas.getContext('2d');

    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('resize', this.resize);

    this.prepare();
    this.animate();
  },

  //  CIRCLE
  Circle: function (x, y, dx, dy, radius, fill) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = this.radius;

    this.draw = function () {
      Stars.context.beginPath();
      Stars.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      Stars.context.fillStyle = fill;
      Stars.context.fill();
    };

    this.update = function () {
      if (this.x + this.radius > Stars.canvas.width || this.x - this.radius < 0) this.dx = -this.dx;
      if (this.y + this.radius > Stars.canvas.height || this.y - this.radius < 0) this.dy = -this.dy;

      this.x += this.dx;
      this.y += this.dy;

      //  INTERACTIVITY
      if (Stars.mouse.x - this.x < Stars.mouseDistance && Stars.mouse.x - this.x > -Stars.mouseDistance && Stars.mouse.y - this.y < Stars.mouseDistance && Stars.mouse.y - this.y > -Stars.mouseDistance) {
        if (this.radius < Stars.maxRadius) this.radius += 1;
      } else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

      this.draw();
    };
  },

  //  PREPARE
  prepare: function () {
    this.circleArray = [];

    for (var i = 0; i < 1200; i++) {
      var radius = Stars.radius;
      var x = Math.random() * (this.canvas.width - radius * 2) + radius;
      var y = Math.random() * (this.canvas.height - radius * 2) + radius;
      var dx = (Math.random() - 0.5) * 1.5;
      var dy = (Math.random() - 1) * 1.5;
      var fill = this.colorArray[Math.floor(Math.random() * this.colorArray.length)];

      this.circleArray.push(new this.Circle(x, y, dx, dy, radius, fill));
    }
  },

  //  ANIMATE
  animate: function () {
    requestAnimationFrame(Stars.animate);
    Stars.context.clearRect(0, 0, Stars.canvas.width, Stars.canvas.height);

    for (var i = 0; i < Stars.circleArray.length; i++) {
      var circle = Stars.circleArray[i];
      circle.update();
    }
  },

  //  MOUSE MOVE
  mouseMove: function (event) {
    Stars.mouse.x = event.x;
    Stars.mouse.y = event.y;
  },

  //  RESIZE
  resize: function () {
    Stars.canvas.width = window.innerWidth;
    Stars.canvas.height = window.innerHeight;
  }
};
var renderer, scene, camera, ww, wh, particles;

ww = window.innerWidth, wh = window.innerHeight;

var centerVector = new THREE.Vector3(0, 0, 0);
var previousTime = 0;
speed = 10;
isMouseDown = false;

var getImageData = function (image) {

	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;

	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0);

	return ctx.getImageData(0, 0, image.width, image.height);
};

function getPixel(imagedata, x, y) {
	var position = (x + imagedata.width * y) * 4,
	    data = imagedata.data;
	return { r: data[position], g: data[position + 1], b: data[position + 2], a: data[position + 3] };
}

var drawTheMap = function () {

	var geometry = new THREE.Geometry();
	var material = new THREE.PointCloudMaterial();
	material.vertexColors = true;
	material.transparent = true;
	for (var y = 0, y2 = imagedata.height; y < y2; y += 1) {
		for (var x = 0, x2 = imagedata.width; x < x2; x += 1) {
			if (imagedata.data[x * 4 + y * 4 * imagedata.width] > 0) {

				var vertex = new THREE.Vector3();
				vertex.x = x - imagedata.width / 2 + (500 - 440 * .5);
				vertex.y = -y + imagedata.height / 2;
				vertex.z = -Math.random() * 500;

				vertex.speed = Math.random() / speed + 0.015;

				var pixelColor = getPixel(imagedata, x, y);
				var color = "rgb(" + pixelColor.r + ", " + pixelColor.g + ", " + pixelColor.b + ")";
				geometry.colors.push(new THREE.Color(color));
				geometry.vertices.push(vertex);
			}
		}
	}
	particles = new THREE.Points(geometry, material);

	scene.add(particles);

	requestAnimationFrame(render);
};

var init = function () {
	renderer = new THREE.WebGLRenderer({
		canvas: document.getElementById("yahia"),
		antialias: true,
		alpha: true
	});
	renderer.setSize(ww, wh);

	scene = new THREE.Scene();

	camera = new THREE.OrthographicCamera(ww / -2, ww / 2, wh / 2, wh / -2, 1, 1000);
	camera.position.set(0, -20, 4);
	camera.lookAt(centerVector);
	scene.add(camera);
	camera.zoom = 1;
	camera.updateProjectionMatrix();

	imagedata = getImageData(image);
	drawTheMap();

	window.addEventListener('mousemove', onMousemove, false);
	window.addEventListener('mousedown', onMousedown, false);
	window.addEventListener('mouseup', onMouseup, false);
	window.addEventListener('resize', onResize, false);
};
var onResize = function () {
	ww = window.innerWidth;
	wh = window.innerHeight;
	renderer.setSize(ww, wh);
	camera.left = ww / -2;
	camera.right = ww / 2;
	camera.top = wh / 2;
	camera.bottom = wh / -2;
	camera.updateProjectionMatrix();
};

var onMouseup = function () {
	isMouseDown = false;
};
var onMousedown = function (e) {
	isMouseDown = true;
	lastMousePos = { x: e.clientX, y: e.clientY };
};
var onMousemove = function (e) {
	if (isMouseDown) {
		camera.position.x += (e.clientX - lastMousePos.x) / 100;
		camera.position.y -= (e.clientY - lastMousePos.y) / 100;
		camera.lookAt(centerVector);
		lastMousePos = { x: e.clientX, y: e.clientY };
	}
};

var render = function (a) {

	requestAnimationFrame(render);

	particles.geometry.verticesNeedUpdate = true;
	if (!isMouseDown) {
		camera.position.x += (0 - camera.position.x) * 0.06;
		camera.position.y += (0 - camera.position.y) * 0.06;
		camera.lookAt(centerVector);
	}

	renderer.render(scene, camera);
};

var imgData = 'data:image/png;base64,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';

var image = document.createElement("img");
image.src = imgData;
var Submit = {

  //  DATA
  data: function (template, fields) {
    var data = {};
    for (i = 0; i < fields.length; i++) {
      var field = $(fields[i]);
      var name = field.attr('name');
      var value = field.val().replace(/(?:\r\n|\r|\n)/g, '<br>');
      data[name] = value;
    }

    return data;
  },

  //  PUSH
  push: function (form) {
    var template = $('.template[data-template=' + form + ']');
    var fields = template.find('.field input, .field textarea');

    //  WAITING
    Submit.view('[data-status=waiting]', template);

    //  AJAX
    $.ajax({
      type: 'POST',
      url: 'includes/php/' + form + '.php',
      data: { dd: JSON.stringify(Submit.data(template, fields)) },
      dataType: 'json',
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        Submit.callback('error', form, template, fields);
      },
      success: function (data) {
        Submit.callback('success', form, template, fields);
      }
    });
  },

  //  CALLBACK
  callback: function (status, form, template, fields) {
    setTimeout(function () {

      //  SUCCESS
      if (status == 'success') {
        template.find('.form .status').removeClass('current');
        fields.closest('.field').fadeOut(700);
        fields.closest('.form').find('.submit').fadeOut(700);
        Identity.stop();

        if (form == 'secret') secretAvailability = false;else if (form == 'opinion') opinionAvailability = false;

        setTimeout(function () {
          fields.closest('.form').find('.submit').remove();
          fields.closest('.field').remove();
          template.find('.form .status[data-status=success]').addClass('current');
        }, 750);
      }

      //  ERROR
      else {
          Submit.view('[data-status=error]', template);
          setTimeout(function () {
            Submit.view(':not([data-status])', template);
          }, 6000);
        }
    }, 4000);
  },

  //	VIEW
  view: function (selector, template) {
    template.find('.form .status').removeClass('current');
    template.find('.form .status' + selector).addClass('current');
  },

  //	LISTEN
  listen: function (selector) {
    $(selector).on('click', function (e) {
      if ($(this).closest('.form').hasClass('validated')) {
        var form = $(this).attr('data-form');
        Submit.push(form);
      }

      e.preventDefault();
    });
  }
};
var Router = {
	wrapper: [],
	location: null,

	//	ROUTE
	route: function (location, callback) {
		Identity.work();
		Router.location = Router.processLocation(location);

		//	ROUTES
		Router.routes(callback);
	},

	//	PROCESS LOCATION
	processLocation: function (location) {
		if (location === undefined) location = window.location.hash;

		return location.replace('#', '');
	},

	//	CALLBACK
	callback: function (callback) {
		setTimeout(function () {
			Identity.stop();
      Router.updateWrapper();
      Router.updateTemplate(Router.wrapper[0]);
      window.location.hash = Router.location;
      Router.location = null;

      //  CALLBACKS
      Router.callbacks(Router.wrapper[0]);
      if (typeof callback === 'function' && callback) callback();
		}, 200);
	},

	//	UPDATE TEMPLATE
	updateTemplate: function (template) {
		var templates = $('.template');
		var current = $('.template[data-template=' + template + ']');

		templates.removeClass('current');
		setTimeout(function () {
			templates.hide();
			current.show().addClass('current');
		}, 1120);
	},

	//	UPDATE WRAPPER
	updateWrapper: function (push, pull) {
		if (push) Router.push(push);
		if (pull) Router.pull(pull);

		var wrapper = Router.wrapper.toString().replace(/,/g, ' ');
		$('.wrapper').attr('class', 'wrapper ' + wrapper);
	},

	//	PUSH
	push: function (items) {
		items = items.split(' ');

		for (i = 0; i < items.length; i++) {
			if (!Router.wrapper.includes(items[i]) && items[i] != '') Router.wrapper.push(items[i]);
		}
	},

	//	PULL
	pull: function (items) {
		items = items.split(' ');

		for (i = 0; i < items.length; i++) {
			if (Router.wrapper.includes(items[i]) && items[i] != '') Router.wrapper.splice(Router.wrapper.indexOf(items[i]), 1);
		}
	},

	//	LISTEN
	listen: function () {
		$('.wrapper').on('click', '.router', function (e) {
			Router.route($(this).attr('href'), window[$(this).attr('data-callback')]);
			e.preventDefault();
		});

		window.addEventListener('popstate', function (e) {
			Router.route(undefined);
		});
	}
};
Router.routes = function (callback) {
  Router.wrapper = [];
  var location = Router.location.split('/').filter(Boolean);

  //  HOME
  Router.push('home');

  //  CALLBACK
  Router.callback(callback);
};
Router.callbacks = function (wrapper) {
  if (wrapper == 'secret') secret();else if (wrapper == 'opinion') opinion();else if (wrapper == 'bucketAll') bucketAll();else if (wrapper == 'notFound') notFound();
};
var secretAvailability = true;
function secret() {
  if (secretAvailability == true) {
    setTimeout(function () {
      var input = $('.template[data-template=secret] .field').find('input, textarea');

      input.focus();
      Identity.robot();
    }, Identity.duration * 1.25);
  }
}
var opinionAvailability = true;
function opinion() {
  if (opinionAvailability == true) {
    setTimeout(function () {
      var input = $('.template[data-template=opinion] .field').find('input, textarea');

      input.focus();
      Identity.robot();
    }, Identity.duration * 1.25);
  }
}
function bucketAll() {
  var list = $('.template[data-template=bucketAll] .bucketList');
  var link = list.find('li.archived a');

  //  LISTEN
  link.hover(function () {
    list.addClass('hover');
  }, function () {
    list.removeClass('hover');
  });
}
function notFound() {
  setTimeout(function () {
    Timer.run('.template[data-template=notFound] time', function () {
      Router.route('#');
    }, 5);
  }, Identity.duration * 1.25);
}

function notFoundCallback() {
  Timer.reset();
}
var md = new MobileDetect(window.navigator.userAgent);

$(document).ready(function () {
  Identity.work();
  $('.template main').mCustomScrollbar({
    theme: 'dark'
  });
});

function loadProject() {
  Router.route(undefined, function () {

    //  CALLBACK
    Router.listen();
    Submit.listen('.submit');
    if (!md.mobile()) {
      Stars.init();
      init();
    }
    setTimeout(function () {
      $('#signature').removeClass('loading');
    }, Identity.delay * 1.5);
  });
};

loadProject();