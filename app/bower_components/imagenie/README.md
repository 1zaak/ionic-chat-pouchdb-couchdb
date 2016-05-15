# Imagenie - Image manipulation made easy!

Imagenie is a JavaScript library which helps web developers and designers to manipulate or explore
images in web pages easily and directly, without having to edit it offline with graphic design softwares.

## Installation
To get going with Imagenie:  
1. Install via bower:  
  `bower install imagenie --save`  
2. Add imagenie.min.js to your web page:  
  `<script src="bower_components/imagenie/dist/imagenie.min.js"></script>`

## Quick start
The first thing to do is to tell Imagenie which images you want to edit or query. This can be done by creating a new instance of Imagenie, which its argument could be on of the following:
* A CSS selector:
`var ig = new Imagenie('.someSection img');`
* An element, HTML collection or a node list:
`var ig = new Imagenie(document.getElementById('myImage'));`
`var ig = new Imagenie(document.getElementsByTagName('img'));`
`var ig = new Imagenie(document.querySelectorAll('#someSection img'));`
* Or even a valid image URL, either relative or absolute:
`var ig = new Imagenie('../images/myImage.png');`
`var ig = new Imagenie('http://www.my.site.com/images/myImage.png');`
Imagenie can receive as many arguments as you need which, by the way, can also be mix of the type above, for example:
`var ig = new Imagenie('../images/myImage.png', document.images);`

## Imagemin commands
Imagenie can either query images for some information, such as size or transparency, or to manipulate images: resize it, swap one color with another, add alpha (opacity) channel or even crop it.
Notice that Imagenie is restricted to work with images of the same origin -OR- images which were allowed by server by [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image) header.
To keep samples simple, let's assume that we have a variable `ig` which is an instance of the following command `new Imagenie(document.getElementById('myImage'));`

### Query images
* **`pixel(intX, intY)`** - Gets image(s) pixel RGBA values in specific location.
  * intX {integer: 0<=} X coordinate
  * intY {integer: 0<=} Y coordinate

  Returns array of objects, one per image:
  * R {integer: 0-255} - red component value in pixel
  * G {integer: 0-255} - green component value in pixel
  * B {integer: 0-255} - blue component value in pixel
  * A {integer: 0-255} - alpha (transparency) component value in pixel

  Sample:
  ```javascript
  var color = ig.pixel(120, 150); // => [{R: 0, G: 255, B: 0, A: 255}]
  ```

* **`size()`** - Gets image(s) dimension.
Returns array of objects, one per image:
  * src {string} - image path
  * displayWidth {integer} - image width as seen in web page
  * displayHeight {integer} - image height as seen in web page
  * naturalWidth {integer} - original image width
  * naturalHeight {integer} - original image height

  Sample:
  ```javascript
  var size = ig.size();
  /*
  => [{
    src: 'http://www.somesite.com/images/myImage.png',
    displayWidth: 200,
    displayHeight: 200,
    naturalWidth: 400,
    naturalHeight: 400
  }]
  */
  ```

* **`transparency()`** - Checks if image contains alpha channel.
Returns array of booleans, one per image: **true** if image contains alpha channel (has transparent areas), **false** otherwise
  Sample:
  ```javascript
  var isTransparent = ig.transparency(); // => [false]
  ```

### Manipulate images
As mentioned above, Imagenie helps you also modify images on-the-fly; Images are immediately affected after execution. Also, notice that all commands in this section are chain-able, which means you can call few of them in a single call. Let's see those commands!

* **`reset()`** - Resets image to its original state. Useful when chaining few commands.


* **`invert()`** - Inverts image(s) colors.


* **`grayscale()`** - Converts image(s) colors to grayscale.


* **`alpha(dcmOpacity, blnIgnoreTransparent)`** - Sets alpha channel to all pixels in image(s).
  * `dcmOpacity` {decimal: 0-1} - Opacity level
  * `blnIgnoreTransparent` {boolean} - When set to true, fully transparent pixels opacity won't be overwritten


* **`swap(objFromColor, objToColor)`** - Swaps one color to another in image(s).
  * `objFromColor` {object: {r,g,b,a}} - RGBA value to search for. Notice that you don't have to specify all properties
  * `objToColor` {object: {r,g,b,a}} - RGBA value to replace with


* **`mirror()`** - Flips image(s) horizontally.


* **`rotate(intDegrees)`** - Rotates image(s)  
  * `intDegrees` {integer: 0-360} - The rotation angle in degrees


* **`resize(intWidth, intHeight)`** - Resizes image(s).  
  * `intWidth` {number: 0<} - Image new width
  * `intHeight` {number: 0<} - Image new height


* **`scale(dcmFactor)`** - Scales image (preserves ratio).  
  * `dcmFactor` {decimal: 0<} - Scaling factor


* **`crop(intX, intY, intWidth, intHeight)`** - Crops image(s).  
  * `intX` {integer: 0<} - X coordinate where to start clipping
  * `intY` {integer: 0<} - Y coordinate where to start clipping
  * `intWidth` {integer: 0<} - How many pixels to take horizontally
  * `intHeight` {integer: 0<} - How many pixels to take vertically

### Miscellaneous
In this section you can find additional methods:
* **`export()`** - Opens new browser tabs, one per input image, which display the image after applying formatting.
* **`ready()`** - This methods acts like a promise, which expects 2 methods: a success callback in case all input images loaded successfully and an error callback in case at least one of the images failed to load.
  This methods becomes handy especially when loading images from external source and not using an existing image element.
  You can also use it just as an image preloader!
  ```javascript
    var ig = new Imagenie('../images/myImage.png', 'anotherImage.jpg');

    ig.ready(
      function success () {
        console.log('Good to go!');
        ig.grayscale();
      },
      function error () {
        console.log('Oh no! At least one of my images is broken!');
      }
    );
    ```