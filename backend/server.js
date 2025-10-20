const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(cors());

// Adatbázis kapcsolat létrehozása
    const db = mysql.createConnection({
        user: "root",
        host: "127.0.0.1",
        port: 3307,
        password: "",
        database: "fogado",
});

// Gyökér útvonal, tesztelésre
    app.get("/", (req, res) => {
        res.send("Fut a backend!");
})

app.get("/hettorpefogado", (req, res) => {  
    const sql = "SELECT DISTINCT sznev, agy FROM foglalasok INNER JOIN szobak ON foglalasok.szoba = szobak.szazon INNER JOIN vendegek ON foglalasok.vendeg = vendegek.vsorsz;";
    db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result)
    })
});
 
app.get("/szobakkihasznaltsaga", (req, res) => {  
    const sql = " SELECT sznev, SUM(fo) AS osszes_vendeg, SUM(DATEDIFF(tav, erk)) AS osszes_ott_toltott_ejszaka FROM foglalasok INNER JOIN szobak ON foglalasok.szoba = szobak.szazon INNER JOIN vendegek ON foglalasok.vendeg = vendegek.vsorsz GROUP BY sznev;";
    db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result)
    })
});
 
app.get("/valasztottszoba", (req, res) => {
    const sql = "SELECT sz.sznev AS 'Szobanév', f.erk AS 'Érkezés', f.tav AS 'Távozás' FROM szobak sz LEFT JOIN (SELECT szoba, erk, tav FROM foglalasok WHERE (szoba, erk) IN (SELECT szoba, MAX(erk) FROM foglalasok GROUP BY szoba)) f ON sz.szazon = f.szoba ORDER BY sz.sznev;";
    db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result)
    })
});


// Szerver indítása a 3001-es porton
    app.listen(3001, () => {
        console.log("Server is running on port 3001");
});