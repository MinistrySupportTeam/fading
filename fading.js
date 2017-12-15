/*!
 * Fading v0.1.0
 * https://github.com/trenc/fading
 *
 * @author Tommy Schmucker tommyschmucker.de/yablo.de
 *
 * @license GPL-v2.0
 * @created 2017-12-13
 * @modified 2017-12-15
 *
 */

(function() {

	// options

	const options = {
		'fadeInDelay':  200, // ms
		'fadeOutDelay': 200, // ms
		'fadeInTime':   500, // ms
		'fadeOutTime':  500  // ms
	};


	// code

	const css = new function() {

		function addStyleSheet() {

			const head  = document.head;
			const style = document.createElement('style');

			head.appendChild(style);

		}

		this.insert = function(rule) {

			if (document.styleSheets.length === 0) {

				addStyleSheet();

			}

      const sheet = document.styleSheets[document.styleSheets.length - 1];
      const rules = sheet.rules;

			sheet.insertRule(rule, rules.length);

		};

	};

	const styleStatic  = 'position: absolute; top: 0; left: 0; z-index: 1001; width: 100%; height: 100%; padding: 0; background: #ffffff;';
	const styleFadeIn  = 'animation: fadeIn ' + options.fadeInTime + 'ms forwards; animation-delay:' + options.fadeInDelay + 'ms';
	const styleFadeOut = 'opacity: 0; animation: fadeOut ' + options.fadeOutTime + 'ms forwards; animation-delay: '+ options.fadeOutDelay + 'ms';
	const styleKeyIn   = '0% { opacity: 1 } 100% { opacity: 0 } 99% { z-index: 1001 } 100% { z-index: -1 }';
	const styleKeyOut  = '0% { opacity: 0 } 100% { opacity: 1 }';

	css.insert('#fading  { ' + styleStatic + '}');
	css.insert('.fadeIn  { ' + styleFadeIn + '}');
	css.insert('.fadeOut { ' + styleFadeOut + '}');
	css.insert('@keyframes fadeIn  { ' + styleKeyIn + '}');
	css.insert('@keyframes fadeOut { ' + styleKeyOut + '}');


	const div = document.createElement('div');
	div.id    = 'fading';
	document.body.append(div);

	// fad in
	window.onload = function() {

		div.className = 'fadeIn';

	};

	// fade out
	const allLinks = document.links;
	const wait     = options.fadeOutDelay + options.fadeOutTime;

	for (let i = 0; i < allLinks.length; i++) {

		const link = allLinks[i];

		link.onclick = function(ev) {

			ev.preventDefault();

			div.className += ' fadeOut';

			setTimeout(function() {

				window.location.href = link.href;

			}, wait);

		};

	}

})();
