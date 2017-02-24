module.exports = {
    Promise: function(callback){
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
}