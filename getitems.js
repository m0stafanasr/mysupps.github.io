var xhr =new XMLHttpRequest();
xhr.open("Get","products.json");
xhr.onreadystatechange = function(){
    if(xhr.readyState==4 )
        if( xhr.status==200){
        var myJS =JSON.parse( xhr.response);
      
        display(myJS);
        }
    else if(xhr.status==404){
        alert("Not found");
    }
}
xhr.send();

function display(js){
var myarr=[];

var q;
  var username= localStorage.getItem("username");
  if(localStorage.getItem(username)){
      console.log(username);
      var userproduct= JSON.parse(localStorage.getItem(username));
      var x = document.getElementById('userproducts');
      for(let i=0;i<userproduct.length;i++){
          if(myarr.filter(e => e==userproduct[i]).length<1){
                 q = userproduct.filter(e => e==userproduct[i]).length;
                 myarr.push(q);
          
          var item = document.createElement('div');
          item.className="row";
          var anchor = document.createElement('a');
          anchor.className="col-2";
          var removeicon = document.createElement('i');
          removeicon.className="fas fa-times";
          removeicon.className+=" icon";
          anchor.appendChild(removeicon);
            item.appendChild(anchor);
              var divimage = document.createElement('div');
              divimage.className="col-4";
              var image = document.createElement('img');
              image.src= js[userproduct[i]].image;
              divimage.appendChild(image);
              item.appendChild(divimage);

              var divbtn = document.createElement('div');
              divbtn.className='col-4';
              var plusbtn = document.createElement('button');
              
              var plusicon = document.createElement('i');
              plusicon.className="fas fa-plus";
              plusbtn.appendChild(plusicon);
                 divbtn.appendChild(plusbtn);
              
                
              var qnt = document.createElement('input');
              qnt.type='text';
              qnt.value=q;
              qnt.className="inp";
                divbtn.appendChild(qnt);
              var minusbtn = document.createElement('button');
              var minusicon = document.createElement('i');
              minusicon.className="fas fa-minus";
              minusbtn.appendChild(minusicon);
                 divbtn.appendChild(minusbtn);
              item.appendChild(divbtn);
           
              var price = document.createElement('div');
              price.className="inp";
              price.className+=" col-2"
              
              price.innerHTML=js[userproduct[i]].price+"LE";
               item.appendChild(price);
              x.appendChild(item);
          }
      }
      
  }

}

  
    

