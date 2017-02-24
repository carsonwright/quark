module.exports = {
    html: function(innerHTML){
        if(innerHTML){
            this.items.forEach(function(item){
                item.innerHTML = innerHTML
            })
            return innerHTML;
        }else{
            return this.items[0].innerHTML;
        }
    }
}