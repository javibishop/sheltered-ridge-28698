/*
Puerto
*/

process.env.PORT = process.env.PORT || 3000;

/*VARIABLE que establece heroku */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB ;
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = 'mongodb+srv://cursonode:SybsBeXM4DkIYmS6@cluster0-cltbj.mongodb.net/cafe?retryWrites=true&w=majority';
}




process.env.URLDB = urlDB;
