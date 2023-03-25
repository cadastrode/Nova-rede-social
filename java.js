var recebe=document.getElementById("rec")
var atual=document.getElementById("atualizar")
var enviar=document.getElementById("enviar")

var db = new Dexie("novaRede");
db.version(2).stores({
  usuarios: "++id, nome, foto",
  posts: "++id, usuario,titulo, texto, foto, video"
});

class Postagens {
  constructor(id,usuario, titulo, texto, foto, video) {
   
    this.texto = texto
    this.titulo = titulo
    this.foto = foto
    this.video = video
    this.usuario="Edson Santos"
    
  }
  
  adicionar() {
    return db.posts.add(this)
  }
 static getAll() {
    return db.posts.toArray()
  }
   update() {
   db.posts.put(this)
  }
  delete(pk){
    return db.posts.delete(pk)
  }
}
function adiciona(){
  enviar.addEventListener("click", (ev)=>{
    ev.preventDefault()
    recebe.innerHTML=""
    var novo = new Postagens(this.usuario,this.id,document.getElementById("titulo").value,document.getElementById("texto").value,document.getElementById("foto").value,document.getElementById("video").value)
    get()
    novo.adicionar()
    document.getElementById("titulo").value=""
    document.getElementById("texto").value=""
    document.getElementById("foto").value=""
    document.getElementById("video").value=""
   
  
  })
  
}
adiciona()
function get(){

  Postagens.getAll().then(novo=>{
     novo.map((el)=>{
      
      var caixa=document.createElement("div")
      caixa.setAttribute("class","conten")
      caixa.setAttribute("data-idCliente", el.id)
      recebe.appendChild(caixa)

      var usu=document.createElement("h2")
      usu.textContent=el.usuario
      caixa.appendChild(usu)

      var tit=document.createElement("h4")
      tit.textContent=el.titulo
      caixa.appendChild(tit)

      var tex=document.createElement("p")
      tex.textContent=el.texto
      caixa.appendChild(tex)

      var intera=document.createElement("div")
      intera.setAttribute("class","inte")
      caixa.appendChild(intera)

      var lik=document.createElement("div")
      lik.setAttribute("class","like")
      intera.appendChild(lik)

      var lk=document.createElement("img")
      lk.src="img/hand-thumbs-up.svg"
      lik.appendChild(lk)

      var dlk=document.createElement("img")
      dlk.src="img/hand-thumbs-down.svg"
      lik.appendChild(dlk)

      var comp=document.createElement("img")
      comp.src="img/share.svg"
      lik.appendChild(comp)

      var con=document.createElement("div")
      con.setAttribute("class","con")
      intera.appendChild(con)

      var atu=document.createElement("img")
      atu.src="img/arrow-repeat.svg"
      con.appendChild(atu)

      var del=document.createElement("img")
      del.src="img/trash3.svg"
      con.appendChild(del)
      
     lk.addEventListener("click", ()=>{
      if(lk.src="img/hand-thumbs-up.svg"){
        lk.src="img/hand-thumbs-up-fill.svg"
      }
     })
     dlk.addEventListener("click", ()=>{
      if(dlk.src="img/hand-thumbs-down.svg"){
        dlk.src="img/hand-thumbs-down-fill.svg"
      }
     })
    
     comp.addEventListener("click", ()=>{

     })
     atu.addEventListener("click", (ev)=>{
      enviar.style.display="none"
      atual.style.display="block"
      document.getElementById("titulo").value=el.titulo
      document.getElementById("texto").value=el.texto
      
      let reso=ev.target
       let conc= reso.parentElement.parentElement.parentElement
       let idClient=conc.dataset.idCliente
        console.log(conc)
     
      atual.addEventListener("click",(ev)=>{
       
       db.posts.put(novo)
        
           
      
        }) 
     })
     
     del.addEventListener("click", ()=>{

     })
     
  
     })
  })

}
get()