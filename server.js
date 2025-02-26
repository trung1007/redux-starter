import express from 'express';

const app = express();
const PORT = 3000;

// Middleware để parse JSON
app.use(express.json());

// Dữ liệu người dùng mẫu
let users = [
  { id: 1, name: 'Nguyen Van A', age: 25, email: 'a@example.com' },
  { id: 2, name: 'Tran Thi B', age: 30, email: 'b@example.com' },
  { id: 3, name: 'Le Van C', age: 22, email: 'c@example.com' },
  { id: 4, name: 'Cao Van D', age: 24, email: 'd@example.com' }
];

// GET /users - Lấy danh sách người dùng
app.get('/users', (req, res) => res.json(users));

// GET /users/:id - Lấy thông tin của một người dùng
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
  }

  res.json(user);
});

// POST /users - Thêm người dùng mới
app.post('/users', (req, res) => {
  const { name, age, email } = req.body;

  if (!name || !age || !email) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ tên, tuổi và email.' });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    age,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id - Cập nhật thông tin người dùng
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, age, email } = req.body;

  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
  }

  users[userIndex] = { ...users[userIndex], name, age, email };
  res.json(users[userIndex]);
});

// DELETE /users/:id - Xoá người dùng
app.delete('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
  }

  const deletedUser = users.splice(userIndex, 1);
  res.json({ message: 'Người dùng đã được xoá.', user: deletedUser[0] });
});

// Khởi chạy server
app.listen(PORT, () => console.log(`Server đang chạy tại http://localhost:${PORT}`));
