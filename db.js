const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Подключение к базе данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'feedback_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения: ' + err.stack);
    return;
  }
  console.log('Подключено к базе данных с id ' + connection.threadId);
});

// Используем middleware для обработки JSON
app.use(express.json());

// Пример маршрута для получения всех пользователей
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM people'; // SQL запрос для получения всех пользователей
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Ошибка при запросе');
      return;
    }
    res.json(results); // Отправляем данные на клиент
  });
});

// Пример маршрута для добавления пользователя
app.post('/users', (req, res) => {
  const { name, email, phone } = req.body; // Данные из тела запроса

  const sql = 'INSERT INTO people (name, email, phone) VALUES (?, ?, ?)';
  connection.query(sql, [name, email, phone], (err, results) => {
    if (err) {
      res.status(500).send('Ошибка при добавлении');
      return;
    }
    res.status(201).send('Пользователь добавлен');
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер работает на http://localhost:${port}`);
});
