var noteID = 1;
//Obtengo el elemento del DOM donde voy a agregar los nuevos elementos con las nuevas notas
var notesNode = document.getElementById("notes");
//Obtengo los botones del formulario. EL termino node se utiliza para saber que es un objeto dentro del DOM
var addButton = document.getElementsByClassName("add-button")[0]; //getelements me devuelve un array de elementos, por eso utilizo el 0
var saveButton = document.getElementsByClassName("save-button")[0];
saveButton.style.display = "none";
//Variable que maneja el color seleccionado, color por defecto: 'red'
var selectedColor = 'red';
//Obtengo el Textarea
var textElement = document.getElementById("text");

function addNote(){
    //Obtengo el valor del textarea
    var text = textElement.value;
    
    if(text.length){
        //Si el campo texto contiene caracteres...
        //Creo el div contenedor de la nota con el id de la nota para poder localizarlo luego, y el color
        var noteNode = document.createElement("div");
        noteNode.classList.add("note", noteID, selectedColor); //agrega las clases entre ()

        //Creo el boton para borrar la nota con sus clases correspondientes y el id de la nota como valor
        var deleteButton = document.createElement("button");
        deleteButton.classList.add('delete', 'btn', 'btn-danger', 'btn-sm');
        deleteButton.value = noteID; //el boton sabe a que nota representa
        deleteButton.innerHTML = "Borrar"; //innerhtml es poner el texto al elemento
        //Agrego el Event Listener del boton borrar
        deleteButton.addEventListener("click", function(){
            child = document.getElementsByClassName(this.value)[0];
            notesNode.removeChild(child);
        });
        //Agrego el boton borrar
        noteNode.appendChild(deleteButton);

        //Creo el boton de editar la nota con sus clases correspondientes y el id de la nota como valor
        var updateButton = document.createElement("button");
        updateButton.classList.add('update', 'btn', 'btn-warning', 'btn-sm');
        updateButton.value = noteID;
        updateButton.innerHTML = "Editar";
        //Agrego el Event Listener del boton editar
        updateButton.addEventListener("click", function(){
            //Oculto/Muestro botones de crear/editar
            addButton.style.display = "none";
            saveButton.style.display = "inline";
            saveButton.value = this.value;
            element = document.getElementsByClassName("p-" + this.value)[0];
            textElement.value = element.innerText;
        });
        //Agrego el boton editar
        noteNode.appendChild(updateButton);

        // Creo elemento p con la nota y lo agrego al nuevo DIV para luego agregarlo al DOM
        var span = document.createElement("span");
        span.classList.add("p-" + noteID, 'note-text');
        span.innerText = text;
        noteNode.appendChild(span);

        //Agrego el nuevo elemento al DOM con la nueva nota y los botones de borrar y editar
        notesNode.appendChild(noteNode);
        //Reseteo el textarea
        textElement.value = '';
        //aincremento el id para proxima nota
        noteID ++;
    }else{
        //Si el campo está vacío... 
        alert("El campo Texto no puede estar vacío");
    }

}

function updateNote(){
    //Oculto/Muestro botones de crear/editar
    addButton.style.display = "inline";
    saveButton.style.display = "none";
    //Obtengo el valor del textarea
    elementTextUpdate = document.getElementById("text");
    //lo actualizo en el elemento correspondiente
    var pUpdate = document.getElementsByClassName("p-" + saveButton.value)[0];
    pUpdate.innerText = elementTextUpdate.value;
    parentElement = pUpdate.parentElement;
    //Quito cualquier otra referencia anterior a algun color en el elemento padre
    parentElement.classList.remove('red', 'orange', 'yellow', 'green', 'blue');
    parentElement.classList.add(selectedColor);
    //Reseteo el textarea
    elementTextUpdate.value = '';
}

function selectColor(newColor, color){
    //Quito la seleccion al color anterior
    elementColor = document.getElementById(selectedColor).classList.remove('selected');
    //selecciono el nuevo color
    selectedColor = color;
    newColor.classList.add('selected');
}
