const express = require('express');
const helmet = require('helmet');

const db = require('./database/dbConfig');

const server = express();

server.use(helmet());
server.use(express.json());

// ********** ENDPOINTS **********
server.get('/api/projects/project/:projectId', async (req, res) => {
  try { 
    // const project = await Roles.findById(req.params.projectId);
    if(req.params.projectId) {
      const [id] = req.params.projectId;
      const project = await function() {
        return db('projects', 'actions')
          .join('actions', 'projects.id', '=', 'actions.project_id')
          .where({ id })
          .first();
      }
      res.status(200).json(project);
    } else {
      res.status(404).json({
        error: "does not exist"
      });
    }
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