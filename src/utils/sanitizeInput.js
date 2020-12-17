const stripHtml = require('string-strip-html');

function sanitaze(params){
  params = Object.fromEntries(
    Object.entries(params).map(([key, value]) => 
      typeof(value) === 'string' ? [key, stripHtml(value).result] : [key, value]
    ));
  return params;
}

module.exports = sanitaze;