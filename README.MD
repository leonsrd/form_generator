# Form generator

The form generator is built to let the user create custom forms with the option of choosing between text and selection fields.

The application was developed with the use of HTML, CSS and JavaScript.

The user has the option of choosing to save the form data on browser's memory with the use of local storage and view the saved data.

Data is being saved in local storage as an array of objects, each one being a field of the saved form.

The object's structure consists of:

- fieldNumber: The number of the field by the order it was added to the form when created
- fieldLabel: The label of each of the form's fields
- fieldValue: The saved entry value for each field
- formId: A random generated number to specify the form ID.

The logic of formId generation should be handled for production use in order to ensure uniqueness.

In future implementations it is possible to add:

- Feature of saving form templates after creation
- Setting up a backend system in order to save the data to a database.
- The code could be refactored in order to improve efficiency for a production environment.

The application could be tested live at: https://leonsrd.dev/sg_task/main.html
