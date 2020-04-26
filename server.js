const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const validateToken = require('./middleware/validateToken');
const jsonParser = bodyParser.json();
const uuid = require ('uuid');
const TOKEN = '2abbf7c3-245b-404f-9473-ade729ed4653';
const app = express();

app.use(morgan('dev'));
app.use(validateToken);

// Base URL : http://localhost:8080/
// GET endpoint : http://localhost:8080/bookmarks
// GET by title endpoint : http://localhost:8080/bookmark?title=value
// POST a new bookmark : http://localhost:8080/bookmarks
// DELETE a bookmark : http://localhost:8080/bookmark/assfd3245
// PATCH a bookmark : http://localhost:8080/bookmark/assfd3245

let listOfBookmarks = [
    {
        id: "assfd3245",
        title: "Web Course", 
        description: "Web development class", 
        url: "https://sites.google.com/site/wadfeb3",
        rating: 90
    },
    {
        id: uuid.v4(),
        title: "Google", 
        description: "For searching stuff", 
        url: "https://www.google.com/",
        rating: 80
    },
    {
        id: uuid.v4(),
        title: "GitHub", 
        description: "Work on projects", 
        url: "https://github.com/",
        rating: 70
    }
];

app.get( '/bookmarks', ( req, res ) => {
    console.log( "Getting all the bookmarks" );
   // console.log( req.test );
   //  console.log( req.headers );
    return res.status( 200 ).json(listOfBookmarks );
});

app.get( '/bookmark', ( req, res ) => {
    console.log( "Getting bookmark by title" );

    let title = req.query.title;
   
    if( !title ){
        res.statusMessage = "Please send the 'title' as a parameter.";
        return res.status( 406 ).end();
    }

    let result =listOfBookmarks.find( (bookmark) => {
        if( bookmark.title == title){
            return bookmark;
        }
    });

    if( !result){
        res.statusMessage = `The bookmark with title=${title} was not founnd in the bookmark list.`
        return res.status(404).end();
    }

    return res.status( 200 ).json( result );
});

app.post('/bookmarks', jsonParser, (req, res)=>{
    console.log("Adding a new student.");
    console.log("Body: ", req.body);

    let title = req.body.title;
    let description = req.body.description;
    let url = req.body.url;
    let rating = req.body.rating;
    let id = uuid.v4();

    if( !title || !description || !url || !rating){
        res.statusMessage = "Some parameters are missing";
        return res.status(406).end();
    }

    if(typeof(rating) !== 'number'){
        res.statusMessage = "The rating must be a number";
        return res.status(409).end();
    }

    let newBookmark = {
        id: id,
        title: title,
        description: description,
        url: url,
        rating: rating
    }

    listOfBookmarks.push(newBookmark);
    return res.status(201).json(newBookmark);
});

app.delete('/bookmark/:id', (req,res) =>{
    console.log( "Deleting bookmark by given id parameter" );

    let id = req.params.id;

    let bookmarkToRemove = listOfBookmarks.findIndex((bookmark)=>{
        if(bookmark.id == id){
            return true;
        }
    });

    if(bookmarkToRemove < 0){
        res.statusMessage = "The bookmark with this id was not found in the list";
        return res.status(404).end();
    } else {
        listOfBookmarks.splice(bookmarkToRemove,1);
        return res.status(200).end();
    }
});

app.patch('/bookmark/:id', jsonParser, (req,res) => {
    console.log("Updating bookmark");
    let idBody = req.body.id;
    
    if(!idBody){
        res.statusMessage = "You need to send the id of the bookmark";
        return res.status(406).end();
    }
    let idPath = req.params.id;
    
    if( idBody != idPath){
        res.statusMessage = "You need to send the correct id of the bookmark, ids dont match";
        return res.status(409).end();
    }

    let bookmarkToUpdate = listOfBookmarks.findIndex((bookmark)=>{
        if(bookmark.id == idPath){
            return true;
        }
    });

    if(bookmarkToUpdate < 0){
        res.statusMessage = "The bookmark with this id was not found in the list";
        return res.status(404).end();
    }

    if(req.body.title){
        listOfBookmarks[bookmarkToUpdate].title = req.body.title;
      }
    
      if(req.body.description){
        listOfBookmarks[bookmarkToUpdate].description = req.body.description;
      }
    
      if(req.body.url){
        listOfBookmarks[bookmarkToUpdate].url = req.body.url;
      }
    
      if(req.body.rating){
        listOfBookmarks[bookmarkToUpdate].rating = req.body.rating;
      }
    
    return res.status(202).json(listOfBookmarks[bookmarkToUpdate]);

});

app.listen( 8080, () => {
    console.log( "This server is running on port 8080" );
});