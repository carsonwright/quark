module.exports = {
    isBlank: function(data){
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
}