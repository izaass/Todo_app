// Get the task name input field and the two tables
const taskNameInput = $("#task-name");
const todoTable = $("#todo-table");
const completedTable = $("#completed-table");

// Get the task list from local storage, or initialize it to an empty array
const taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to render a single task in the todo table
function renderTask(task) {
     // Create the task row
     const taskRow = $("<tr>");

     // Create the task name cell
     const taskNameCell = $("<td style='width:60%'>").text(task.name.toUpperCase());
     taskRow.append(taskNameCell);

     // Create the status cell
     const statusCell = $("<td style='width:10%'>").text("Chưa xong");
     taskRow.append(statusCell);

     // Create the delete action
     const actionCell = $("<td style='width:30%'>");
     //khai báo nút xóa
     const deleteButton = $("<button>").addClass("btn btn-danger").html('<i class="fas fa-trash"></i>');
     deleteButton.on("click", function () {
          const index = taskList.indexOf(task);
          taskList.splice(index, 1);
          saveTasks();
          renderTasks();
     });

     // khai báo nút sửa
     const editButton = $("<button>").addClass("btn btn-primary").html('<i class="fas fa-edit"></i>');
     editButton.on("click", function () {
          editTask(task);
     });
     //btn incomplete
     const completeButton = $("<button>").addClass("btn btn-warning").html('<i class="fas fa-check"></i>');
     completeButton.on("click", function () {
          task.completed = true;
          renderTasks();
          saveTasks();
     });
     actionCell.append(completeButton);
     //hiển thị nút sửa
     actionCell.append(editButton);
     //hiển thị nút xóa
     actionCell.append(deleteButton);
     //đóng thẻ td
     taskRow.append(actionCell);
     // Append the task row to the todo table
     todoTable.append(taskRow);

}

// Function to render all tasks in the task list
function renderTasks() {
     // Clear the tables
     todoTable.find("tbody").empty();
     completedTable.find("tbody").empty();

     // Loop through the task list and render each task in the appropriate table
     for (const task of taskList) {
          if (task.completed) {
               renderCompletedTask(task);
          } else {
               renderTask(task);
          }
     }
}

// Function to render a single completed task in the completed table
// function renderCompletedTask(task) {
//      // Create the task row
//      const taskRow = $("<tr>");

//      // Create the task name cell
//      const taskNameCell = $("<td>").text(task.name);
//      taskRow.append(taskNameCell);

//      // Create the status cell
//      const statusCell = $("<td>").text("Completed");
//      taskRow.append(statusCell);

//      // Create the action cell
//      const actionCell = $("<td>");
//      const deleteButton = $("<button>").text("Delete").addClass("btn btn-danger");
//      deleteButton.on("click", function () {
//           const index = taskList.indexOf(task);
//           taskList.splice(index, 1);
//           saveTasks();
//           renderTasks();
//      });
//      actionCell.append(deleteButton);

//      //btn incompleted
//      const row = $("<tr>");
//      const descriptionCell = $("<td>").text(task.description);
//      if (task.completed) {
//           const incompleteButton = $("<button>").text("Incomplete").addClass("btn btn-primary");
//           incompleteButton.on("click", function () {
//                task.completed = false;
//                renderTask(task);
//                saveTasks();
//           });
//           actionCell.append(incompleteButton);
//           row.append(descriptionCell, actionCell);
//           // Remove the completed task row from the completed table
//           completedTable.find("tbody tr").each(function () {
//                if ($(this).find("td:first-child").text() === task.description) {
//                     $(this).remove();
//                }
//           });
//           // Add the completed task row to the to-do table
//           todoTable.find("tbody").append(row);
//      }
//      actionCell.append(deleteButton);


//      taskRow.append(actionCell);

//      // Append the task row to the completed table
//      completedTable.append(taskRow);
// }

// Function to add a new task to the task list

function renderCompletedTask(task) {
     // Create the task row
     const taskRow = $("<tr>");

     // Create the task name cell
     const taskNameCell = $("<td style='width:60%'>").text(task.name.toUpperCase());
     taskRow.append(taskNameCell);

     // Create the status cell
     const statusCell = $("<td style='width:10%'>").text("Completed");
     taskRow.append(statusCell);

     // Create the action cell
     const actionCell = $("<td style='width:30%'>");

     //Create the edit action cell
     const editButton = $("<button>").addClass("btn btn-primary").html('<i class="fas fa-edit"></i>');
     editButton.on("click", function () {
          editTask(task);
     });
     const deleteButton = $("<button>").addClass("btn btn-danger").html('<i class="fas fa-trash"></i>');
     deleteButton.on("click", function () {
          const index = taskList.indexOf(task);
          taskList.splice(index, 1);
          saveTasks();
          renderTasks();
     });

     //btn incompleted
     if (task.completed) {
          const incompleteButton = $("<button>").addClass("btn btn-warning").html('<i class="fas fa-times"></i>');
          incompleteButton.on("click", function () {
               task.completed = false;
               renderTasks();
               saveTasks();
          });
          actionCell.append(incompleteButton);
     }
     //hiển thị các nút
     actionCell.append(editButton);
     actionCell.append(deleteButton);
     // đóng thẻ td
     taskRow.append(actionCell);

     // Append the task row to the completed table
     completedTable.find("tbody").append(taskRow);
}


//function edit task using prompt
function editTask(task) {
     const newName = prompt("Enter the new name for the task:", task.name);
     //const newDescription = prompt("Enter the new description for the task:", task.description);
     if (newName !== null) {
          //if (newName !== null && newDescription !== null) {
          task.name = newName;
          //task.description = newDescription;
          saveTasks();
          renderTasks();
     }
}

function addTask(name) {
     const task = {
          name,
          completed: false
     };
     taskList.push(task);
     saveTasks();
     renderTasks();
}

// Function to save the task list to local storage
function saveTasks() {
     localStorage.setItem("tasks", JSON.stringify(taskList));
}

// Event listener for the add task form submit event
$("#add-task-form").on("submit", function (event) {
     event.preventDefault();
     const taskName = taskNameInput.val().trim();
     if (taskName) {
          addTask(taskName);
          taskNameInput.val("");
     }
});

// Render the tasks on page load
renderTasks();