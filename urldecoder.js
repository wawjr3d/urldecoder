'use strict';

var qs = require('qs');

var decodeFormEl = document.querySelectorAll('.decode-form')[0];
var encodedInputEl = document.querySelectorAll('.encoded')[0];
var decodedEl = document.querySelectorAll('.decoded')[0];
var decodedParamsEl = document.querySelectorAll('.decoded-params')[0];

decodeFormEl.addEventListener('submit', function(e) {
  e.preventDefault();

  var decoded = decodeURIComponent(encodedInputEl.value);

  decodedEl.innerHTML = decoded || '';

  var querystring = decoded.split('?')[1];

  if (querystring) {
    var decodedParams = qs.parse(querystring);
    var paramsFragment = document.createDocumentFragment();
    var sortedKeys = Object.keys(decodedParams).sort();

    sortedKeys.forEach(function(key) {
      var value = decodedParams[key];

      paramsFragment.appendChild(termEl(key));
      paramsFragment.appendChild(definitionEl(value));
    });

    decodedParamsEl.appendChild(paramsFragment);
  }
});

encodedInputEl.addEventListener('click', function() {
  encodedInputEl.focus();
  encodedInputEl.select();
});

function termEl(key) {
  var el = document.createElement('dt');
  el.className = 'decoded-key';
  el.innerHTML = key;

  return el;
}

function definitionEl(value) {
  var el = document.createElement('dd');
  el.className = 'decoded-value';
  el.innerHTML = value;

  return el;
}
