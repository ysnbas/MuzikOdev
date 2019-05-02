const express = require('express');
//const ejs = require('ejs');
const bp = require('body-parser');



const app = express()
const port = 3000
const login = require("./loginOps")

app.set('view engine', 'ejs')
app.use(bp.urlencoded({ extended: false }));
app.get('/login', login.userLogin);

app.get('/detay', function (req, res) {
    res.render('detay');
});
app.post("/detay", login.userDetay);


// app.get('/AlbumEkle', function (req, res) {
//     res.render("AlbumEkle");
// });

app.get('/AlbumEkle', login.userAlbum);

app.post('/AlbumEkle', login.userAlbumEkle);


app.get('/MuzikTurEkle', function (req, res) {
    res.render("MuzikTurEkle");
});

app.post('/MuzikTurEkle', login.userMusic);

app.get('/sanatci_guncelleme', login.userSanatciGuncelle);
app.post('/sanatci_guncelleme', login.SanatciGuncelle);




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
