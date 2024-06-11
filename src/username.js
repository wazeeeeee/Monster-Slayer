const button = document.getElementById('userName');


button.addEventListener('click', () => {
    let textInput = prompt('Enter a username here', '');
    if (textInput === null || textInput === '') {
        return null;
    } else {
        document.getElementById('user').textContent = textInput.toUpperCase();
        document.getElementById('pencil').style.opacity = '0';
    }
});
