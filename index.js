function mQuery(){
    var Q = function(itemSelector, score){
        var q = {};
        
        if(score){
            q.items = [itemSelector];
        }else if(typeof itemSelector != "string"){
            q.items = Q.kind(itemSelector) == "array" ? itemSelector : [itemSelector];
        }else{
            q.items = document.querySelectorAll(itemSelector) || [];
        }
            
        q.includes = function(item){
            return Q.includes(this.items, item);
        }
        q.find = function(itemSelector){
            return Q(this.items[0].querySelectorAll(itemSelector))
        }
        q.attr = function(key, value){
            if(value){
                this.items.forEach(function(item){
                    item.setAttribute(key, value);
                })            
            }else{
                return this.items[0].getAttribute(key);
            }
            return this;
        }
        q.addClass = function(name){
            this.items.forEach(function(item){
                if(item.className.indexOf(name) == -1){
                    klasses = Q.compact(item.className.split(" "))
                    item.className = [].concat(klasses, name).join(" ")
                }
            })
            return this;
        }
        q.removeClass = function(name){
            this.items.forEach(function(item){
                if(item.className.indexOf(name) != -1){
                    item.className = item.className.split(" ").filter(function(cName){ 
                        return cName != name 
                    }).join(" ")
                }
            })
            return this;
        }
        q.html = function(innerHTML){
            if(innerHTML){
                q.items.forEach(function(item){
                    item.innerHTML = innerHTML
                })
                return innerHTML;
            }else{
                return q.items[0].innerHTML;
            }
        }
        
        q.try = function(key, options){
            if(Q.includes(key, ".")){
                keys = key.split(".")
                firstKey = keys.splice(0, 1);
                otherKeys = keys.join(".")
                return Q(this.try(firstKey)).try(otherKeys)
            }
            
            if(Q.includes(key, "||")){
                key = key.replace("||", "")
                return this.items[0][key] ? this.items[0][key] : this.items[0][key] = options;
            }

            if(typeof this.items[0][key] == "function"){
                return this.items[0][key](options)
            }else if(this.items[0][key] == null){
                return Q();
            }else if(this.items[0][key]){
                return this.items[0][key];
            }
        }
        q.length = q.items.length;
        q.isBlank = function(){
            Q.isBlank(this.items[0])
        }
        q.isKind = function(type){
            return Q.kind(this.items[0]) == type;
        }
        return q;
    }

    Q.ajax = function(options){
        optins = options || {};
        return new Q.Promise(function(resolve, reject){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    html = Q.includes(options.url, ".html")
                    if(!html && !options.type || options.type == 'json'){
                        var data = Q.json(this.responseText);
                    }else{
                        var data = this.responseText;
                    }
                    resolve(data)
                }
            };
            xhttp.open(options.method, options.url, true);
            xhttp.send(Q.json(options.data));
        })
    }
    var _ = function(selector){
        return Q(selector, true);
    }
    Q.includes = function(item, value){
        return item.indexOf(value) != -1
    }
    Q.isBlank = function(data){
        if(typeof data == "string"){
            return data.replace(/ /g, "").length == 0;
        }else if(Array.isArray(data)){
            return data.length == 0;
        }else if(data == null){
            return true
        }else if(typeof data == "object"){
            return Object.keys(data).length == 0;
        }else{
            return false;
        }
    }

    Q.compact = function(items){
        return items.filter(function(item){ 
            return !Q.isBlank(item);
        })
    }
    Q.isAny = function(items, callback){
        return items.filter(callback).length != 0;
    }

    Q.kind = function(item){
        if(Array.isArray(item)){
            return "array";
        }else if(item === null){
            return "null";
        }else if(item === undefined){
            return "undefined";
        }else if(typeof item == "function" && !Q.isBlank(item.prototype)){
            return "class";
        }else{
            return typeof item;
        }
    }
    Q.mock = function(reason, ajaxOptions){
        Q.realAjax = Q.ajax
        Q(Q.mock).try("||reasons", []).push(reason)
        Q.ajax = function(options){
            return new Q.Promise(function(resolve, reject){
                var reason = Q.mock.reasons.filter(function(r){
                    return r(options)
                })[0]
                if(reason){
                    resolve(reason(options));
                }else{
                    Q.realAjax(options).then(function(response){
                        resolve(response);
                    })
                }
            })
        }
    }
    Q.get = function(url, data){
        var opts = {
            method: "GET"
        }
        opts.url = url;
        if(data){
            opts.url = [url, "?",  Q.parameterize(data)].join("");
        }
        
        return this.ajax(opts);
    }

    Q.post = function(url, data){
        var opts = {
            method: "POST"
        }
        opts.url = url;
        opts.data = data;
        return this.ajax(opts);
    }

    Q.put = function(url, data){
        var opts = {
            method: "PUT"
        }
        opts.url = url;
        opts.data = data;
        return this.ajax(opts);
    }

    Q.delete = function(url){
        var opts = {
            method: "DELETE"
        }
        opts.url = url;
        return this.ajax(opts);
    }

    Q.parameterize = function(data){
        return Object.keys(data).map(function(key){
            [key, '=', data[key]].join("")
        }).join("&")
    }

    Q.json = function(data){
        if(typeof data == "string"){
            try{
                var data = JSON.parse(data);
            }catch(e){}
            return data;
        }else{
            try{
                var data = JSON.stringify(data);
            }catch(e){}
            return data;
        }
    }

    Q.Promise = function(callback){
    var opts = {};
    resolve = function(params){
        opts.resParams = params;
        (opts.thens || []).forEach(function(res){
            res.apply(opts, [params])
        }) 
    }

    reject = function(params){
        opts.rejParams = params;
        (opts.catchs || []).forEach(function(rej){
            rej.apply(opts, [params])
        }) 
    }

    opts.then = function(thenCallback){
        if(opts.resParams){
            thenCallback.apply(opts, [opts.resParams])
        }else{
            opts.thens = opts.thens || [];
            opts.thens.push(thenCallback)
        }
    }

    opts.catch = function(catchCallback){
        if(opts.rejParams){
            catchCallback.apply(opts, [opts.rejParams])
        }else{
            opts.catchs = opts.catchs || [];
            opts.catchs.push(catchCallback)
        }
    }

    callback(resolve, reject)
    return opts;
    }
    return {Q: Q, _: _};
}