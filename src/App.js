import './App.css';
import imagemClima from './imagem1.svg';
import imagemCep from './imagem2.svg';
import imagemClima3 from './imagem3.svg';

//Função menu superior
function Header(){
   return(
    <div className="Header">
      <div>
       <h1 className="logo">DncWeather</h1>
      </div>
      <div className="menuHeader">
       <li className="lista"> <a href="">Endereços</a> </li>
       <li className="lista"> <a href="">Previsão do tempo</a></li>
      </div>
    </div>
   )
}

//Função menu section
function Section(){
  return(
    <div className="section">
      <h1 className="sectionTitulo">Descubra Mais com Precisão:<br></br> 
          Previsões do Tempo e endereços <br></br>
          em tempo real.
        </h1>
        <img className="imagem1" src={imagemClima}/>          
    </div>
  )
}

//Função obter CEP_CLIMA.
async function GetCep(){
  const cep = document.getElementById("cep").value;
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const latitude = document.getElementById("latitude").value;
  const longitude = document.getElementById("longitude").value;

    if( nome === "" || email === "" || latitude === "" || longitude === ""){
      alert("Preencha todos os campos corretamente!!!")
    }else{
       try{
        const responseCep = await fetch (`https://viacep.com.br/ws/${cep}/json/`);
        const dataCep = await responseCep.json();
           
        const responseClima = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`);
        const dataClima = await responseClima.json();

        meu_callback(dataCep);

       
        document.getElementById('temperatura').value = (("Previsão de acordo com a coordenada é de ") + (dataClima.current.temperature_2m) + ("°C"));
        window.location.href='#ancora';

       } catch (erro){
        alert("Latitude ou longitude incorreto!!!");
       } 
      } 
}

//Função que verifica se CEP existe
function meu_callback(dataCep) {
  if (!("erro" in dataCep)) {
        document.getElementById('rua').value = dataCep.logradouro;
        document.getElementById('bairro').value = dataCep.bairro;
        document.getElementById('localidade').value = dataCep.localidade;
  } 
  else {
      limpa_formulário_cep();
      return alert("CEP não encontrado.");
  }
}

//Função para limpar formulário
function limpa_formulário_cep() {
  document.getElementById('rua').value=("");
  document.getElementById('bairro').value=("");
  document.getElementById('localidade').value=("");

}


//Função formulário section
function Formulario(){
  return (
    <div className="containner">
      <label className="label">Primeiro Nome:</label><br></br>
      <input id="nome" className="input" placeholder="Insira seu primeiro nome"></input>

      <label className="label">E-mail:</label><br></br>
      <input type="email" id="email" className="input" placeholder="Insira seu e-mail"></input>

      <label className="label">CEP:</label><br></br>
      <input type="number" id="cep" className="input" placeholder="Insira o CEP"></input>
      
      <label className="label">Digite a latitude e longitude para saber a previsão:</label><br></br>
      <input type="number" id="latitude" className="input1" placeholder="Latitude"></input>
      <input type="number" id="longitude" className="input2" placeholder="Longitude"></input>

      <button type="button" className="button" onClick={GetCep}>Acessar</button>
    </div>
  )
}

//Função resultado cep
function TituloResultadoCep(){
  return (
    <div id="ancora" className="tituloResultadoCep">
        <h1 className="tituloCep">Resultado da busca por CEP:</h1>
        <img className="imagem2" src={imagemCep}/>
    </div>
  )
}

//Função Menu resultado CEP
function ResultadoCep(){
  return(
    <div className="menuResultadoCep">
       <div className="resuldadoCepSup">
            <li>Logradouro/Nome</li>
            <li>Bairro/Distrito</li>
            <li>Localidade/UF</li>
        </div>
        <div className="resuldadoCepInf">
            <input className="inputResultCepInf" type="text" readonly id="rua"></input>
            <input className="inputResultCepInf" type="text" readonly id="bairro"></input>
            <input className="inputResultCepInf" type="text" readonly id="localidade"></input>
        </div>
    </div>
  )
}

//Função título resultado clima
function TituloResultadoClima(){
  return (
    <div className="tituloResultadoClima">
        <h1 className="tituloCep">Previsão do tempo na região:</h1>
        <img className="imagem3" src={imagemClima3}/>
    </div>
  )
}

//Função resultado clima
function ResultadoClima(){
  return(
    <div className="resultadoClima">
            <input className="inputResultClima" type="text" readonly id="temperatura"></input>
    </div>
  )
}

//Função rodapé footer
function Footer(){
  return(
    <div className="footer">
       <div></div>
       <div className="menuFooter">
            <li className="itemFooter"> <a href="">Termos de uso</a> </li>
            <li className="itemFooter"> <a href="">Política e Privacidade</a></li> 
       </div>  
    </div>
  )
}

//Função princupal onde chama a página
function App() {
  return (
    <div className="App">
    <Header></Header>
    <Section></Section>
    <Formulario></Formulario>
    <TituloResultadoCep></TituloResultadoCep>
    <ResultadoCep></ResultadoCep>
    <TituloResultadoClima></TituloResultadoClima>
    <ResultadoClima></ResultadoClima>
    <Footer></Footer>
   
    </div>
  );
}

export default App;
