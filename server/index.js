const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

app.use(cors());
const port = 2555;
app.use(express.static(__dirname + '/../client/dist'));

app.all('/api/listings/:listingID/reviews', (req, res) => {
    proxy.web(req, res, {
        target: "http://ec2-52-8-43-87.us-west-1.compute.amazonaws.com:2500"
      });
    } )

app.all('/v1*', (req, res) => {
    proxy.web(req, res, {
        target: "http://54.151.16.190"
    }, (err) => {  console.log(err); return res.status(404).send(); });
})

app.all('/listing', (req, res) => {
    proxy.web(req, res, {
        target: "http://ec2-3-133-39-202.us-east-2.compute.amazonaws.com/"
    });
})


app.all('/location/:id', (req, res) => {
    proxy.web(req, res, {
        target: "http://ec2-54-177-57-186.us-west-1.compute.amazonaws.com:3000/"
    });
} )

app.listen(2555, () => {
    console.log(`listening on port ${port}`);
})