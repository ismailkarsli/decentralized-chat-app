import GUN from 'gun';
import http from 'http';

const PORT = 41859;

const server = http.createServer().listen(PORT);
console.log('Relay peer started on port ' + PORT + ' with /gun');
export default GUN({ web: server });
