const sql = require('mssql')

var webconfig = {
    user: "yasinzz",
    password: "soft.SQLDatabase",   
    server: 'nodejsyasin.database.windows.net',
    database: "MEDIPOLIMDB",
    options: {
      encrypt: true  
    }
};

module.exports.userLogin = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query(' select * from Album order by AlbumId;select * from Sanatci order by SanatciId; select * from MuzikTur order by MuzikTurId;', function (err, data) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('home', { veri: data.recordsets });
        });
    });
}


module.exports.userDetay = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();

        request1.query("insert into Sanatci(SanatciAdi,SanatciYasiyormu,SanatciDogumTarihi,EklenmeTarihi)VALUES('" + req.body.isim + "'," + req.body.yasiyormu + "," + req.body.dogumtarihi + ",GETDATE())", function (err, data) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('detay');
        });

    });
}

module.exports.userMusic = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query(`insert into MuzikTur VALUES('${req.body.muzikTur}')`, function (err, tur) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.send('Muzik Tur Eklendi');
        });
    });
};

module.exports.userAlbum = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        request1.query("select * from Sanatci; select * from MuzikTur;", function (err, verisonucu) {
            if (err) {
                console.log(err);
            }
            sql.close();
            res.render('AlbumEkle', { veri1: verisonucu.recordsets });

     
        });
    });
}
module.exports.userAlbumEkle = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();

        request1.query(`insert into Album VALUES('${req.body.albumAdi}','${req.body.cikisTarihi}','${req.body.sanatciId}','${req.body.muzikTurId}')`, function (err, sarkiver) {
            if (err) {
                console.log(err);
            }
            sql.close();

            res.send("eklendi");
        });

    });

}
module.exports.SanatciGuncelle = function (req, res) {
    sql.connect(webconfig, function (err) {
        if (err) console.log(err);
        var request1 = new sql.Request();
        console.log(req.body);
        request1.query(      `
        UPDATE Sanatci
          set 
            SanatciAdi = '${req.body.sanatciAdi}', 
            SanatciYasiyormu = '${req.body.yasiyormu}', 
            SanatciDogumTarihi = '${req.body.sanatciDogumTarih}', 
            EklenmeTarihi = '${req.body.eklenmeTarihi_G}'
          where
            SanatciId = ${req.body.sanatciId}
        `,
        function (err, data) {
                if (err) {
                    console.log(err);
                }
                sql.close();
                res.render('sanatci_guncelleme',);
            }
        );
    });
}

