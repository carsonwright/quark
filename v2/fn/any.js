module.exports = {
    isAny: function(items, callback){
        return items.filter(callback).length != 0;
    }
}