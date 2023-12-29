$(document).ready(function () {
  const groupformList = $('#groupformList');

  // Function to fetch and display groupforms
  function fetchGroupForms() {
    $.ajax({
      url: 'mongodb://localhost:27017/groupform',
      method: 'GET',
      crossDomain: true,
      xhrFields: {
        withCredentials: true,
      },
      dataType: 'json',
      success: function (data) {
        groupformList.empty(); // Clear previous list

        $.each(data, function (index, groupform) {
          const listItem = $('<li>').text(`id: ${groupform.id}, name: ${groupform.name}, marks: ${groupform.marks}`);

          // Add update and delete buttons
          const updateButton = $('<button>').text('Update').on('click', function () {
            updateGroupForm(groupform._id);
          });

          const deleteButton = $('<button>').text('Delete').on('click', function () {
            deleteGroupForm(groupform._id);
          });

          listItem.append(updateButton, deleteButton);
          groupformList.append(listItem);
        });
      },
      error: function (error) {
        console.error('Error fetching groupforms:', error);
      }
    });
  }

  // Initial fetch on page load
  fetchGroupForms();

  // Function to add a new groupform
  const addGroupForm = function () {
    const id = $('#id').val();
    const name = $('#name').val();
    const marks = $('#marks').val();

    $.ajax({
      url: 'mongodb://localhost:27017/groupform',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ id, name, marks }),
      dataType: 'json',
      success: function (data) {
        console.log('New groupform added:', data);
        // Fetch and display groupforms again after adding a new groupform
        fetchGroupForms();
      },
      error: function (error) {
        console.error('Error adding groupform:', error);
      }
    });
  }

  // Function to update a groupform
  window.updateGroupForm = function (groupformId) {
    // Assuming you want to show a prompt for the user to enter new data
    const newId = prompt('Enter new id:');
    const newName = prompt('Enter new name:');
    const newMarks = prompt('Enter new marks:');

    // Make a PUT request to update the groupform on the server
    $.ajax({
      url: `mongodb://localhost:27017/groupform/${groupformId}`,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ id: newId, name: newName, marks: newMarks }),
      dataType: 'json',
      success: function (data) {
        console.log(`GroupForm with ID ${groupformId} updated:`, data);
        // Fetch and display groupforms again after updating a groupform
        fetchGroupForms();
      },
      error: function (error) {
        console.error(`Error updating groupform with ID ${groupformId}:`, error);
      }
    });
  }

  // Function to delete a groupform
  window.deleteGroupForm = function (groupformId) {
    // Assuming you want to show a confirmation dialog
    const confirmed = confirm('Are you sure you want to delete this groupform?');

    if (confirmed) {
      // Make a DELETE request to remove the groupform from the server
      $.ajax({
        url: `http://localhost:4000/api/groupform/${groupformId}`,
        method: 'DELETE',
        success: function (data) {
          console.log(`GroupForm with ID ${groupformId} deleted:`, data);
          // Fetch and display groupforms again after deleting a groupform
          fetchGroupForms();
        },
        error: function (error) {
          console.error(`Error deleting groupform with ID ${groupformId}:`, error);
        }
      });
    }
  }
});
