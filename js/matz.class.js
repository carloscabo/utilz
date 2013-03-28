/**
* Matz is a Javascript "library" to help in common
* mathematic oprations that I found usefull in my
* HTML5 / Canvas projects.
*
* by Carlos Cabo 2013
* http://carloscabo.com
*
* Some formulas borrowed from Processing.js
*/

/* Namespace container */

var matz = matz || {};

/* Functions */

/*
* Cantor Pairing
* Combines 2 integer numbers in one. Can be reversed.
* var newNumber = matz.cantorPair(123,789);
* var originalNumbers = matz.reverseCantorPair(newNumber);
*/
matz.cantorPair = function(x, y) {
  var z = ((x + y) * (x + y + 1)) / 2 + y;
  return z;
};

matz.reverseCantorPair = function(z) {
  var pair = [];
  var t = Math.floor((-1 + Math.sqrt(1 + 8 * z))/2);
  var x = t * (t + 3) / 2 - z;
  var y = z - t * (t + 1) / 2;
  pair[0] = x;
  pair[1] = y;
  return pair;
};

/*
* LERP (Linear interpolation)
 Calculates a number between two numbers at a specific increment.The amt parameter is the amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc. The lerp function is convenient for creating motion along a straight path and for drawing dotted lines.
*/
matz.lerp = function(value1, value2, amt) {
  return value1 + (value2 - value1) * amt;
};

/*
  Radians to Degrees, and Degrees to Radians
*/
matz.radToDeg = function (rad) {
  return rad * (180 / Math.PI);
}

matz.degToRad = function (deg) {
  return deg * (Math.PI / 180);
}

/* Anglelerp
* Interpolates between 2 angles in degrees
* @param ang1 angle in degrees
* @param ang2 angle in degrees
* @param percent in float 0 - 1
*/
matz.angleLerp = function (ang1, ang2, percent) {
  var rad1 = matz.degToRad(ang1);
  var rad2 = matz.degToRad(ang2);
  return matz.radToDeg(matz.lerp(rad1, rad2, percent));
};
/* picks the shorter way clock or counterclokwise */
matz.angleLerpShort = function (ang1, ang2, percent) {

  if (Math.abs(ang2 - ang1) > 180) {
    if(ang2 > ang1) {
      ang1 += 360;
    } else {
      ang2 += 360;
    }
  }

  // Interpolate and map to 0-360
  var res = matz.lerp(ang1, ang2, percent);
  if (res < 0 || res > 360) { res %= 360; }
  return res;
};

// norm
/* Normalizes a number from another range into a value between 0 and 1. */

matz.norm = function (aNumber, low, high) {
  return (aNumber - low) / (high - low);
};
matz.norm01 = matz.norm;

/* Norm between 1-0 */
matz.norm10 = function (aNumber, low, high) {
  return Math.abs(((aNumber - low) / (high - low))-1);
};

/* Norm between 1-0-1 */
matz.norm101 = function (aNumber, low, high) {
  return Math.abs(((aNumber - low) / (high - low))-0.5)*2;
};

/* Norm between 0-1-0 */
matz.norm010 = function (aNumber, low, high) {
  return Math.abs((Math.abs(((aNumber - low) / (high - low))-0.5)*2)-1);
};

// Map
/* Re-maps a number from one range to another. */
matz.map = function (value, ori_start, ori_stop, dest_start, dest_stop) {
  return dest_start + (dest_stop - dest_start) * ((value - ori_start) / (ori_stop - ori_start));
};

// Dist
/* Calculates the distance between two points. */
/* x1, y1, x2, y2 [,x3, y3 ]*/
matz.dist = function() {
  var dx, dy, dz;
  if (arguments.length === 4) {
    dx = arguments[0] - arguments[2];
    dy = arguments[1] - arguments[3];
    return Math.sqrt(dx * dx + dy * dy);
  }
  if (arguments.length === 6) {
    dx = arguments[0] - arguments[3];
    dy = arguments[1] - arguments[4];
    dz = arguments[2] - arguments[5];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }
};

/* Get random flot with interval */
matz.getRandomFloat = function (min, max) {
  if (min == max) {
    return min;
  } else {
    return Math.random() * (max - min) + min;
  }
};
