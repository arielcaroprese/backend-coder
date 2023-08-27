import mongoose from "mongoose";

const URI = 'mongodb+srv://arielcaroprese:Icosaedro27@cluster0.vdrhniv.mongodb.net/backend-coder?retryWrites=true&w=majority'

mongoose.connect(URI)

.then(() => console.log('Conectado a la base de datos'))
.catch(error => console.log(error))