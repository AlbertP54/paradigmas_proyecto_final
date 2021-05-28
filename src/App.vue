<template>
  <div>

    <h1 id="Titulo">Biblioteca</h1>
    <form @submit.prevent="estatusEditar ? updateTodo() : addTodo()"> 
      <p>
        Titulo:<input type="text" v-model="titulo">
        Autor:<input type="text" v-model="autor">
        <button type="submit">{{ estatusEditar ? "Editar" : "Agregar Libro" }}</button>
        <button v-if="estatusEditar" @click="estatusEditar= false, titulo='', autor='' ">Cancelar</button>
        
      </p>

    </form>

      <img src="https://pa1.narvii.com/6707/510b0daee67fbc091f14b9d8ef40aeb6c0d4dc7d_hg.gif" v-if="cargando">
      <ul>
          <li v-for="todo in todos" :key="todo.id">
            Titulo: {{todo.titulo}} - Autor: {{todo.autor}} - 
              <button @click="selectTodo(todo)">Editar Libro</button>
              <button @click="deleteTodo(todo)">Eliminar Libro</button>
          </li>
        </ul>

  </div>
</template>

<script>

import {db} from './firebase'

export default {
  name: 'App',
  data() {
    return {
      todos: [],
      id: "",
      titulo: "",
      autor: "",
      cargando: false,
      estatusEditar: false
    }
  },
  created() {
    this.listarTodos();
  },
  methods: {
    async listarTodos(){
      
      this.cargando = true;
      const data = await db.collection("todos").get();
      this.todos = data.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))
      
      this.cargando = false;
      console.log(this.todos);

    },
    async addTodo(){

      await db.collection('todos').add(
        {
          titulo: this.titulo,
          autor: this.autor
        }
      )
      this.titulo = "";
      this.autor = "";
      this.listarTodos();
    },
    async deleteTodo(todo){

      if(confirm(`Estas seguro que deseas eliminar ${todo.titulo}`)){
        await db.collection('todos').doc(todo.id).delete();
        this.listarTodos();
      }

    },
    selectTodo(todo){
      this.estatusEditar = true;
      this.id = todo.id;
      this.titulo = todo.titulo;
      this.autor = todo.autor;
    },
    async updateTodo(){
      await db.collection('todos').doc(this.id).set(
        {
          titulo: this.titulo,
          autor: this.autor
        }
      )

      this.estatusEditar = false;
      this.id = "";
      this.titulo = "";
      this.autor = "";
      this.listarTodos();
    }
  },
}
</script>

<style>
#app {
  margin-top: 60px;
}
#Titulo {
  font-size: xx-large;
  font: bolder;
  text-align: center;
}
</style>