# Quark

A tool that mimicks a small amount of jQuery and underscore in its functionality, but is designed to be super modular so that you only have to include what you need.

### Selecting Something
```
Q(".mi-class").html("hello")
```

### Adding a Class
```
Q(".mi-class").addClass("hello")
```


### Removing a Class
```
Q(".mi-class").removeClass("hello")
```


### Ajax Requests
```
Q.ajax({method: "GET", url: "/here", data: {someData: "is here"} }).then(function(data){
  console.log(data)
})
```

#### Get
```
Q.get("/here").then(function(data){
  console.log(data)
})
```

#### Post
```
Q.post("/here", {someOfMyData: "I'm passing in"}).then(function(data){
  console.log(data)
})
```

#### Put
```
Q.put("/here", {otherData: "other data"}).then(function(data){
  console.log(data)
})
```

#### Delete
```
Q.delete("/here").then(function(){
  console.log("finished")
})
```


### Promises
```
var promise = new Q.Promise(function(resolve, reject){
  resolve("hello");
})

promise.then(function(response){
  console.log(response)
})

promise.catch(function(error){
  console.log(error)
})
```


### Try
```
Q({here: {is: {some: "data"}}}).try("here.is.some") // returns "data";

Q({here: {is: {some: function(){ return "data" }}}}).try("here.is.some") // returns "data";

var myData = {}
Q(myData).try("||hello", {})
Q(myData).try("hello.||create", {});
Q(myData).try("hello.create.||chain", {});
console.log(myData) // {hello:{create:{chain: {})
```


### Includes

Q(["a", "b"]).includes("a") // true

Q("ab").includes("a") // true

Q(["c", "b"]).includes("a") // false

### isAny
var data = [{a: true, b: false}, {a: false, b: true}];
Q(data).isAny(function(test){ 
  return test.b == true 
}) // true

Q(data).isAny(function(test){ 
  return test.firstName == "Carson"
}) // false


### compact
Q([null, "", undefined, "a", "b"]).compact() // ["a", "b"]
