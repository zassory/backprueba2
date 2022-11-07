const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demo')
    .then(()=> console.log('Conectado a MongoDB...'))
    .catch(err => console.log('No se pudo conectar con MongoDB',err));

const cursoSchema = new mongoose.Schema({
    nombre:String,
    autor:String,
    etiquetas:[String],
    fecha:{type: Date, default:Date.now},
    publicado: Boolean
});

const Curso = mongoose.model('Curso', cursoSchema);

const crearCurso = async() => {
    const curso = new Curso({ //Curso es un objeto del modelo
        nombre:'Next Js desde Cero',
        autor:'Luis',
        etiquetas:['Desarrollo Web','Back End'],
        publicado: true
    });

    const resultado = await curso.save();
    console.log(resultado);
}

//crearCurso();

const listarCursos = async() => {
    // eq (equal, igual)
    // ne (not equal, no igual)
    // gt (greater then , mayor que)
    // gte (greater than or equal to, mayor o igual que)
    // lt (less than, menor que)
    // lte (less than or equal to, mejor o igual que)
    // in 
    // nin (not in)
    // or
    // and
    const numeroPage = 2;
    const sizePage = 10;

    const cursos = await Curso        
        //.find({publicado: true})
        //.find({precio: {$gte:10, $lte:30}})
        //.find({precio:{$in: [10,15,25]}})
        //.and([{autor:'Grover'},{publicado:false}])
        //Empiece con la palabra Gro
        //.find({autor: /^Gro/})
        //Cuando termina en una palabra o expresion
        //.find({autor: /ver$/ })
        //Cuando un campo tiene un contenido especifico        
        .find( { autor: /.*ro.*/ } )
        .skip((numeroPage - 1) * sizePage)
        .limit(sizePage)
        .sort({autor:-1})
        .select({autor:1,nombre:1,etiquetas:1});
        console.log(cursos);
    
}

//listarCursos();

const actualizarCurso = async(id) => {
    // const curso = await Curso.findById(id);
    // if(!curso){
    //     console.log('El curso no existe');
    //     return;
    // }
    // curso.publicado = false;
    // curso.autor = 'Grover Vásquez';

    // curso.set({
    //     publicado:false,
    //     autor:'Grover Vázquez'
    // })
    // const resultado = await curso.save();
    // console.log(resultado);
    //const resultado = await Curso.updateOne({ _id: id },{
    const resultado = await Curso.findByIdAndUpdate(id,{
        $set: {
            autor:'Nicolás Cáceres Latorre',
            publicado: true
        }
    },{ new:true });
    console.log(resultado);
}

//actualizarCurso('63696811a5984bfc9058707b');

const eliminarDocumento = async(id) => {
    const result = await Curso.deleteOne({_id:id });
    //const result2 = await Curso.findByIdAndDelete(id);
    console.log(result);
}

eliminarDocumento('63696811a5984bfc9058707b');

