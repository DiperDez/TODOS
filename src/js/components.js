import { todoList } from "../index";
import { Todo } from "../classes";

// Referencias 
const divTodoList   = document.querySelector('.todo-list'),
      txtInput      = document.querySelector('.new-todo'),
      btnBorrar     = document.querySelector('.clear-completed'),
      ulFiltros     = document.querySelector('.filters'),
      anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHTML = (todo) => {

    const htmlTodo = `
        <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    const div = document.createElement('div');
    
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

// Eventos
txtInput.addEventListener('keyup', (e) => {

    if(e.keyCode === 13 && txtInput.value.length > 0){

        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        
        crearTodoHTML(nuevoTodo);
        txtInput.value = '';
        
    }

});

divTodoList.addEventListener('click', (e) => {
    const nombreElemento = e.target.localName,
          todoElemento   = e.target.parentElement.parentElement,
          todoId         = todoElemento.getAttribute('data-id');

    
    if(nombreElemento.includes('input')){ //Click en el check

        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');

    }else if(nombreElemento.includes('button')){

        todoList.eliminarTodo(todoId);
        divTodoList.removeChild(todoElemento);

    }
    
});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();
    
    for(let i = divTodoList.children.length - 1; i >= 0; i--){

        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }

    }

});

ulFiltros.addEventListener('click', (e) => {

    const filtro = e.target.text;
    if(!filtro){ return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    
    
    for(const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        e.target.classList.add('selected');

        
        switch(filtro){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }

    }

});
