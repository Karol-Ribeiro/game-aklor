var botao = document.querySelector('.botao');
var ultima_tentativa = document.querySelector("#tentativa_num");
var quantidade_tentativas = document.querySelector("#numero_tentativas");
var tentativas_restantes = document.querySelector("#tentativas_restantes");
var dica = document.querySelector("#dica");
var info_meio = document.querySelector("#info-meio");
var quadrante_01 = document.querySelector(".form1");

var div_dica = document.querySelector("#div_dica");

var size_plus = document.querySelectorAll(".size-plus");

var limite_tentativas = 10;
var contador = 0;
var pontuacao = 100;

var numero_gerado = Math.floor( Math.random() * 100);
var db = true;

tentativas_restantes.innerHTML = limite_tentativas;

document.addEventListener("keydown", function(event) {

    if (event.key === 'Enter') {
        rodar_verificacao()
    }
  });

function translate_div (txt) {
    setTimeout(function () {
        div_dica.style.transform = txt;
    }, 30);
}

function atualizarCorDeFundo() {
    var porcentagemUtilizada = contador / limite_tentativas;

    var intensidadeVermelha = 255 * porcentagemUtilizada;
  var corFundo = `rgba(${intensidadeVermelha}, 0, 0, 0.781)`;
    tentativas_restantes.style.color = corFundo;
  }
  
  

function fim_jogo (true_false) {
    var tela = document.querySelector(".pop_up");
    var setores = document.querySelector(".setores");
   
    
    if (true_false == true) {
        var quantidade_tentativas_end = document.querySelector("#numero_tentativas_end");
        quantidade_tentativas_end.innerHTML = contador;

        var pontuacao_tela = document.querySelector("#numero_secreto");
        pontuacao_tela.innerHTML = pontuacao;
    }
    else {
        var pontuacao_tela = document.querySelector("#numero_secreto2");
        pontuacao_tela.innerHTML = pontuacao;

        var pop_up_win = document.querySelector(".up_ganhou");
        pop_up_win.style.display = "none";

        var pop_up_lost = document.querySelector(".up_perdeu");
        pop_up_lost.style.display = "flex";
    }
    
    tela.style.display = "flex";
    setTimeout(function () {
        setores.style.filter = 'blur(10px)';    
        tela.style.opacity = 1;
    }, 15);

}

console.log(numero_gerado);
function rodar_verificacao () {

    if (db == false) {
        return;
    }

    // verificar se tem algum numero
    

     // verificar vidas restantes

     

    var numero_digitado = document.querySelector('.text_area').value;

    // VERIFICAR SE DIGITOU ALGO
    if (numero_digitado == "") {
        alert("ESCREVA ALGUM NÚMERO");
        return;
     }

    // verificar se é maior que 100

    if (numero_digitado > 100 || numero_digitado < 1) {
        alert("DIGITE UM NUMERO ENTRE 1 E 100");
        return;
     }

    
    if (numero_digitado == parseInt(ultima_tentativa.textContent)) {
        alert("Tente um número diferente");
        return;
    }

    contador ++;
    
    
    atualizarCorDeFundo();

    ultima_tentativa.innerHTML = numero_digitado;
    quantidade_tentativas.innerHTML = contador;
    tentativas_restantes.innerHTML--;
    
    if (numero_digitado > numero_gerado){
       dica.innerHTML = "TENTE UM MENOR"
       translate_div("translateY(100px) scale(.7)");

    }
    else if (numero_digitado < numero_gerado) {
        dica.innerHTML = "TENTE UM MAIOR";
        translate_div("translateY(-100px) scale(1.3)");
    }
    else {
        dica.innerHTML = "SEM MAIS DICAS"
        fim_jogo(true);
        return;
    }

    pontuacao -= 10;
    var color = quadrante_01.style.backgroundColor;
    quadrante_01.style.backgroundColor = "rgba(0, 127, 177, 0.781)"; // Altera a cor para branco
    size_plus.forEach(function(element) {
        element.style.transform = 'scale(1.3)';
      });

    db = false;

    setTimeout(  function () {
        quadrante_01.style.backgroundColor = color; // Altera a cor para branco
        div_dica.style.transform = 'scale(1)';
        
        size_plus.forEach(function(element) {
            element.style.transform = 'scale(1)';
          });

        setTimeout( function () {
            db = true; 
            if (contador == limite_tentativas) {
                fim_jogo(false);
            }
        }, 300)
    }, 300)

    
}

    
botao.addEventListener('click', rodar_verificacao);