//<editor-fold defaultstate="collapsed" desc="VariaveisGlobais">
var Noticias = new Array();
var noticiasSalvas = new Array();
//var Propagandas;
const BancoDeDados = window.localStorage;
if (!BancoDeDados.getItem('noticiasSalvas')) BancoDeDados.setItem("noticiasSalvas", '[{"id":0}]');
if (!BancoDeDados.getItem('imagems')) BancoDeDados.setItem("imagems", '[]');

const jornalBuscador = "https://jornaloaperitivo.com.br/search?q=";
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Core">
///// Alimentador
function consulta(){
    $.ajax({
        url: "https://www.jornaloaperitivo.com.br/feeds/posts/default",
        type: "GET",
        data: "",
        dataType: "xml",
        cache:false,
        success: function (Feed, textStatus, jqXHR) {
            console.log(Feed);
            //entradas = Feed.getElementsByTagName("entry");
            for (var c = 0; c < entradas.length; c++) {
                   console.log(entradas[c].getElementsByTagName("link"));
                   var aux = "";
                   if(entradas[c].getElementsByTagName('content').length > 0){
                       aux = entradas[c].getElementsByTagName('content')[0].innerHTML.split("&lt")[0]
                   }
                Noticias.push({
                    titulo: entradas[c].getElementsByTagName('title')[0].innerHTML,
                    texto: aux,
                    link: entradas[c].getElementsByTagName("link")[2].innerHTML,
                    id: entradas[c].getElementsByTagName("id")[0].innerHTML,

                });
            }
            //Propagandas = JSON.parse(Feed.getElementsByTagName("subtitle")[0].innerHTML);

            BancoDeDados.setItem("Noticias", JSON.stringify(Noticias));
            BancoDeDados.setItem("Propagandas", Feed.getElementsByTagName("subtitle")[0].innerHTML);

            preencherTabela(0,4);
            Feed = null;

        }

    }).fail(function (jqXHR, textStatus) {

        if (!BancoDeDados.getItem("Noticias")) {
            $("#noticias").html(
              $("#noticias").html()+
                '<div class="card"><div class="card-wrapper"><div class="row align-items-center"><div class="col-12 col-md-3"><div class="image-wrapper">'+
                '<img src="img/logo.png" alt="PROPAGANDA" title="">'+
                '</div></div><div class="col-12 col-md"><div class="card-box"><div class="row"><div class="col-12"><div class="top-line"><h4 class="card-title mbr-fonts-style display-5"><strong>'+
                  'Não foi posivel carregar o feed'+
                '</strong></h4><p class="cost mbr-fonts-style display-5"></p></div></div><div class="col-12"><div class="bottom-line"><p class="mbr-text mbr-fonts-style m-0 display-7">'+
                          "Verifique sua conexão e tente novamente"+
                '</p></div></div></div></div></div></div></div>'


            );
        } else {
            Noticias = JSON.parse(BancoDeDados.getItem("Noticias"));
            Propagandas = JSON.parse(BancoDeDados.getItem("Propagandas"));
            preencherTabela(0,4);


        }

    });
        window.setInterval(criarPropaganda, 6000);
}

function preencherTabela(min,max){
    var string = "";

    for (var c = min; c < max; c++) {
      //corrigir LINK
      if (Noticias[c].link === undefined)noticias[c].link = 'https://jornaloaperitivo.com.br/';
      /// corrigir TITULO
      if (Noticias[c].titulo === undefined)noticias[c].titulo = 'Jornal O Aperitivo';

            string += '<div class="card-box"><div class="row">';
        // TITULO
            string += '<div class="col-12" style="left:15px"><div class="top-line"><h4 class="card-title mbr-fonts-style display-6"><strong>'+
              "<a style='color:black'  onclick='cordova.InAppBrowser.open(`" + Noticias[c].link + "`,`_system`)'>"  +
                    Noticias[c].titulo         +//TITULO
              "</a></strong></h4><p class='cost mbr-fonts-style display-8' style='width:50px'>"+
              "<a onclick=compartilhar('"+
                  Noticias[c].link+
              "')><img src='img/btnShare.png' style='width:30px' ></a>" +//BOTAO SHARE
              "</p></div></div>";


        string += '<div class="card" style="background-color:#f2e5b6" ><div class="card-wrapper"><div class="row align-items-center">';
          // IMAGEM
              string +='<div class="col-12" style="left:50px"><div class="image-wrapper">'+
                  "<a href='" + Noticias[c].link + "' target='_blank' id='imagem"+c+"'>"  +
              "<img src='img/LOGO.png' alt='jornal O Aperitivo'  style='width:70%' ></a></div></div>";
          ///
          //TEXTO
            string += '<div class="col-12" style="left:15px,text-align:justify"><div class="bottom-line"><p class="mbr-text mbr-fonts-style m-0 display-7">' +
            "<a style='color:black' onclick='cordova.InAppBrowser.open(`" + Noticias[c].link + "`,`_system`)'>"  +
              Noticias[c].texto +
              '</a></div></div>';

         //Terceira Linha, PROPAGANDA
        var pos = c;
        while (pos > Propagandas.length-1) pos -= Propagandas.length;
        console.log("Propaganda"+pos)

        string += '<div class="card" style="background-color:#f2e5b6"><div class="card-wrapper"><div class="row align-items-center"><div class="col-12" style="left:7.5%"><div class="image-wrapper">'+
          '<br><img src="'+ Propagandas[pos].thumb + '" alt="PROPAGANDA" style="width:85%">'+
          '</div></div><div class="col-12"><div class="top-line"><h4 class="card-title mbr-fonts-style display-5"></h4></div></div></div></div></div>';

          $("#noticias").html($("#noticias").html()+string);
          string = "";
          buscarImagem(c);
    }

    criarPropaganda();
}

function criarPropaganda() {
    if(Propagandas !== undefined ){
        var aleatorio = parseInt(Math.random()*Propagandas.length);
        $("#Propaganda").css('background-image', 'url(' + Propagandas[aleatorio].thumb + ')');
        $("#Propaganda").attr('onclick', "cordova.InAppBrowser.open(`"+Propagandas[aleatorio].url+",`_system`)");
    }
}

function verificaSalvo(indice) {
    if(BancoDeDados.getItem(noticiasSalvas)===null)return true;
    var noticias = JSON.parse(BancoDeDados.getItem(noticiasSalvas));
        for (var i = 0; i < noticias.length; i++) {
            if(noticias[i].id === indice){
                return false;
            }
        }
        return true;
}


//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="BOTOES">
//<editor-fold defaultstate="collapsed" desc="CARREGAR MAIS NOTICIAS">
function carregaMais(min){

    preencherTabela(min,(Number(min)+5));


    $('#carragarNoticias').attr('onclick','carregaMais('+(Number(min)+5)+')');
}


//<editor-fold defaultstate="collapsed" desc="SHARE">
function compartilhar(link){
    navigator.share({
        'url': link
    }).then(function() {
        console.log('Deu certo ^^');
    });
}
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="Montar Lista de Noticias SALVAS">
$("#mostrarSalvas").click(function () {
    if ($("#mostrarSalvas").html() === "Noticias Salvas") {
        geraNoticiasSalvas();

    }else if($("#mostrarSalvas").html()  === "Voltar as Noticias"){
        consulta();
        $("#mostrarSalvas").html("Noticias Salvas");
    }

    $("#menuLateral").animate({left: '-100px'}, "fast" , function (){
        $("#menuLateral").css('display',"none");
    });
});

function geraNoticiasSalvas() {
    var string = "";
    var listaNoticias = JSON.parse(BancoDeDados.getItem("noticiasSalvas"));
    if (listaNoticias.length > 1) {
        for (var c = 1; c < listaNoticias.length; c++) {
            string += "<tr id='linha"+c+"' class='imagemprop'><td>"; //linha
            string += "<a href='"+listaNoticias[c].link+"'>"; //link
            string += listaNoticias[c].titulo; //titulo
            string += "</a></td><td><a onclick=compartilhar('"; //btnShare
            string += listaNoticias[c].link + "') id =salva" + c + "'>"; //btnShare                                     //link
            string += "<img src='img/btnShare.png' " + //imagem
                "height=30 width=30></a>"; //imagem
            string += "<a onclick='removerSalva("+c+")'>"+
                "<img src='img/btnSalvo.png' height=30 width=30 id='remover"+c+"'></a>"; //remover
            string += "</td></tr>"; //finalizar
        }
        $("#noticias").html(string);
        $("#mostrarSalvas").html("Voltar as Noticias");
    }
    else {
        alert("Você ainda não salvou nenhuma noticia");
        preencherTabela();
    }
}
//</editor-fold>

//<editor-fold defaultstate="collapsed" desc="Funcoes de Busca">
$("#btnBusca").click(function () {/// mostra barra de busca
    if ($("#buscar").css('display') === "none") {
        $("#buscar").css('display', "block");
        $("#buscar").animate({left: '0px'}, "fast");
        $("#navlogo").css('display', "none");
    }else{
      $("#buscar").animate({ left: '0px' }, "fast");
      var busca = $("#buscar input").val().trim();
      $("#buscar input").val("");
      if (busca !== "")
          var ok = cordova.InAppBrowser.open(jornalBuscador + busca.replace(/ /g, "+"),"_system");
            console.log(ok);
          $("#buscar").css('display', "none");
    $("#navlogo").css('display', "block");
    }
});



$(document).keypress(function (e) {///FUNCAO PARA PESQUISAR COM O ENTER REPETIDA
    if (e.which === 13) {
        var busca = $("#buscar input").val().trim();
        $("#buscar input").val("");
        if (busca !== "")
            cordova.InAppBrowser.open(jornalBuscador + busca.replace(/ /g, "+"),"_system");

        $("#buscar").animate({left: '-100px'}, "fast", function () {
            $("#buscar").css('display', "none");
        });
    }
});
//</editor-fold>

//</editor-fold>



function buscarImagem(c){
          $.ajax({
                  url: Noticias[c].link,
                  cache: false,
                  success: function (f, textStatus, jqXHR) {
                    imgs = $(f).find('article img');
                    $("#imagem"+c+" img").attr("src",imgs[0].src);

                    var img = JSON.parse(BancoDeDados.getItem('imagems'));
                    img[c] = imgs[0].src;
                    BancoDeDados.setItem('imagems',JSON.stringify(img));
                  }
              }).fail(function(){

                  $("#imagem"+c+" img").attr("src",JSON.parse(BancoDeDados.getItem('imagems'))[c]);

              });
}


$(document).ready(consulta);


function receberNotificacaoPush(){
    var push = PushNotification.init({
        android
    });

    push.on('notification',function(data){

         cordova.plugins.notification.local.schedule({
                title: data.title,
                message: data.message,
                foreground: true
         });

    });
}
