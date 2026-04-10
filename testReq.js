const http = require('http');
http.get('http://localhost:3000/campgrounds/69af751785c9aea9fabb2324', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log("RESPONSE RECEIVED. Length:", data.length);
        console.log("LAST 500 CHARACTERS:");
        console.log(data.slice(-500));
        process.exit(0);
    });
}).on('error', err => {
    console.error("HTTP ERROR:", err);
    process.exit(1);
});
