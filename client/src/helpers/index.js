// @flow
import CONFIG from '../_config/app';
import _ from 'lodash';

function getResponseIfOnline(statusUrl: string): Promise<*> {
  const method =
    arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : "GET";
  const url = arguments[2];
  const resType = arguments[3];
  const xhr = new XMLHttpRequest();

  return new Promise((resolve, reject, onCancel) => {
    function onReady() {
      resolve(xhr.status && xhr.status < 12e3 ? xhr : null);
    }
    if (resType) {
      xhr.responseType = resType;
    }
    xhr.onload = onReady;
    xhr.onreadystatechange = () => {
      4 === xhr.readyState ? onReady() : 0 === xhr.readyState && resolve(null);
    };
    xhr.onerror = () => resolve(null);
    xhr.ontimeout = () => resolve(null);
    xhr.open(method, statusUrl, true);
    url ? xhr.send(url) : xhr.send();
  });
}

function checkOnline() {
  return getResponseIfOnline(CONFIG.API_ROOT, "GET")
    .then(function(response) {
      const isOnline = !!response;
      console.log("NetworkStatus:checkOnline response " + isOnline);
      return isOnline;
    }).catch(function(err) {
    console.error("NetworkStatus:checkOnline errored! " + err);
  })
}

function filterProductsByPrice(_productsByPage, _filterValue) {
  let filterResults = [];
  switch (_filterValue) {
    case 'price-ascendant':
      filterResults = _.sortBy(_productsByPage, ['cost']);
      break;
    case 'price-descendant':
      filterResults = _.reverse(_.sortBy(_productsByPage, ['cost']));
      break;
    default:
      filterResults = _productsByPage;
  }
  return filterResults;
}

export default {
  checkOnline: checkOnline,
  sortProductsByPrice: filterProductsByPrice,
}
