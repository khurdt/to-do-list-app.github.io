$('#button').on('click', newItem);

function newItem() {

  let list = $('#list'),
    input = $('input'),
    inputValue = $('#input').val(),
    li = $('<li class="list-item"></li>'),
    emptyAlert = $('<div class="alert">Please write something</div>');

  emptyAlert.fadeOut(2000);

  li.append(inputValue);

  if (!inputValue) {
    list.append(emptyAlert);
  }else {
    list.append(li);
    input.val('');
  }
  //#1 Crossing out an item
  li.on('click', function() {
    if (li.hasClass('list-item')) {
      li.addClass('underline').removeClass('list-item');
    }else if (li.hasClass('underline')) {
      li.removeClass('underline').addClass('strike');
    }else if (li.hasClass('strike')) {
      li.removeClass('strike').addClass('list-item');
    }
  });
  //#2 adding delete button
  let deleteButton = $('<deleteButton></deleteButton>');
  deleteButton.append(document.createTextNode('X'));
  li.append(deleteButton);
  //#3 adding display: none to delete button
  deleteButton.on('click', function() {
    li.addClass('delete');
  })
  //#4 rearranging list function
  list.sortable();
}

let showInstructions = $('#showInstructions')

showInstructions.on('click', function() {

  let modalContainer = $('#modal-container');
  //initialize modal
  modalContainer.html('').addClass('is-visible');

  let modal = $('<div class="modal"></div>');
  //modal heading
  let modalTitle = $('<h2 class="modal-title">Instructions:</h2>');

  let paragraphs = $('<p>Click to underline an item.</p>' +
                      '<p>Double click to mark an item off.</p>' +
                      '<p>click X to delete an item.</p>' +
                      '<p>drag items to reorder.</p>' +
                      '<p>Enjoy.</p>');

  let closeModal = $('<button onclick="hideModal()" class="close-modal">X</button>');

  modalContainer.append(modal);
  modal.append(closeModal);
  modal.append(modalTitle);
  modal.append(paragraphs);

  modalContainer.on('click', function(event) {
    let target = event.target;
    if (target === modalContainer) {
      hideModal();
    }
  })
  //hide modal if click on X button
  closeModal.on('click', function() {
    hideModal();
  })

});

window.addEventListener('keydown', function(event) {
  let modalContainer = $('#modal-container');
  if (event.key === 'Escape' && modalContainer.hasClass('is-visible')) {
    hideModal();
  }
});

function hideModal() {
  let modalContainer = $('#modal-container');
  modalContainer.removeClass('is-visible');
}

$('#listForm').submit(function(event) {
  event.preventDefault();
})
