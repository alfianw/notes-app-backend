require('dotenv').config();
const Hapi = require('@hapi/hapi');
const notesPlugin = require('./api/notes');
const NotesService = require('./services/posthres/NotesService');
const NotesValidator = require('./validator/notes');

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  try {
    await server.register({
      plugin: notesPlugin,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
  } catch (err) {
    console.error('Gagal memulai server:', err.message);
    process.exit(1);
  }
};

init();
