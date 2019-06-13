
//declaração de variáveis;
let nxtPage ;
let buttomNext = document.querySelector(".buttom-next");
let buttomSend = document.querySelector(".buttom-send");


//Consulta a API e att da pagina
const listProducts  = (APIendpoint) => {

	fetch(APIendpoint)
    .then(response => response.json())
	.then(response => {
        attPage(response)
        nxtPage = "https://" + response.nextPage;
        console.log(nxtPage);
        
    });
}

listProducts("https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1");

console.log(nxtPage);

//renderização da pagina
const attPage = (dataProducts) => {

    let product = dataProducts.products;

    var list = document.getElementById("list");
    for (let i=0;i<8;i++){
        console.log(product);
        var lip = document.createElement('li');
        lip.setAttribute('class', 'product')
        var value = product[i].installments.value.toString();
        var valueF = formatValue(value);
        console.log(valueF);
    
        lip.innerHTML =
        `
                            <div class="box"><img src="http:${product[i].image}" alt="eu" class="image"></div>
                            <div class="name-product"> ${product[i].name}</div>
                            <div class="desc-product">${product[i].description}</div>
                            <div class="price-product"> <p> De: R$${product[i].oldPrice},00</p>
                                <p style="font-size: 16px; font-weight: bold">Por: R$${product[i].price},00</p>
                                <p>ou ${product[i].installments.count}x de R$${valueF}</p>
                            </div>
                            <input type="button" value="Comprar" class="button">
        
        `
        list.appendChild(lip);
    }
}

//formatação de valor vindo do JSON
const formatValue = (value) => {
    if (value.indexOf('.')==-1){value = value + "." }
    var valueF1 = value.replace(".",",")
    if(valueF1.indexOf(',')==1 & valueF1.length>2) { valueF1 = valueF1 + "0"}
    if(valueF1.indexOf(',')==1 & valueF1.length<=2) { valueF1 = valueF1 + "00"}
    if(valueF1.indexOf(',')==2 & valueF1.length>3) { valueF1 = valueF1 + "0"}
    if (valueF1.indexOf(',')==2 & valueF1.length<=3){valueF1 = valueF1 + "00"}
    return valueF1
}

//limpar show case
const cleanShowCase= () => { 
    var item = list.getElementsByClassName('product');
    for(let i=0;i<8;i++){ 
    list.removeChild(item[0]);}   
}

// Eventos
buttomNext.addEventListener("click", () => {
    cleanShowCase();
    listProducts(nxtPage);
    });

buttomSend.addEventListener("click", () => {
    formCheck();
});

//Validar formulario
const formCheck = () => {

    if(document.dados.namedig.value=="" || document.dados.namedig.value.length < 3)
    {
    alert( "Preencha campo NOME corretamente!" );
    document.dados.namedig.focus();
    return false;
    }
      
      
    if( document.dados.emaildig.value=="" || document.dados.emaildig.value.indexOf('@')==-1 || document.dados.emaildig.value.indexOf('.')==-1 )
    {
    alert( "Preencha campo E-MAIL corretamente!" );
    document.dados.emaildig.focus();
    return false;
    }
    else{alert("Dados enviados com suscesso, Seu amigo ficará muito feliz com a lista personalizada.")    }
}