module.exports = {
    attr: function(key, value){
        if(value){
            this.items.forEach(function(item){
                item.setAttribute(key, value);
            })            
        }else{
            return this.items[0].getAttribute(key);
        }
        return this;
    }
}