
function submit() {
    var currentindex = 0;
    var user = document.getElementById("username").value;
    var pass = document.getElementById("password").value;
    sessionStorage.setItem("username", user);
    sessionStorage.setItem("password", pass);
    var d = new Date();
    d.setMonth(d.getMonth() + 3);
    document.cookie = "userName=" + user + "; expires=" + d;
    document.cookie = "password=" + pass + "; expires=" + d;
    if (document.getElementById("check").checked) {
        localStorage.setItem("username", user);
        localStorage.setItem("password", pass);
        console.log(user)
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            jsonObj = xhr.responseText;
            jsObj = JSON.parse(jsonObj);
            let obj = jsObj.find(function (o) {
                return o.username == user || o.email == user && o.password == pass
            });

            if (obj == null) {
                alert('wrong user name or password');

            } else {
                alert("welcome  " + user)
                window.open("index.html", "_self");

            }

        }
    }



    xhr.open("GET", "usrnames.json");
    xhr.send("");


}

function show() {
    document.getElementById("loginbar").style.display = "block";
}

function hide() {
    document.getElementById("loginbar").style.display = "none";

}

function control() {
    if (sessionStorage.username != null && sessionStorage.username != null) {
        document.getElementById("loginbutton").style.display = "none";
        document.getElementById("logoutbutton").style.display = "block";
        console.log("SDdsfsdf")
    }
}
control()

function logout() {
    document.getElementById("loginbutton").style.display = "block";
    document.getElementById("logoutbutton").style.display = "none";
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    location.reload();
}




/*display protein*/

function showsupp(c) {
    debugger;
    var arr = [];
    var product = c.innerHTML;




    console.log(arr)
    var xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            jsonObj = xhr.responseText;
            jsObj = JSON.parse(jsonObj);

            let obj = jsObj.filter(productname);
            function productname(o) {
                return o.category == product;
            }
            console.log(jsObj[2].id)

           window.open("products.html", "_self");
            console.log(obj);
            localStorage.setItem("cat",JSON.stringify(obj) );
        }
        
        
    }
   
    xhr.open("GET", "products.json");
    xhr.send("");

}
 function menufunction(){
     var x = document.getElementById('mynav');
     if(x.className=="dropdownmenu"){
         x.className+=" responsive";
     }
     else{
         x.className="dropdownmenu";
     }
 }






/*view products*/
function viewSupps() {
    var word=  document.getElementById("search");
    var reg = /[a-zA-z]{4,}/;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "products.json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var jsobj = JSON.parse(xhr.response);
                for (let i = 0; i < 10; i++) {
                    Display(jsobj,i);
                }
               word.addEventListener('keypress',function(event){
                   if(event.keyCode == 13){
                    if( reg.test(word.value)==true){
                        localStorage.setItem("searchWord",word.value.toUpperCase());
                         window.open("searched.html");  
                    }
                    else{
                        alert("word is small");
                      }
                   }
               });
                ///////////////////////////////
              /*  word.addEventListener('blur',function(){
                 if( reg.test(word.value)==true){
                     localStorage.setItem("searchWord",word.value.toUpperCase());
                      window.open("searched.html");  
                 }
                 else{
                   alert("can't search");
                 }
                 
                   });*/
            }
        }
    }
    xhr.send();
   
 
}
var boxs = document.getElementById('boxs');
function Display(jsobj,i) {

    localStorage.setItem("cat",JSON.stringify(jsobj) );
        var box = document.createElement('div');
        box.className = "box";
        var img = document.createElement('img');
        img.className = "imgproduct";
        img.src = jsobj[i].image;

        box.appendChild(img);
        var rate = document.createElement('div');
        rate.className = "rate";

        for (let j = 0; j < jsobj[i].rating.rate; j++) {
            var imgrate = document.createElement('img');
            imgrate.src = "./media/star.png";
            rate.appendChild(imgrate);
        }
        box.appendChild(rate);
        var info = document.createElement('div');
        var title = document.createElement('h4');
        title.innerHTML = jsobj[i].title;
        info.appendChild(title);
        var info2 = document.createElement('div');
        info2.className="info";
        info2.classList.add("row");
        var price = document.createElement('span');
        price.className="col-6";
        price.innerHTML = jsobj[i].price + "LE";
        info2.appendChild(price);
        var Tocard = document.createElement('a');
        Tocard.className="col-6";
        Tocard.addEventListener('click',function(){
                addtolocalstorag(i);
        });
        title.addEventListener('click', function(){
            addlocal(i);
            window.open("details.html","_self");
        })
        img.addEventListener('click', function(){
            addlocal(i);
            window.open("details.html","_self");
        })
        var icon = document.createElement('i');
        icon.className = "fas fa-shopping-cart icon";
        
        Tocard.appendChild(icon);
        info2.appendChild(Tocard);
        info.appendChild(info2)
        box.appendChild(info);
        boxs.appendChild(box);
        function addlocal(index){
            localStorage.setItem("productID", index )
        }

}
function  addtolocalstorag(index){
    var user = localStorage.getItem("username");
    if(localStorage.getItem(user)){
      var x=  JSON.parse( localStorage.getItem(user));
      x.push(index)
    
      localStorage.setItem(user,JSON.stringify(x));
    }
    else{
      var data=[];
      data.push(index);
      localStorage.setItem(user,JSON.stringify(data));
    }
    
}


// function search on products
function search(){
    if(localStorage.getItem('searchWord')){
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "products.json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var jsobj = JSON.parse(xhr.response);
                    for(let i=0 ;i<jsobj.length ;i++){
                        var desc= jsobj[i].title.toUpperCase(); 
                        if(desc.indexOf(localStorage.getItem('searchWord'))>=0) {
                              Display(jsobj,i);
                        } 
                    }
                    localStorage.setItem("cat",JSON.stringify(jsobj) );
                }}}
                xhr.send();
    }
}
//when close search page -> remove it from local storage
function close(){
    localStorage.removeItem("searchWord");
  }
