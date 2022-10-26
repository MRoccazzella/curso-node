const socket = io()
//tabla productos
const formProductos = document.getElementById('form-productos')
const productsContainer = document.getElementById('products')
//chat
const chat = document.getElementById("chatContainer")
const chatForm = document.getElementById('chat')


formProductos.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(formProductos)
    const formValues = Object.fromEntries(formData)
    formProductos.reset()
    socket.emit('new-product',formValues)
})

socket.on('productos', allProducts => {
    console.log(allProducts)
    renderizadoProductos(allProducts)
})

const renderizadoProductos = async (products) => {
    const respuesta = await fetch('/assets/templates/tabla-productos.handlebars')
    const template = await respuesta.text()
    // compile the template
    const compiledTemplate = Handlebars.compile(template);
    // execute the compiled template and print the output to the console
    const html = compiledTemplate({products})
    productsContainer.innerHTML = html
} 

chatForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const formData = new FormData(chatForm)
    const formValues = Object.fromEntries(formData)
    chatForm.reset()
    socket.emit("new message", formValues)
  })

socket.on("all message", allMessage => {
    renderizadoMensajes(allMessage)
})  
const renderizadoMensajes = async (messages) => {
    console.log(messages)
    const respuesta = await fetch('/assets/templates/chat.handlebars')
    const template = await respuesta.text()
    // compile the template
    const compiledTemplate = Handlebars.compile(template);
    // execute the compiled template and print the output to the console
    const html = compiledTemplate({messages})
    chat.innerHTML = html
  } 