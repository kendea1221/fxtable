//. app.js

const request = require('request');

const express = require( 'express' ),
      ejs = require( 'ejs' ),
      settings = require( './settings' )
      app = express();

//. ejs
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

//. Index
app.get('/', function( req , res ){
    var datetime = '';
    var rate = {};

    
    const option = {
        url: settings.fxapiurl,
        methd: 'GET'
    };

    request( option, ( err0, rea0, body0 ) => {
        if( err0 ){
            console.log( err0 );
            res.render( 'index', { datetime: datetime, rate: rate } );
        }else{
            if( typeof body0 == 'string' ){ body0 = JSON.parse( body0 ) ;}
            datetime = body0.datetime;
            rate = body0.rate;
            res.render( 'index', { datetime: datetime, rate: rate } );
        }
    })

});


//. MainDIR
app.use( express.static( __dirname + '/public' ) );

//. port
const port = process.env.PORT || 8800;
app.listen( port );

console.log( 'Server starting on ' + port + '🚀...' )