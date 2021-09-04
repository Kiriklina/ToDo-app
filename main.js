(function(){
  function createAppTitle(title){
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm(){
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary', 'disabled');
    button.setAttribute('disabled', 'disabled');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  function createTodoList(){
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(matter) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    if (typeof matter === 'object'){
      item.textContent = matter.name;
      if (matter.done){
        item.classList.add('list-group-item-success');
      }
    }else{
      item.textContent = matter;
    }

    buttonGroup.classList.add('btn-group','btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    }
  }

  function createTodoApp(container, title = 'Мои дела', listOfPlans = [{name: 'Сходить в туалет', done: true}]){
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    for (plan of listOfPlans){
      let PrimItem = createTodoItem(plan);

      PrimItem.doneButton.addEventListener('click', function(){
        PrimItem.item.classList.toggle('list-group-item-success');
      });
      PrimItem.deleteButton.addEventListener('click', function(){
        if(confirm('Вы уверены?')){
          PrimItem.item.remove();
        }
      });

      todoList.append(PrimItem.item);
    }

    todoItemForm.input.addEventListener('input', function(){
      todoItemForm.button.removeAttribute('disabled');
      todoItemForm.button.classList.remove('disabled');
      if (todoItemForm.input.value === ""){
        todoItemForm.button.setAttribute('disabled', 'disabled');
        todoItemForm.button.classList.add('disabled');
      }
    });

    todoItemForm.form.addEventListener('submit', function(e){
      e.preventDefault();

      if (!todoItemForm.input.value){
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);

      todoItem.doneButton.addEventListener('click', function(){
        todoItem.item.classList.toggle('list-group-item-success');
      });
      todoItem.deleteButton.addEventListener('click', function(){
        if(confirm('Вы уверены?')){
          todoItem.item.remove();
        }
      });

      todoList.append(todoItem.item);

      todoItemForm.input.value = "";

      todoItemForm.button.setAttribute('disabled', 'disabled');
      todoItemForm.button.classList.add('disabled');
    });
  }

  window.createTodoApp = createTodoApp;
})();
