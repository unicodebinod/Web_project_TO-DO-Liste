$(document).ready(function(){
    addButtonListener();
    getTodoList();
})

function addButtonListener() {
    let todoList = $('.todo-list');
    let todoListInput = $('.todo-list-input');

    $('.todo-list-add-btn').on('click', function (event) {
        //wird aufgerufen wenn auf Hinzufügen-Button gedrückt wird
        event.preventDefault();
        //hole Eingabe von Nutzer
        var item = $(this).prevAll('.todo-list-input').val();
        if (item) {
            //Lösche Inhalt Input-Feld
            todoListInput.val('');
            postTodo({name: item});
            
        }
    });

    todoList.on('change', '.checkbox', function () {
        //wird aufgerufen wenn auf Checkmark gedrückt wird

        //hole ID von gedrückten ElementItem
        let id = $(this).closest('li').attr('id');

        //überprüfe ob Element bereits als 'fertig' markiert ist
        let isDone = $(this).closest('li').hasClass('completed');

        //PUT Request um TODO Element zu aktualisieren
        updateTodo({id: id, done: !isDone})
    });

    todoList.on('click', '.remove', function () {
        //wird aufgerufen wenn auf X-Button gedrückt wird
        //hole ID von gedrückten Element
        let id = $(this).closest('li').attr('id');
        //DELETE Request um TODO Element zu löschen !!!! Löscht immer das letzte Element in der Liste !!!! API funktioniert nicht richtig ???? 
        deleteTodo({id: id});
    });
}

function getTodoList() {
    //GET Request um TODO Elemente zu laden
    $.ajax({
        url: 'http://localhost:5000/todos',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            //wird aufgerufen wenn Request erfolgreich war >> aktualisiert Liste
            updateTodoList(data);
        },
        error: function () {
            //wird aufgerufen wenn Fehler aufgetreten ist
            alert('Failed to load items');
        }
    });
}

function postTodo(todo) {
    //POST Request um TODO Element hinzuzufügen
    $.ajax({
        url: 'http://localhost:5000/todos',
        type: 'POST',
        data: JSON.stringify(todo),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            //wird aufgerufen wenn Request erfolgreich war >> aktualisiert Liste
            updateTodoList(data);
        },
        error: function () {
            //wird aufgerufen wenn Fehler aufgetreten ist
            alert('Failed to create item');
        }
    });
}

function updateTodo(todo) {
    $.ajax({
        url: 'http://localhost:5000/todos',
        type: 'PUT',
        data: JSON.stringify(todo),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            //wird aufgerufen wenn Request erfolgreich war >> aktualisiert Liste
            updateTodoList(data);
        },
        error: function () {
            //wird aufgerufen wenn Fehler aufgetreten ist
            alert('Failed to update item');
        }
    });
}

function deleteTodo(todo) {
    $.ajax({
        url: 'http://localhost:5000/todos/' + todo.id,
        type: 'DELETE',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function (data) {
            //wird aufgerufen wenn Request erfolgreich war >> aktualisiert Liste
            updateTodoList(data);
        },
        error: function () {
            //wird aufgerufen wenn Fehler aufgetreten ist
            alert('Failed to delete item');
        }
    });
}

function updateTodoList(data) {
    //aktualisiert Liste
    let todoList = $('.todo-list');
    //entfernt alle Elemente aus der Liste
    todoList.empty();

    //for each Schleife
    data.forEach(todo => {
        let item;
        if (todo.done === 'true') {
            //wenn TODO bereits 'fertig' ist, erstelle UI-Element mit class='completed und checked='true'
            item = "<li id=" + todo.id + " class='completed'><div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox' checked='true'/>" + todo.name + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline'></i></li>"
        } else {
            //wenn TODO noch nicht'fertig' ist, erstelle UI-Element OHNE class='completed und checked='true'
            item = "<li id=" + todo.id + "><div class='form-check'><label class='form-check-label'><input class='checkbox' type='checkbox'/>" + todo.name + "<i class='input-helper'></i></label></div><i class='remove mdi mdi-close-circle-outline'></i></li>"
        }
        todoList.append(item);
    });
}
