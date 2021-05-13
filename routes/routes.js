const express = require('express');

const router = express.Router();

router.get('/', [], async (req, res) => {
	try {
		// const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		// const todos = await response.json();
		res.json({ okay:'haha' });
	} catch(e) {
		console.error(e.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
