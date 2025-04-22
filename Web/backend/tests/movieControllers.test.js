// Unit tests for movieControllers using Jest
const { updateMovie, deleteMovie } = require('../controllers/movieControllers');
const Movie = require('../models/Movie');

// Mock the Movie model to avoid actual DB calls
jest.mock('../models/Movie');

describe('Movie Controllers', () => {
  describe('updateMovie', () => {
    it('updates a movie when user has sufficient permissions', async () => {
      const fakeMovie = {
        _id: '123',
        title: 'Old Title',
        director: 'Old Director',
        genre: 'Drama',
        releaseYear: 2000,
        save: jest.fn().mockResolvedValue(true)
      };

      Movie.findById.mockResolvedValue(fakeMovie);

      const req = {
        params: { id: '123' },
        body: { title: 'New Title', director: 'New Director' },
        user: { role: 'admin' }
      };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
        send: jest.fn()
      };

      await updateMovie(req, res);

      expect(Movie.findById).toHaveBeenCalledWith('123');
      expect(fakeMovie.title).toBe('New Title');
      expect(fakeMovie.director).toBe('New Director');
      expect(fakeMovie.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Movie updated successfully', movie: fakeMovie })
      );
    });

    it('returns 404 if movie not found', async () => {
      Movie.findById.mockResolvedValue(null);

      const req = { params: { id: 'nonexistent' }, body: {}, user: { role: 'admin' } };
      const res = { status: jest.fn(() => res), send: jest.fn() };

      await updateMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Movie not found');
    });

    it('returns 403 when user lacks permissions', async () => {
      const fakeMovie = { _id: '123', save: jest.fn() };
      Movie.findById.mockResolvedValue(fakeMovie);

      const req = { params: { id: '123' }, body: {}, user: { role: 'user' } };
      const res = { status: jest.fn(() => res), json: jest.fn() };

      await updateMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Insufficient permissions' });
    });
  });

  describe('deleteMovie', () => {
    it('deletes a movie when found and user authorized', async () => {
      const fakeMovie = { _id: '123', title: 'To delete' };
      Movie.findByIdAndDelete.mockResolvedValue(fakeMovie);

      const req = { params: { id: '123' }, user: { role: 'admin' } };
      const res = { status: jest.fn(() => res), json: jest.fn(), send: jest.fn() };

      await deleteMovie(req, res);

      expect(Movie.findByIdAndDelete).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Movie deleted successfully' });
    });

    it('returns 404 if movie to delete is not found', async () => {
      Movie.findByIdAndDelete.mockResolvedValue(null);

      const req = { params: { id: 'nonexistent' }, user: { role: 'admin' } };
      const res = { status: jest.fn(() => res), send: jest.fn() };

      await deleteMovie(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('Movie not found');
    });
  });
});
