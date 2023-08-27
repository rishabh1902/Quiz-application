const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');

const userName = "rishab";
const userPassword = "rishab@singh";


form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    }
    if(passwordValue === '') {
        setError(password, 'Password is required');
    }
    console.log(username, password);
    if(userName === usernameValue && userPassword === passwordValue)
    {
        console.log("success");
        window.location.href = "./quiz.html";
        userName = "";
        userPassword = "";
        usernameValue = "";
        passwordValue = "";
    }
    else
        alert("Wrong Username or Password");
};
