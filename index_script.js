const listOfInputs = document.getElementsByClassName("inputs-container")[0].getElementsByTagName("input");

for (let i = 0; i < 3; i++)
    listOfInputs[i].addEventListener("keydown", preventIllegalChars);

function preventIllegalChars(event)
{
    // Regular expression for numbers only.
    let regex = new RegExp("^[0-9]+$");

    // Exits code if the key pressed are the following:
    switch (event.key)
    {
        case "Backspace":
        case "ArrowRight":
        case "ArrowLeft":
        case "Tab":
            return;
    }

    // If the key pressed does is not a number, prevent from inputting.
    if (!regex.test(event.key))
        event.preventDefault();

    // All the following if statements could be merged into one, but I have broken them down for readability.

    if ((event.currentTarget.id === "day-input" || event.currentTarget.id === "month-input") && event.currentTarget.value.length == 2)
        event.preventDefault();
    
    if (event.currentTarget.id === "year-input" && event.currentTarget.value.length == 4)
        event.preventDefault();
}

const ageCalculatorBtn = document.getElementsByClassName("button-container")[0].getElementsByTagName("button")[0];
ageCalculatorBtn.addEventListener("click", checkValidity);

function checkValidity()
{
    //#region Check for emptiness

    // Variable that stores whether there are any empty fields or not.
    let isThereEmptyField = false;

    // Loops through each date input...
    for (let input of listOfInputs)
    {
        // If input value is empty or null...
        if (input.value === "" || input.value === null)
        {
            isThereEmptyField = true;

            // Show error on screen.
            input.parentElement.children[0].classList.add("red-lbl");
            input.classList.add("outline-red");
            input.parentElement.children[2].textContent = "This field is required";
        }
        else
        {
            // Otherwise just remove error in case there is any.
            input.parentElement.children[0].classList.remove("red-lbl");
            input.classList.remove("outline-red");
            input.parentElement.children[2].textContent = "";
        }   
    }

    // If any field is empty, don't run the rest of the code.
    if (isThereEmptyField)
        return;

    //#endregion

    //#region Checks for month input

    let monthInputValue = listOfInputs[1].value;

    // If first character is zero...
    if (monthInputValue[0] === "0")
    {
        // If input value is not single digit...
        if (monthInputValue.length > 1)
        {
            // Remove any error if there's any
            removeError(1);

            // Strip leading zero.
            monthInputValue = monthInputValue.split('');
            monthInputValue.splice(0, 1, '');
            monthInputValue = monthInputValue.join('');

            checkMonthRange();
        }
        else
            // If it is single digit, show error as '0', is invalid input.
            showError(1);
    }
    else
        checkMonthRange();

    function checkMonthRange()
    {
        // Converts value into actual number.
        monthInputValue = Number(monthInputValue);
        
        // Shows error if input value is greater than 12 or less than 1.
        if (monthInputValue > 0 && monthInputValue < 13)
            removeError(1);
        else
            showError(1);
    }

    //#endregion 

    //#region Checks for day input

    let dayInputValue = listOfInputs[0].value;

    // If first character is zero...
    if (dayInputValue[0] === "0")
    {
        // If input value is not single digit...
        if (dayInputValue.length > 1)
        {   
            // Remove any error if there's any
            removeError(0);

            // Strip leading zero.
            dayInputValue = dayInputValue.split('');
            dayInputValue.splice(0, 1, '');
            dayInputValue = dayInputValue.join('');

            checkDayRange();
        }
        else
            // If it is single digit, show error as '0', is invalid input.
            showError(0);
    }
    else
        checkDayRange();

    function checkDayRange()
    {
        // Converts value into actual number.
        dayInputValue = Number(dayInputValue);
        
        // Shows error if input value is greater than 31 or less than 1.
        if (!(dayInputValue > 0 && dayInputValue < 32))
            showError(0);
        else
            removeError(0);
        
        // If the chosen day is 31...
        if (dayInputValue === 31)
        {
            // And chosen month is either September or November or April or June...
            if (monthInputValue === 9 || monthInputValue === 4 || monthInputValue === 11 || monthInputValue === 6)
                // Show error.
                showError(0);
            else
                // Else remove error.
                removeError(0);
        }
    }


    //#endregion

    //#region Checks for year input

    let yearInputValue = listOfInputs[2].value;

    // If input length is not 4...
    if (yearInputValue.length != 4)
        // Show error.
        showError(2);
    else
    {
        // Else remove error,
        removeError(2);

        // If there are any leading zeros...
        if (yearInputValue[0] === "0")
            // Show error.
            showError(2);
        else
        {
            // Converts string into number.
            yearInputValue = Number(yearInputValue);
    
            // Gets current year.

            let currentDate = new Date();
            let currentYear = currentDate.getFullYear();
    
            // If input year is greater than current year...
            if (yearInputValue > currentYear)
                // Show error.
                showError(2);
        }
    }

    //#endregion

    //#region Helper functions

    function showError(index)
    {
        let helperLabels = ["day", "month", "year"];

        // Shows error by adding a red outline and red text color and helpful comment.
        listOfInputs[index].parentElement.children[0].classList.add("red-lbl");
        listOfInputs[index].classList.add("outline-red");
        listOfInputs[index].parentElement.children[2].textContent = "Must be a valid " + helperLabels[index];
    }

    function removeError(index)
    {
        // Removes error.
        listOfInputs[index].parentElement.children[0].classList.remove("red-lbl");
        listOfInputs[index].classList.remove("outline-red");
        listOfInputs[index].parentElement.children[2].textContent = "";
    }

    //#endregion
}

function calculateAge(day, month, year)
{

}