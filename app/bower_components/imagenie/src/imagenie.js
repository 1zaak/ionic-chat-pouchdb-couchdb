/* global define*/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function () {
      // Also create a global in case some scripts
      // that are loaded still are looking for
      // a global even when an AMD loader is in use.
      return (root.Imagenie = factory(root));
    });
  } else {
    root.Imagenie = factory(root);
  }
})(this,
  function () {
    'use strict';

    var _images;

    /**
     * Helper object
     * @type {{log: Function}}
     */
    var Helper = {
      /**
       * Logs messages to console
       */
      log: function () {
        if (Config.debug) {
          console.log.apply(console, arguments);
        }
      },

      /**
       * Checks if a string is a valid URL
       * @param {string} strText Text to check
       * @returns {boolean} True if text is a valid URL, false otherwise
       */
      isValidURL: function (strText) {
        return !!strText.match(/^https?:\/\/|\.(png|jpg|gif)$/);
      },

      /**
       * Extends an existing object with other object
       * @param {*} target The default object to extends
       * @param {*} source The object with the new values
       * @returns {*} Merged object
       */
      extend: function (target, source) {
        var a = Object.create(target);
        Object.keys(source).map(function (prop) {
          prop in a && (a[prop] = source[prop]);
        });
        return a;
      }
    };

    /**
     * Configuration object
     * @type {{debug: boolean}}
     */
    var Config = {
      // Is dev environment?
      debug: true
    };

    var Canvas = {
      _init: function () {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d')
      },
      reset: function (intWidth, intHeight) {
        this.canvas.height = intHeight;
        this.canvas.width = intWidth;
        this.context.clearRect(0, 0, intWidth, intHeight);
      },
      drawImage: function (objImage, intX, intY, intWidth, intHeight) {
        this.reset(intWidth, intHeight);
        this.context.drawImage(objImage, intX, intY, intWidth, intHeight);
      },
      cropImage: function (objImage, intSX, intSY, intSWidth, intSHeight, intDX, intDY, intDWidth, intDHeight) {
        this.clear(intSWidth, intSHeight);
        this.context.drawImage(objImage, intSX, intSY, intSWidth, intSHeight, intDX, intDY, intDWidth, intDHeight);
      },
      getImageData: function (intX, intY, intWidth, intHeight) {
        return this.context.getImageData(intX, intY, intWidth, intHeight);
      }
    };
    Canvas._init();

    function Imagenie() {
      var that = this,
        args = arguments;

      // reset images:
      _images = [];

      /**
       * Initialization function
       */
      (function init() {
        [].forEach.call(args, function (input) {
          // Check if images argument is a string ot an array:
          if (typeof input === 'string') {
            // Check if string is a URL:
            if (Helper.isValidURL(input)) {
              Helper.log('Image URL');
              _images.push(_loadImageURL.call(that, input));
            }
            // Check if string is an image(s) selector:
            else if (document.querySelectorAll(input).length > 0) {
              Helper.log('Image element selector');

              [].forEach.call(document.querySelectorAll(input), function (elem) {
                if (elem.nodeName === 'IMG') {
                  _images.push({
                    elem: elem,
                    src: elem.src,
                    source: _getDataUrl(elem),
                    complete: elem.complete
                  });
                }
              });
            }
          }
          // Check if argument is an array (could be an array of one of the two options above)
          else if (input.constructor.name === 'NodeList' || input.constructor.name === 'HTMLCollection') {
            Helper.log('Image nodes list');
            [].forEach.call(input, function (elem) {
              if (elem.nodeName === 'IMG') {
                _images.push({
                  elem: elem,
                  source: _getDataUrl(elem),
                  src: elem.src,
                  complete: elem.complete
                });
              }
            });
          }
        });
      })();
    }

    /**
     * Load online image
     * @param {string} strURL Image URL
     * @returns {{elem: Image, source: string, src: string, complete: boolean}}
     * @private
     */
    function _loadImageURL(strURL) {
      var img = new Image(),
        that = this,
        obj = {
          elem: img,
          source: null,
          src: strURL,
          complete: false
        };

      img.addEventListener('load', function () {
        obj.source = _getDataUrl(img);
        obj.complete = img.complete;
        _readySuccess.call(that);
      });
      img.addEventListener('error', function () {
        obj.complete = false;
        _readyError.call(that);
      });

      img.src = strURL;

      return obj;
    }

    function _readyError() {
      var blnSomeFailed = _images.some(function (elmImage) {
        return elmImage.complete === false
      });

      if (blnSomeFailed && this.errorCallback && typeof this.errorCallback === 'function') {
        this.errorCallback();
        this.errorCallback = null;
      }
    }

    function _readySuccess() {
      var blnAllLoaded = _images.every(function (elmImage) {
        return elmImage.complete === true
      });

      if (blnAllLoaded && this.successCallback && typeof this.successCallback === 'function') {
        this.successCallback();
        this.successCallback = null;
      }
    }

    /**
     * Local shortcut to get image's data
     * @param {HTMLElement} elmImage Image element
     * @returns {[number]} Array of pixels. Each pixel is represented by 4 values: RGBA
     * @private
     */
    function _getImageDataArray(elmImage) {
      // Draw image on canvas:
      Canvas.drawImage(elmImage, 0, 0, elmImage.width, elmImage.height);
      // Get image data:
      return Canvas.getImageData(0, 0, elmImage.width, elmImage.height).data;
    }

    /**
     * Local shortcut to get image's data url (base64)
     * @param {HTMLElement} objImage Image element
     * @returns {string} Base64 representation of image data
     * @private
     */
    function _getDataUrl(objImage) {
      if (objImage.hasOwnProperty('src')) {
        // Draw image on canvas:
        Canvas.drawImage(objImage, 0, 0, objImage.width, objImage.height);
        // Get image data:
        return Canvas.canvas.toDataURL();
      }
    }

    /**
     * Manipulates pixels data
     * @param {function} fncManipulation Manipulation function
     * @private
     */
    function _manipulatePixel(fncManipulation) {
      _images.forEach(function (objImage) {
        var objImageData,
          data;

        // Draw image on canvas:
        Canvas.drawImage(objImage.elem, 0, 0, objImage.elem.width, objImage.elem.height);
        // Get image data:
        objImageData = Canvas.getImageData(0, 0, objImage.elem.width, objImage.elem.height);
        data = objImageData.data;
        // Subtract from each pixel's RGB component 255 (inversion):
        for (var i = 0, len = data.length; i < len; i += 4) {
          fncManipulation(data, i);
        }
        // Update canvas:
        Canvas.context.putImageData(objImageData, 0, 0);
        // Update image:
        objImage.elem.src = Canvas.canvas.toDataURL();
      });
    };

    Imagenie.prototype.ready = function (successCallback, errorCallback) {
      this.successCallback = typeof successCallback === 'function' && successCallback;
      this.errorCallback = typeof errorCallback === 'function' && errorCallback;

      _readyError.call(this);
      _readySuccess.call(this);
    };

    /**
     * Gets image(s) dimension
     * @returns [{src: {string}, displayWidth: {number}, displayHeight: {number}, naturalWidth: {number}, naturalHeight: {number}}] Width, height and source of image(s)
     */
    Imagenie.prototype.export = function () {
      _images.forEach(function (objImage) {
        window.open(objImage.elem.src, objImage.src);
      });
    };

    /**
     * Gets image(s) dimension
     * @returns [{src: {string}, displayWidth: {number}, displayHeight: {number}, naturalWidth: {number}, naturalHeight: {number}}] Width, height and source of image(s)
     */
    Imagenie.prototype.size = function () {
      return _images.map(function (objImage) {
        return {
          src: objImage.src,
          displayWidth: objImage.elem.width,
          displayHeight: objImage.elem.height,
          naturalWidth: objImage.elem.naturalWidth,
          naturalHeight: objImage.elem.naturalHeight
        };
      });
    };

    /**
     * Gets image pixel RGBA values
     * @param {number} intX X coordinate of a pixel
     * @param {number} intY Y coordinate of a pixel
     * @returns [{r: {number}, g: {number}, b: {number}, a: {number}}] RGBA value of image(s) pixel
     */
    Imagenie.prototype.pixel = function (intX, intY) {
      if (intX >= 0 && intY >= 0) {
        return _images.map(function (objImage) {
          var arrData = _getImageDataArray(objImage.elem);

          return {
            R: arrData[((objImage.elem.width * intY) + intX) * 4],
            G: arrData[((objImage.elem.width * intY) + intX) * 4 + 1],
            B: arrData[((objImage.elem.width * intY) + intX) * 4 + 2],
            A: arrData[((objImage.elem.width * intY) + intX) * 4 + 3]
          }
        });
      }
    };

    /**
     * Checks if image contains alpha channel
     * @returns [{boolean}] Transparency flag of image(s), true if it contains transparency, false otherwise
     */
    Imagenie.prototype.transparency = function () {
      return _images.map(function (objImage) {
        var arrData = _getImageDataArray(objImage);

        for (var y = 0; y < objImage.elem.height; y++) {
          for (var x = 0; x < objImage.elem.width; x++) {
            if (arrData[((objImage.elem.width * y) + x) * 4 + 3] < 255) {
              return true;
            }
          }
        }

        return false;
      });
    };

    /**
     * Crops image(s)
     * @param {number} intX The x coordinate where to start clipping
     * @param {number} intY The y coordinate where to start clipping
     * @param {number} intWidth How many pixels to take horizontally
     * @param {number} intHeight How many pixels to take vertically
     * @returns {Imagenie} for chainability
     */
    Imagenie.prototype.crop = function (intX, intY, intWidth, intHeight) {
      if (intX >= 0 && intY >= 0 && intWidth > 0 && intHeight > 0) {
        _images.forEach(function (objImage) {
          // Draw image on canvas:
          Canvas.cropImage(objImage.elem, intX, intY, intWidth, intHeight, 0, 0, intWidth, intHeight);
          // Update image:
          objImage.elem.src = Canvas.canvas.toDataURL();
        });
      }

      return this;
    };

    /**
     * Sets alpha channel to all pixels in image
     * @param {number} dcmOpacity Opacity level from 0 to 1
     * @param {boolean} blnIgnoreTransparent When set to true, fully transparent pixels opacity won't be overwritten
     * @returns {Imagenie} for chainability
     */
    Imagenie.prototype.alpha = function (dcmOpacity, blnIgnoreTransparent) {
      if (dcmOpacity >= 0 && dcmOpacity <= 1) {
        _manipulatePixel(function (arrPixel, i) {
          if (!blnIgnoreTransparent || arrPixel[i + 3] > 0) {
            arrPixel[i + 3] = dcmOpacity * 255;
          }
        });
      }

      return this;
    };

    /**
     * Scales image (preserves ratio)
     * @param {number} dcmFactor Scaling factor greater than 0
     * @returns {Imagenie} for chainability
     */
    Imagenie.prototype.scale = function (dcmFactor) {
      if (dcmFactor > 0) {
        _images.forEach(function (objImage) {
          // Draw image on canvas:
          Canvas.drawImage(objImage.elem, 0, 0, objImage.elem.width * Math.max(0, dcmFactor), objImage.elem.height * Math.max(0, dcmFactor));
          // Update image:
          objImage.elem.src = Canvas.canvas.toDataURL();
        });
      }

      return this;
    };

    /**
     * Resets image to its original state
     * @returns {Imagenie} for chainability
     */
    Imagenie.prototype.reset = function () {
      _images.forEach(function (objImage) {
        objImage.elem.src = objImage.source;
      });

      return this;
    };

    /**
     * Converts image(s) colors to Grayscale
     * @returns {Imagenie} for chainability
     */
    Imagenie.prototype.grayscale = function () {
      _manipulatePixel(function (arrPixel, i) {
        var brightness = 0.34 * arrPixel[i] + 0.5 * arrPixel[i + 1] + 0.16 * arrPixel[i + 2];

        arrPixel[i] = brightness;
        arrPixel[i + 1] = brightness;
        arrPixel[i + 2] = brightness;
      });

      return this;
    };

    /**
     * Flips image(s) horizontally
     * @returns {Imagenie} for chainability
     */
    Imagenie.prototype.mirror = function () {
      _images.forEach(function (objImage) {
        Canvas.reset(objImage.elem.width, objImage.elem.height);
        Canvas.context.save();
        Canvas.context.translate(objImage.elem.width / 2, objImage.elem.height / 2);
        // Flip canvas horizontally:
        Canvas.context.scale(-1, 1);
        // Draw image on canvas:
        Canvas.context.drawImage(objImage.elem, -objImage.elem.width / 2, -objImage.elem.height / 2, objImage.elem.width, objImage.elem.height);
        Canvas.context.restore();

        // Update image:
        objImage.elem.src = Canvas.canvas.toDataURL();
      });

      return this;
    };

    /**
     * Pixelate image(s)
     * @param {number} intPercent Percent of pixelation, 10 to 100. The lower the more pixelate image(s) get
     * @returns {Imagenie} for chainability
     */
    //Imagenie.prototype.pixelate = function (intPercent) {
    //  if(intPercent >= 0 && intPercent <= 100) {
    //    _images.forEach(function (objImage) {
    //      var h, w;
    //
    //      Canvas.reset(objImage.elem.width, objImage.elem.height);
    //      h = objImage.elem.height * intPercent * 0.01;
    //      w = objImage.elem.width * intPercent * 0.01;
    //      Canvas.context.mozImageSmoothingEnabled = false;
    //      Canvas.context.webkitImageSmoothingEnabled = false;
    //      Canvas.context.imageSmoothingEnabled = false;
    //      // Draw image on canvas:
    //      Canvas.context.drawImage(objImage.elem, 0, 0, w, h);
    //      Canvas.context.drawImage(Canvas.canvas, 0, 0, w, h, 0, 0, objImage.elem.width, objImage.elem.height);
    //
    //      // Update image:
    //      objImage.elem.src = Canvas.canvas.toDataURL();
    //    });
    //  }
    //
    //  return this;
    //};

    /**
     * Resizes image(s)
     * @param {number} intWidth Images new width
     * @param {number} intHeight Images new height
     * @returns {Imagenie} for chainability
     */
    Imagenie.prototype.resize = function (intWidth, intHeight) {
      if (intWidth >= 0 && intHeight >= 0) {
        _images.forEach(function (objImage) {
          // Draw image on canvas:
          Canvas.drawImage(objImage.elem, 0, 0, Math.max(0, intWidth), Math.max(0, intHeight));
          // Update image:
          objImage.elem.src = Canvas.canvas.toDataURL();
        });
      }

      return this;
    };

    /**
     * Rotates image(s)
     * @param {number} intDegrees The rotation angle in degrees
     * @returns {Imagenie} for chainability
     */
    Imagenie.prototype.rotate = function (intDegrees) {
      if (intDegrees >= 0) {
        _images.forEach(function (objImage) {
          Canvas.reset(objImage.elem.width, objImage.elem.height);
          Canvas.context.save();
          Canvas.context.translate(objImage.elem.width / 2, objImage.elem.height / 2);
          // Rotate canvas:
          Canvas.context.rotate((intDegrees % 360) * Math.PI / 180);
          // Draw image on canvas:
          Canvas.context.drawImage(objImage.elem, -objImage.elem.width / 2, -objImage.elem.height / 2, objImage.elem.width, objImage.elem.height);
          Canvas.context.restore();

          // Update image:
          objImage.elem.src = Canvas.canvas.toDataURL();
        });
      }

      return this;
    };

    /**
     * Inverts image(s) colors
     * @returns {Imagenie} for chainability
     */
    Imagenie.prototype.invert = function () {
      _manipulatePixel(function (arrPixel, i) {
        arrPixel[i] = 255 - arrPixel[i];
        arrPixel[i + 1] = 255 - arrPixel[i + 1];
        arrPixel[i + 2] = 255 - arrPixel[i + 2];
      });

      return this;
    };

    /**
     * Swaps one color to another in image(s)
     * @param {r,g,b,a} objFromColor RGBA value to search for. Notice that you don't have to specify all properties
     * @param {r,g,b,a} objToColor RGBA value to replace with
     * @returns {Imagenie} for chainability
     */
    Imagenie.prototype.swap = function (objFromColor, objToColor) {
      if (objFromColor && objToColor) {
        _manipulatePixel(function (arrPixel, i) {
          if ((!objFromColor.r || objFromColor.r === arrPixel[i]) &&
            (!objFromColor.g || objFromColor.g === arrPixel[i + 1]) &&
            (!objFromColor.b || objFromColor.b === arrPixel[i + 2]) &&
            (!objFromColor.a || objFromColor.a === arrPixel[i + 3])) {
            ['r', 'g', 'b', 'a'].forEach(function (channel, index) {
              if (objToColor.hasOwnProperty(channel)) {
                arrPixel[i + index] = objToColor[channel];
              }
            });
          }
        });
      }

      return this;
    };

    return Imagenie;

  });