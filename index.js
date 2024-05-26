const express = require('express');
const app = express();
const port = 3333;

app.use(express.static('pub'));

app.listen(port, () => {
	console.log(`Example app listning on port:${port}`);
});
