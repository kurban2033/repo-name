const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Настройка multer для хранения файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // добавляем временную метку к имени файла
    }
});

const upload = multer({ storage: storage });

// Статические файлы
app.use(express.static('frontend'));
app.use('/uploads', express.static('uploads'));

// Эндпоинт для загрузки файлов
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.json({ url: fileUrl });
    } else {
        res.status(400).json({ error: 'Ошибка загрузки файла' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
app.post('/upload', upload.single('file'), (req, res) => {
    console.log('Received file:', req.file); // Выводим информацию о загруженном файле
    if (req.file) {
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        res.json({ url: fileUrl });
    } else {
        console.error('Ошибка: файл не загружен'); // Логируем ошибку
        res.status(400).json({ error: 'Ошибка загрузки файла' });
    }
});
