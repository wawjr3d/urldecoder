'use strict';

var qs = require('qs');

var decodeFormEl = document.querySelectorAll('.decode-form')[0];
var encodedInputEl = document.querySelectorAll('.encoded')[0];
var outputEl = document.querySelectorAll('.output')[0];
var decodedEl = document.querySelectorAll('.decoded')[0];
var decodedParamsEl = document.querySelectorAll('.decoded-params')[0];
var hadSelected = false;

decodeFormEl.addEventListener('submit', function(e) {
  e.preventDefault();

  decode();
});

if (!isMobileDevice()) {
  encodedInputEl.addEventListener('click', function() {
    var start = encodedInputEl.selectionStart;
    var end = encodedInputEl.selectionEnd;
    var length = encodedInputEl.textLength;

    if (start === 0 && end === length) {
      return;
    }

    if (end > start) {
      // assume making a selection intentionally
      hadSelected = true;
      return;
    }

    if (hadSelected) {
      hadSelected = false;
      return;
    }

    encodedInputEl.focus();
    encodedInputEl.select();
  });

  encodedInputEl.addEventListener('blur', function() {
    hadSelected = false;
  });

  encodedInputEl.addEventListener('keydown', function(e) {
    if (e.keyCode == 13 && e.metaKey) {
      decode();
    }
  });
}

function isMobileDevice() {
    return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function decode() {
  var encodedInput = encodedInputEl.value || '';
  var decoded = decodeURIComponent(encodedInput);
  var urlParts = encodedInput.split('?');
  var uri = urlParts[0];
  var querystring = urlParts[1];

  if (!querystring && !/^https?:\/\//.test(uri)) {
    querystring = uri;
  }

  outputEl.classList.add('with-results');
  decodedEl.innerHTML = decoded;
  decodedParamsEl.innerHTML = '';

  if (querystring) {
    var decodedParams = qs.parse(querystring);
    var paramsFragment = document.createDocumentFragment();
    var sortedKeys = Object.keys(decodedParams).sort();

    sortedKeys.forEach(function(key) {
      var value = decodedParams[key];
      var termLineEl = buildTermLineEl();

      termLineEl.appendChild(termEl(key));
      termLineEl.appendChild(definitionEl(value));

      paramsFragment.appendChild(termLineEl);
    });

    decodedParamsEl.appendChild(paramsFragment);
  }
}

function buildTermLineEl() {
  var el = document.createElement('div');
  el.className = 'decoded-line';

  return el;
}

function termEl(key) {
  var el = document.createElement('span');
  el.className = 'decoded-key';
  el.innerHTML = key;

  return el;
}

function definitionEl(value) {
  var el = document.createElement('span');
  el.className = 'decoded-value';
  el.innerHTML = typeof value !== 'string' ? JSON.stringify(value) : value;

  return el;
}
