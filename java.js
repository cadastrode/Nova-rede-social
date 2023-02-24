enviar=document.getElementById("enviar")
console.log(enviar)
var db = new Dexie("novaRede");
db.version(2).stores({
  usuarios: "++id, nome, foto",
  posts: "++id, usuario,titulo, texto, foto, video"
});

class Postagens {
  constructor(id, titulo, texto, foto, video, usuario) {
    this.id = id
    this.texto = texto
    this.titulo = titulo
    this.foto = foto
    this.video = video
    this.usuario = "Edson Santos"
  }
  adicionar() {
    return db.posts.add(this)
  }
  getAll() {
    return db.posts.toArray()
  }
  update() {
    return db.posts.put(this)
  }
  delete(pk){
    return db.posts.delete(pk)
  }
}

  enviar.addEventListener("click", function (e) {
    e.preventDefault()
   var novo= new Postagens(this.id,this.usuario,document.getElementById("titulo").value,document.getElementById("texto").value,document.getElementById("foto").value,document.getElementById("video").value)

   novo.adicionar()
    console.log("deu certo")
  })
