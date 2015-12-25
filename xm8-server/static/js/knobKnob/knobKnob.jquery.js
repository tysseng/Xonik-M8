/**
 * @name		jQuery KnobKnob plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/11/pretty-switches-css3-jquery/
 * @license		MIT License
 */

(function($){
	var colors = [
		'26e000','2fe300','37e700','45ea00','51ef00',
		'61f800','6bfb00','77ff02','80ff05','8cff09',
		'93ff0b','9eff09','a9ff07','c2ff03','d7ff07',
		'f2ff0a','fff30a','ffdc09','ffce0a','ffc30a',
		'ffb509','ffa808','ff9908','ff8607','ff7005',
		'ff5f04','ff4f03','f83a00','ee2b00','e52000'
	];	

	$.fn.knobKnob = function(props){
		var options = $.extend({
			snap: 0,
			value: 0,
			turn: function(){}
		}, props || {});

		var tpl = '<div class="knob">\
					   <div class="top"></div>\
					   <div class="base"></div>\
				   </div>';

		function createColorBars(barsWrapper){
			var rad2deg = 180/Math.PI;
			var deg = 0;			

			for(var i=0;i<colors.length;i++){
				
				deg = i*12;
				$('<div class="colorBar">').css({
					backgroundColor: '#'+colors[i],
					transform:'rotate('+deg+'deg)',
					top: -Math.sin(deg/rad2deg)*80+100,
					left: Math.cos((180 - deg)/rad2deg)*80+100,
				}).appendTo(barsWrapper);
			}		
		}

		return this.each(function(){
			
			var el = $(this);
			el.append(tpl);
			el.wrap('<div class="bars">');
			el = el.parent();			

			var knob = $('.knob',el),
				knobTop = knob.find('.top'),
				startDeg = -1,
				currentDeg = 0,
				rotation = 0,
				lastDeg = 0,
				lastBarNum = -1;
				doc = $(document);
			
			createColorBars(el);

			function render(){
				knobTop.css('transform','rotate('+(currentDeg)+'deg)');
				options.turn(currentDeg/359);
				renderBars(el, currentDeg/359);
			}

			function renderFromValue(value){
				if(value > 0 && value <= 359){
					rotation = currentDeg = value;
					render();
				}				
			}

			function renderBars(bars, ratio){
				var colorBars = bars.find('.colorBar');
				var numBars = 0;

				numBars = Math.round(colorBars.length * ratio);
				
				// Update the dom only when the number of active bars
				// changes, instead of on every move		
				if(numBars == lastBarNum){
					return false;
				}
				lastBarNum = numBars;
				
				colorBars.removeClass('active').slice(0, numBars).addClass('active');
			}	

			// attach eventbus to receive external control signals
		    if(options.inEventBus){
		    	options.inEventBus.subscribe("" + options.controllerId, function(ev){
		    		renderFromValue(ev.detail);
		    	});
		    }

		    // initial position
			renderFromValue(options.value);

			knob.on('mousedown touchstart', function(e){
			
				e.preventDefault();
			
				var offset = knob.offset();
				var center = {
					y : offset.top + knob.height()/2,
					x: offset.left + knob.width()/2
				};
				
				var a, b, deg, tmp,
					rad2deg = 180/Math.PI;
				
				knob.on('mousemove.rem touchmove.rem',function(e){
					
					e = (e.originalEvent.touches) ? e.originalEvent.touches[0] : e;
					
					a = center.y - e.pageY;
					b = center.x - e.pageX;
					deg = Math.atan2(a,b)*rad2deg;
					
					// we have to make sure that negative
					// angles are turned into positive:
					if(deg<0){
						deg = 360 + deg;
					}
					
					// Save the starting position of the drag
					if(startDeg == -1){
						startDeg = deg;
					}
					
					// Calculating the current rotation
					tmp = Math.floor((deg-startDeg) + rotation);
					
					// Making sure the current rotation
					// stays between 0 and 359
					if(tmp < 0){
						tmp = 360 + tmp;
					}
					else if(tmp > 359){
						tmp = tmp % 360;
					}
					
					// Snapping in the off position:
					if(options.snap && tmp < options.snap){
						tmp = 0;
					}
					
					// This would suggest we are at an end position;
					// we need to block further rotation.
					if(Math.abs(tmp - lastDeg) > 180){
						return false;
					}
					
					currentDeg = tmp;
					lastDeg = tmp;
		
					// publish events to bus, may be transmitted to hardware.
				    if(options.outEventBus){
				    	options.outEventBus.publish(
				    		new CustomEvent("controller", {detail: {id: options.controllerId, value: currentDeg}})
			    		);
				    }

				    // show dial in GUI
			    	render();
				});
			
				doc.on('mouseup.rem  touchend.rem',function(){
					knob.off('.rem');
					doc.off('.rem');
					
					// Saving the current rotation
					rotation = currentDeg;
					
					// Marking the starting degree as invalid
					startDeg = -1;
				});	
			});
		});
	};
})(jQuery);
