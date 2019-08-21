const express = require('express'),
url = require('url');
const path = require('path');
const fs = require('fs');
const app = express();
const isMac = process.platform === "darwin";
let folderPath = '/Users/jojitoon/downloads';

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    const query = url.parse(req.url, true).query;
    const pathtogo = query.path || folderPath;
    const exist = fs.existsSync(pathtogo);
    if(exist){
    const list = fs.readdirSync(pathtogo).map(fileName => {
        return {
            name: path.parse(fileName).name,
            path: path.join(pathtogo, fileName),
            isFolder: fileName[0] === '.' ? null : fs.lstatSync(path.join(pathtogo, fileName)).isDirectory()
        }
    });
    res.send(list);
    } else {
        res.send({
            message: 'no such directory'
        })
    }
});

app.get('/api/setPath', (req,res) => {
    const query = url.parse(req.url, true).query;
    if (typeof query.path !== 'undefined') {
    const pathtogo = query.path;
    const exist = fs.existsSync(pathtogo);
    if(exist) {
        folderPath = pathtogo;
         res.status(200).send({
            message: 'path is set'
        });
    } else {
        res.status(400).send({
            message: 'no such directory exist'
        });
    }
    } else {
        res.status(400).send({
            message: 'need a path in the query parameter'
        });
    }
});

app.get('/api/getFile', (req,res) => {
    const query = url.parse(req.url, true).query;
     console.log(query);
     
    if (typeof query.path === 'undefined') {
        //specify Content will be an attachment
        res.setHeader('Content-disposition', 'attachment; filename=theDocument.txt');
        res.setHeader('Content-type', 'text/plain');
        res.end("Hello, here is a file for you!");
    } else {
        //read the image using fs and send the image content back in the response
        fs.readFile(query.path, function (err, content) {
            if (err) {
                res.writeHead(400, {'Content-type':'text/html'})
                console.log(err);
                res.end("No such file");    
            } else {
                //specify Content will be an attachment
                res.setHeader('Content-disposition', 'attachment; filename='+query.path);
                res.end(content);
            }
        });
    }
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 80;
app.listen(port);

console.log('App is listening on port ' + port);