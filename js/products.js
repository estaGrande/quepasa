let catId = localStorage.getItem("catID")
const Opa = "https://japceibal.github.io/emercado-api/cats_products/"+catId+".json";

function showProductosList(array){    
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let category = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4> ${category.name} ${category.currency} ${category.cost}</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` artículos</small> 
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend; 
    }
   
}

document.addEventListener("DOMContentLoaded", function(e){
    fetch(Opa)
    .then((response) => response.json())
    .then((datos) => {
      productosArray = datos.products;
      showProductosList(productosArray)
      document.querySelector("#taFuerte").innerHTML="Veras todos los productos de la categoría <strong>"+datos.catName+"</strong>"
    });
    document.querySelector("#rangeFilterCountP").addEventListener("click", function(){
       filtro(productosArray)
    });
    document.querySelector("#clearRangeFilterP").addEventListener("click", function(){
        limpio(productosArray)
    })
    document.querySelector("#sortDescP").addEventListener("click", function(){
        masMenos(productosArray)
    })
    document.querySelector("#sortAscP").addEventListener("click", function(){
        menosMas(productosArray)
    })
    document.querySelector("#sortByCountP").addEventListener("click", function(){
       poupu(productosArray)
    })
});

function filtro(array) {
    let min= Number(document.querySelector("#rangeFilterCountMinP").value)
    let max= Number(document.querySelector("#rangeFilterCountMaxP").value)
    let filtradito= array.filter(array=> array.cost >= min && array.cost<=max)    
    
    showProductosList(filtradito)

    document.querySelector("#rangeFilterCountMinP").value=""
    document.querySelector("#rangeFilterCountMaxP").value=""
}

function limpio(array) {    
    document.querySelector("#rangeFilterCountMinP").value=""
    document.querySelector("#rangeFilterCountMaxP").value=""
    showProductosList(array)
}

function masMenos(array){    
    let filtradito= array.filter(array=> array.cost)  
    filtradito.sort((ant,sig)=>sig.cost-ant.cost )
    showProductosList(filtradito)
}
function menosMas(array) {
    let filtradito= array.filter(array=> array.cost) 
    filtradito.sort((ant,sig)=>ant.cost-sig.cost) 
    showProductosList(filtradito)
}
function poupu(array){
    let filtradito= array.filter(array=> array.cost) 
    filtradito.sort((ant,sig)=>sig.soldCount-ant.soldCount) 
    showProductosList(filtradito)
}