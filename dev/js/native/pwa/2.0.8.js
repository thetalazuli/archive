/*
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function () {
  // basic feature detection: from IE10+
  // also fallout on 'navigator.standalone', we _are_ an iOS PWA
  // if (!('onload' in XMLHttpRequest.prototype) || navigator.standalone) {
  //   return;
  // }

  var capableDisplayModes = ['standalone', 'fullscreen', 'minimal-ui'];
  var defaultSplashColor = '#f8f9fa';
  var defaultSplashTextSize = 24;
  var idealSplashIconSize = 128;
  var minimumSplashIconSize = 48;
  var splashIconPadding = 32;
  var userAgent = navigator.userAgent || '';
  var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') !== -1;
  var isSafariMobile = isSafari && userAgent.indexOf('Mobile/') !== -1;
  var isIEOrEdge = Boolean(userAgent.match(/(MSIE |Edge\/|Trident\/)/));
  var isEdgePWA = typeof Windows !== 'undefined';

  function setup() {
    var manifestEl = document.head.querySelector('link[rel="manifest"]');
    var manifestHref = manifestEl ? manifestEl.href : '';

    if (!manifestHref) {
      throw "can't find <link rel=\"manifest\" href=\"..\" />'";
    }

    var hrefFactory = buildHrefFactory([manifestHref, window.location]);
    var xhr = new XMLHttpRequest();
    xhr.open('GET', manifestHref); // nb. use getAttribute for older brower safety

    xhr.withCredentials = manifestEl.getAttribute('crossorigin') === 'use-credentials'; // this is IE10+

    xhr.onload = function () {
      try {
        var data =
        /** @type {!Object<string, *>} */
        JSON.parse(xhr.responseText);
        process(data, hrefFactory);
      } catch (err) {
        console.warn('pwacompat.js error', err);
      }
    };

    xhr.send(null);
  }
  /**
   * @param {!Array<string>} options
   * @return {function(string): string}
   */


  function buildHrefFactory(options) {
    var _loop = function _loop(i) {
      var opt = options[i];

      try {
        new URL('', opt);
        return {
          v: function v(part) {
            return new URL(part || '', opt).toString();
          }
        };
      } catch (e) {}
    };

    for (var i = 0; i < options.length; ++i) {
      var _ret = _loop(i);

      if (_typeof(_ret) === "object") return _ret.v;
    }

    return function (part) {
      return part || '';
    };
  }

  function push(localName, attr) {
    var node = document.createElement(localName);

    for (var k in attr) {
      node.setAttribute(k, attr[k]);
    }

    document.head.appendChild(node);
    return node;
  }

  function meta(name, content) {
    if (content) {
      if (content === true) {
        content = 'yes';
      }

      push('meta', {
        name: name,
        content: content
      });
    }
  }
  /**
   * @param {!Object<string, (string|*)>} manifest
   * @param {function(string): string} urlFactory
   */


  function process(manifest, urlFactory) {
    var icons = manifest['icons'] || [];
    icons.sort(function (a, b) {
      return parseInt(b.sizes, 10) - parseInt(a.sizes, 10);
    }); // largest first

    var appleTouchIcons = icons.map(function (icon) {
      // create icons as byproduct
      var attr = {
        'rel': 'icon',
        'href': urlFactory(icon['src']),
        'sizes': icon['sizes']
      };
      push('link', attr);

      if (!isSafariMobile) {
        return;
      }

      var dim = parseInt(icon['sizes'], 10);

      if (dim < 120) {
        return;
      }

      attr['rel'] = 'apple-touch-icon';

      return attr     //return push('link', attr);
    }).filter(Boolean);

    if (appleTouchIcons.length) {
      var last = appleTouchIcons[appleTouchIcons.length - 1];
   delete last.sizes; // smallest is 'default', no sizes needed
                      // last.removeAttribute('sizes');  crushed when remove !sizes! attribute on
                      // Safari 600.1.4 / iOS Simulator iPhone 5s iOS 8.1 
    } // nb. only for iOS, but watch for future CSS rule `@viewport { viewport-fit: cover; }`
    appleTouchIcons = appleTouchIcons.map(function(attr){
      return push('link',attr)
    })

    var metaViewport = document.head.querySelector('meta[name="viewport"]');
    var viewport = metaViewport && metaViewport.content || '';
    var viewportFitCover = Boolean(viewport.match(/\bviewport-fit\s*=\s*cover\b/));
    var display = manifest['display'];
    var isCapable = capableDisplayModes.indexOf(display) !== -1;
    meta('mobile-web-app-capable', isCapable);
    updateThemeColorRender(
    /** @type {string} */
    manifest['theme_color'] || 'black', viewportFitCover);

    if (isIEOrEdge) {
      // Pinned Sites, largely from https://technet.microsoft.com/en-us/windows/dn255024(v=vs.60)
      meta('application-name', manifest['short_name']);
      meta('msapplication-tooltip', manifest['description']);
      meta('msapplication-starturl', urlFactory(
      /** @type {string} */
      manifest['start_url'] || '.'));
      meta('msapplication-navbutton-color', manifest['theme_color']);
      var largest = icons[0];

      if (largest) {
        meta('msapplication-TileImage', urlFactory(largest['src']));
      }

      meta('msapplication-TileColor', manifest['background_color']);
    } // nb: we check, but this won't override any _earlier_ (in DOM order) theme-color


    if (!document.head.querySelector('[name="theme-color"]')) {
      meta('theme-color', manifest['theme_color']);
    }

    if (!isSafariMobile) {
      // TODO(samthor): We don't detect QQ or UC, we just set the vars anyway.
      var orientation = simpleOrientationFor(manifest['orientation']);
      meta('x5-orientation', orientation); // QQ

      meta('screen-orientation', orientation); // UC

      if (display === 'fullscreen') {
        meta('x5-fullscreen', 'true'); // QQ

        meta('full-screen', 'yes'); // UC
      } else if (isCapable) {
        meta('x5-page-mode', 'app'); // QQ

        meta('browsermode', 'application'); // UC
      }

      return; // the rest of this file is for Mobile Safari
    }

    var backgroundIsLight = shouldUseLightForeground(
    /** @type {string} */
    manifest['background_color'] || defaultSplashColor); // Add related iTunes app from manifest.

    var itunes = findAppleId(manifest['related_applications']);
    itunes && meta('apple-itunes-app', "app-id=".concat(itunes)); // General iOS meta tags.

    meta('apple-mobile-web-app-capable', isCapable);
    meta('apple-mobile-web-app-title', manifest['short_name'] || manifest['name']);
    /**
     * @param {{width: number, height: number}} arg 
     * @param {string} orientation 
     * @param {!Image|undefined} icon 
     * @return {function(): !HTMLLinkElement}
     */

    function splashFor(_ref, orientation, icon) {
      var width = _ref.width,
          height = _ref.height;
      var ratio = window.devicePixelRatio;
      var ctx = contextForCanvas({
        width: width * ratio,
        height: height * ratio
      });
      ctx.scale(ratio, ratio);
      ctx.fillStyle = manifest['background_color'] || defaultSplashColor;
      ctx.fillRect(0, 0, width, height);
      ctx.translate(width / 2, (height - splashIconPadding) / 2);

      if (icon) {
        // nb: on Chrome, we need the image >=48px, use the big layout >=80dp, ideal is >=128dp
        var iconWidth = icon.width / ratio;
        var iconHeight = icon.height / ratio;

        if (iconHeight > idealSplashIconSize) {
          // clamp to 128px height max
          iconWidth /= iconHeight / idealSplashIconSize;
          iconHeight = idealSplashIconSize;
        }

        if (iconWidth >= minimumSplashIconSize && iconHeight >= minimumSplashIconSize) {
          ctx.drawImage(icon, iconWidth / -2, iconHeight / -2, iconWidth, iconHeight);
          ctx.translate(0, iconHeight / 2 + splashIconPadding);
        }
      }

      ctx.fillStyle = backgroundIsLight ? 'white' : 'black';
      ctx.font = "".concat(defaultSplashTextSize, "px HelveticaNeue-CondensedBold");
      var title = manifest['name'] || manifest['short_name'] || document.title;
      var textWidth = ctx.measureText(title).width;

      if (textWidth < width * 0.8) {
        // short-circuit, just draw entire string
        ctx.fillText(title, textWidth / -2, 0);
      } else {
        // longer wrap case, draw once we have >0.7 width accumulated
        var words = title.split(/\s+/g);

        for (var i = 1; i <= words.length; ++i) {
          var cand = words.slice(0, i).join(' ');
          var measureWidth = ctx.measureText(cand).width;

          if (i === words.length || measureWidth > width * 0.6) {
            // render accumulated words
            ctx.fillText(cand, measureWidth / -2, 0);
            ctx.translate(0, defaultSplashTextSize * 1.2);
            words.splice(0, i);
            i = 0;
          }
        }
      }

      return function () {
        var generatedSplash =
        /** @type {!HTMLLinkElement} */
        document.createElement('link');
        generatedSplash.setAttribute('rel', 'apple-touch-startup-image');
        generatedSplash.setAttribute('media', "(orientation: ".concat(orientation, ")"));
        generatedSplash.setAttribute('href', ctx.canvas.toDataURL());
        return generatedSplash;
      };
    }
    /**
     * @param {!Image=} applicationIcon
     */


    function renderBothSplash(applicationIcon) {
      var portrait = splashFor(window.screen, 'portrait', applicationIcon);
      var landscape = splashFor({
        width: window.screen.height,
        height: window.screen.width
      }, 'landscape', applicationIcon); // this is particularly egregious setTimeout use, but the .toDataURL() is one of the
      // "bottlenecks" of PWACompat, so don't elongate any single frame more than needed.

      window.setTimeout(function () {
        document.head.appendChild(portrait());
        window.setTimeout(function () {
          document.head.appendChild(landscape());
        }, 10);
      }, 10);
    } // fetch the largest icon to generate a splash screen


    var icon = appleTouchIcons[0];
    var img = new Image();
    img.crossOrigin = 'anonymous';

    img.onerror = function () {
      renderBothSplash(); // something went wrong, generate blank image
    }; // nothing to render, just do the error case


    if (!appleTouchIcons.length) {
      img.onerror();
      return;
    }

    img.onload = function () {
      renderBothSplash(img); // also check and redraw icon

      if (!manifest['background_color']) {
        return;
      }

      var redrawn = updateTransparent(img, manifest['background_color']);

      if (!redrawn) {
        return; // the rest probably aren't interesting either
      }

      icon.href = redrawn; // fetch and fix all remaining icons

      appleTouchIcons.slice(1).forEach(function (icon) {
        var img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = function () {
          var redrawn = updateTransparent(img, manifest['background_color'], true);
          icon.href = redrawn;
        };

        img.src = icon.href;
      });
    };

    img.src = icon.href;
  }

  function findAppleId(related) {
    var itunes;
    (related || []).filter(function (app) {
      return app['platform'] === 'itunes';
    }).forEach(function (app) {
      if (app['id']) {
        itunes = app['id'];
      } else {
        var match = app['url'].match(/id(\d+)/);

        if (match) {
          itunes = match[1];
        }
      }
    });
    return itunes;
  }

  function simpleOrientationFor(v) {
    var prefix = String(v || '').substr(0, 3);
    return {
      'por': 'portrait',
      'lan': 'landscape'
    }[prefix] || '';
  }
  /**
   * @param {string} color
   * @param {boolean} viewportFitCover
   */


  function updateThemeColorRender(color, viewportFitCover) {
    if (!(isSafariMobile || isEdgePWA)) {
      return;
    }

    var themeIsLight = shouldUseLightForeground(color);

    if (isSafariMobile) {
      // nb. Safari 11.3+ gives a deprecation warning about this meta tag.
      var content = viewportFitCover ? 'black-translucent' : themeIsLight ? 'black' : 'default';
      meta('apple-mobile-web-app-status-bar-style', content);
    } else {
      // Edge PWA
      var t = getEdgeTitleBar();

      if (!t) {
        return; // something went wrong, we had a UWP without titleBar
      }

      t.foregroundColor = colorToWindowsRGBA(themeIsLight ? 'black' : 'white');
      t.backgroundColor = colorToWindowsRGBA(color);
    }
  }
  /**
   * @return {!ApplicationViewTitleBar|undefined}
   */


  function getEdgeTitleBar() {
    try {
      return Windows.UI.ViewManagement.ApplicationView.getForCurrentView().titleBar;
    } catch (e) {// implicit return undefined
    }
  }
  /**
   * The Windows titlebar APIs expect an object of {r, g, b, a}.
   *
   * @param {string} color
   * @return {WindowsColor}
   */


  function colorToWindowsRGBA(color) {
    var data = readColor(color);
    return (
      /** @type {WindowsColor} */
      {
        'r': data[0],
        'g': data[1],
        'b': data[2],
        'a': data[3]
      }
    );
  }
  /**
   * @param {string} color
   * @return {!Uint8ClampedArray}
   */


  function readColor(color) {
    var c = contextForCanvas();
    c.fillStyle = color;
    c.fillRect(0, 0, 1, 1);
    return c.getImageData(0, 0, 1, 1).data;
  }
  /**
   * @param {string} color
   * @return {boolean}
   */


  function shouldUseLightForeground(color) {
    var pixelData = readColor(color); // From https://cs.chromium.org/chromium/src/chrome/android/java/src/org/chromium/chrome/browser/util/ColorUtils.java

    var data = pixelData.map(function (v) {
      var f = v / 255;
      return f < 0.03928 ? f / 12.92 : Math.pow((f + 0.055) / 1.055, 2.4);
    });
    var lum = 0.2126 * data[0] + 0.7152 * data[1] + 0.0722 * data[2];
    var contrast = Math.abs(1.05 / (lum + 0.05));
    return contrast > 3;
  }

  function updateTransparent(image, background) {
    var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var context = contextForCanvas(image);
    context.drawImage(image, 0, 0); // look for transparent pixel in top-left
    // TODO: Chrome actually checks the four corners for some cases.

    if (!force) {
      var imageData = context.getImageData(0, 0, 1, 1);

      if (imageData.data[3] == 255) {
        return;
      }
    }

    context.globalCompositeOperation = 'destination-over'; // only replace transparent areas

    context.fillStyle = background;
    context.fillRect(0, 0, image.width, image.height);
    return context.canvas.toDataURL();
  }

  function contextForCanvas() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      width: 1,
      height: 1
    },
        width = _ref2.width,
        height = _ref2.height;

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas.getContext('2d');
  } // actually run PWACompat here


  if (document.readyState === 'complete') {
    setup();
  } else {
    window.addEventListener('load', setup);
  }
})();