module.exports = {
    removeClass: function(name){
        this.items.forEach(function(item){
            if(item.className.indexOf(name) != -1){
                item.className = item.className.split(" ").filter(function(cName){ 
                    return cName != name 
                }).join(" ")
            }
        })
        return this;
    }
}