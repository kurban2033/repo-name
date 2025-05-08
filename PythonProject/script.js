document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');

    // Проверка, выбран ли файл
    if (fileInput.files.length === 0) {
        alert('Пожалуйста, выберите файл для загрузки.');
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Ошибка сети или сервера');
        }

        const result = await response.json();
        if (result.url) {
            const linksDiv = document.getElementById('links');
            linksDiv.innerHTML += `<a href="${result.url}" target="_blank">${result.url}</a><br>`;
        } else {
            alert('Ошибка загрузки файла');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при загрузке файла. Попробуйте еще раз.');
    }
});
document.getElementById('gallery').addEventListener('click', function() {
    const popup = document.getElementById('popup');
    popup.classList.toggle('show'); //
