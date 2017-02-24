import Json from './json';
import Promise from '../promise';
Quark.Promise = Promise.Promise;
Quark.json = Json.json;

Quark.ajax = function(options){
    var Quark = this;
    optins = options || {};
    return new this.Promise(function(resolve, reject){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var html = options.url.indexOf(".html") != -1;
                if(!html && !options.type || options.type == 'json'){
                    var data = Quark.json(this.responseText);
                }else{
                    var data = this.responseText;
                }
                resolve(data);
            }
        };
        xhttp.open(options.method, options.url, true);
        xhttp.send(Quark.json(options.data));
    })
}

module.exports = Quark;


/******************************
 * REQUIRES:
 * Promise
 * json
 ******************************/