//    OPERADOR TERNARIO - PARA DESAFIO COMPLEMENTARIO (OPTIMIZANDO EL PROYECTO FINAL)


const usuario = prompt("Ingrese su edad para verificar autorizacion de compra");

usuario >= 18 ? alert("Usted se encuentra autorizado para realizar compras") : alert("Usted no esta autorizado para comprar en este sitio");




const clickButton = document.querySelectorAll(".button");
const tBody = document.querySelector(".tBody");
let carrito = []

//    OPERADOR (AND) - PARA DESAFIO COMPLEMENTARIO (OPTIMIZANDO EL PROYECTO FINAL)


carrito.length === 0 && alert("Su carrito de compras se encuentra vacio en este momento");


clickButton.forEach(btn => {
    btn.addEventListener("click", addToCarritoItem)
})

function addToCarritoItem(e){

    const button = e.target
    const item = button.closest(".card")
    const itemTitle = item.querySelector(".card-title").textContent;
    const itemPrice = item.querySelector(".precio").textContent;
    const itemImg = item.querySelector(".card-img-top").src;
    
    const newItem = {
        title: itemTitle,
        precio: itemPrice,
        img: itemImg,
        cantidad: 1
    }

    addItemCarrito(newItem)

}



    //  FUNCION QUE NOS VA AGREGAR UN PRODUCTO ELEGIDO, MEDIANTE UN FOR PARA INCREMENTAR/-


function addItemCarrito(newItem) {

    const alert = document.querySelector(".alert")


    // FUNCION QUE NOS VA MOSTRAR MEDIANTE ALERT POR UNOS SEGUNDOS, CUANDO HAGAMOS CLICK EN ELIMINAR PRODUCTO, AVISANDONOS LO DICHO.

    setTimeout( function(){
        alert.classList.add("hide")
    }, 2000)
    alert.classList.remove("hide") 

    const inputElemento = tBody.getElementsByClassName("input__elemento")
    
    for(let i =0; i < carrito.length ; i++){
        if (carrito[i].title.trim() === newItem.title.trim()){

            // OPERADOR ++, OPERADOR AVANZADO PARA INCREMENTAR PRODUCTOS AL CARRITO.

            carrito[i].cantidad ++;
            const inputValue = inputElemento[i]
            inputValue.value++
            carritoTotal()
            return null;
    }
    }

    carrito.push(newItem)
    renderCarrito()
    
}


function renderCarrito() {

    tBody.innerHTML = ""
    carrito.map(item => {
        const tr = document.createElement("tr")
        tr.classList.add("ItemCarrito")
        const Content = `

        <th scope="row">1</th>
            <td class="table__productos">
              <img src=${item.img} alt="">
              <h6 class="title">${item.title}</h6>  
            </td>
            <td class="table__precio"><p>${item.precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${item.cantidad} class="input__elemento">
              <button class="delete btn btn-danger">X</button>
            </td>

        `
            tr.innerHTML = Content;
            tBody.append(tr)

            tr.querySelector(".delete").addEventListener("click", removeItemCarrito)
            tr.querySelector(".input__elemento").addEventListener("change", sumaCantidad)
    })
    carritoTotal()
}

function carritoTotal() {
    let Total = 0;
    const itemCartTotal = document.querySelector(".itemCartTotal")
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$", ""))
        Total = Total + precio*item.cantidad
    })

    itemCartTotal.innerHTML = `Total $${Total}`
    addLocalStorage();
}



    //  FUNCION QUE NOS VA ELIMINAR UN PRODUCTO ELEGIDO, MEDIANTE UN FOR PARA INCREMENTAR/-

function removeItemCarrito(e){

    const buttonDelete = e.target
    const tr = buttonDelete.closest(".ItemCarrito")
    const title = tr.querySelector(".title").textContent;
    
    for(let i=0; i<carrito.length ; i++){
        if(carrito[i].title.trim() === title.trim()){
            carrito.splice(i, 1);
        }
    }


    const alert = document.querySelector(".remove")

    // FUNCION QUE NOS VA MOSTRAR MEDIANTE ALERT POR UNOS SEGUNDOS, CUANDO HAGAMOS CLICK EN ELIMINAR PRODUCTO, AVISANDONOS LO DICHO.

    setTimeout( function(){
        alert.classList.add("remove")
    }, 2000)
    alert.classList.remove("remove")


    tr.remove()
    carritoTotal()
}


    // FUNCION NOS PERMITIRA SUMAR CANTIDAD DE PRODUCTOS AGREGADOS AL carrito, MEDIANTE forEach RECORRIENDO Array. 

function sumaCantidad(e) {

    const sumaInput = e.target
    const tr = sumaInput.closest(".ItemCarrito")
    const title = tr.querySelector(".title").textContent;
    carrito.forEach(item => {
        if(item.title.trim() === title){

                    //    OPERADOR TERNARIO - PARA DESAFIO COMPLEMENTARIO (OPTIMIZANDO EL PROYECTO FINAL)

            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
            item.cantidad = sumaInput.value;
            carritoTotal()
        }
    })
}

    // FUNCION QUE NOS PERMITIRA GUARDAR ESOS PRODUCTOS ELEJIDOS Y LA CANTIDAD, PARA QUE NO SE NOS PIERDA LA INFORMACION CUANDO REFRESCAMOS LA PAGINA.

function addLocalStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

window.onload = function() {

    const storage = JSON.parse(localStorage.getItem("carrito"));

    if(storage){
        carrito = storage; 
        renderCarrito()
    }
}