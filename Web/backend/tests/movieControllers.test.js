// tests/movieControllers.test.js
const { updateMovie, deleteMovie } = require('../controllers/movieControllers');
const Movie = require('../models/Movie');

// Мокаем модель Movie, чтобы вместо обращения к базе использовались поддельные данные
jest.mock('../models/Movie');

describe('Movie Controllers', () => {
  describe('updateMovie', () => {
    it('should update the movie if it exists and user has sufficient permissions', async () => {
      // Создаем фейковый объект фильма с методом save
      const fakeMovie = {
        _id: '123',
        title: 'Old Title',
        director: 'Old Director',
        genre: 'Drama',
        releaseYear: 2000,
        save: jest.fn().mockResolvedValue(true)
      };

      // Мокаем метод findById, возвращая наш фейковый фильм
      Movie.findById.mockResolvedValue(fakeMovie);

      // Задаем fake запрос и ответ
      const req = {
        params: { id: '123' },
        body: { title: 'New Title', director: 'New Director' },
        user: { role: 'admin' }  // Проверка прав: "admin" имеет доступ
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        send: jest.fn()
      };

      // Вызываем функцию обновления
      await updateMovie(req, res);

      // Проверяем, что findById был вызван с нужным id
      expect(Movie.findById).toHaveBeenCalledWith('123');
      // Проверяем, что данные фильма обновились
      expect(fakeMovie.title).toBe('New Title');
      expect(fakeMovie.director).toBe('New Director');
      // Проверяем, что сохранение вызвано
      expect(fakeMovie.save).toHaveBeenCalled();

      // Проверяем, что функция вернула нужный статус и сообщение
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Movie updated successfully', movie: fakeMovie }));
    });

    it('should return 404 if movie is not found', async () => {
      // Мокаем метод findById для возврата null
      Movie.findById.mockResolvedValue(null);

      const req = {
        params: { id: 'nonexistent' },
        body: { title: 'Test' },
        user: { role: 'admin' }
      };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn()
      };

      await updateMovie(req, res);

      // Ожидаем возврат ошибки 404
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Movie not found');
    });

    it('should return 403 if user does not have sufficient permissions', async () => {
      // Фейковый фильм (существует)
      const fakeMovie = {
        _id: '123',
        title: 'Old Title',
        save: jest.fn()
      };
      Movie.findById.mockResolvedValue(fakeMovie);

      const req = {
        params: { id: '123' },
        body: { title: 'New Title' },
        user: { role: 'user' }  // Пользователь с ролью "user" не имеет доступа
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn()
      };

      await updateMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Insufficient permissions' });
    });
  });

  describe('deleteMovie', () => {
    it('should delete the movie if found and user has sufficient permissions', async () => {
      // Мокаем метод findByIdAndDelete, возвращая фейковый фильм
      const fakeMovie = { _id: '123', title: 'To delete' };
      Movie.findByIdAndDelete.mockResolvedValue(fakeMovie);

      const req = {
        params: { id: '123' },
        user: { role: 'admin' }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        send: jest.fn()
      };

      await deleteMovie(req, res);

      expect(Movie.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Movie deleted successfully' });
    });

    it('should return 404 if movie to delete is not found', async () => {
      Movie.findByIdAndDelete.mockResolvedValue(null);

      const req = {
        params: { id: 'nonexistent' },
        user: { role: 'admin' }
      };
      const res = {
        status: jest.fn(() => res),
        send: jest.fn()
      };

      await deleteMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Movie not found');
    });
  });
});
