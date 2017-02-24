module.exports = {
    init: function(itemSelector, score){
        if(score){
            this.items = [itemSelector];
        }else if(typeof itemSelector != "string"){
            this.items = this.Quark.kind(itemSelector) == "array" ? itemSelector : [itemSelector];
        }else{
            this.items = document.querySelectorAll(itemSelector) || [];
        }

        this.length = this.items.length;
        return this;
    }
}
/**********************************************
 * Main Query Support
 **********************************************/
