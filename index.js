const express = require('express');
const helmet = require('helmet');

const db = require('./database/dbConfig');

const server = express();

server.use(helmet());
server.use(express.json());

// ********** ENDPOINTS **********
server.get('/api/projects', async (req, res) => {
  try {
    // const all = await Roles.find();
    res.status(200).json(all);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get('/api/projects/project/:projectId', async (req, res) => {
  try { 
    // const project = await Roles.findById(req.params.projectId);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post('/api/projects', async (req, res) => {
  try {
    const [id] = await db('projects').insert(req.body);
    const newProject = await db('projects')
      .where({id: id})
      .first();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.post('/api/projects/actions', async (req, res) => {
  try {
    const [id] = await db('actions').insert(req.body);
    const newAction = await db('actions')
      .where({id: id})
      .first();
    res.status(201).json(newAction);
  } catch (error) {
    res.status(500).json(error);
  }
});

const port = process.env.PORT || 4444;
server.listen(port, () => 
  console.log(`\n** API running on http://localhost:${port} **\n`)
);