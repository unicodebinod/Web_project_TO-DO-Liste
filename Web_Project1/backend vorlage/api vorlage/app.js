/***************************************************************************************************
    Abhängige Pakete die in der package.json definiert sind
*****************************************************************************************************/
const express = require('express')                  // http-server framework
const cors = require('cors')                        // CORS deaktivieren
const csv = require('csv-parser');                  // handler für CSV Dateien
const fs = require('fs');                           // handler zum lesen/schreiben von Dateien
const ObjectsToCsv = require('objects-to-csv')      // Wandlet CSV Zeilen in JSON-Objekte um

/***************************************************************************************************
    Konfigurationen
*****************************************************************************************************/
const port = process.env.PORT || 5000               // Konfiguration des Webserver-Ports
let morgan = require('morgan')                      // http-zugriff logging auf der CLI
let bodyParser = require('body-parser');            // einfacher handler für POST/PUT payloads
const corsOptions = {                               // CORS-Optionen definieren
    origin: '*'
}

/***************************************************************************************************
    express framework initialisieren
****************************************************************************************************/
const app = express()                               // express app erstellen
app.use(bodyParser.json());                         // den body-parser übergeben
app.use(morgan('combined'))                         // den http-logger übergeben
app.use(cors(corsOptions))                          // CORS-Einstellungen übergeben

/***************************************************************************************************
    todo liste
****************************************************************************************************/
let todoListe = []                                  // Array Liste der todo-Einträge

/***************************************************************************************************
    CSV Datei lesen und zur Liste hinzufügen
****************************************************************************************************/
fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', (row) => {
        todoListe.push(row)
    })

/***************************************************************************************************
    Standard-Route, ohne funktion
****************************************************************************************************/
app.get("/", (request, response) => {
    response.json({
        greeting: "Hello World of Techstarter!"
    })
});

/***************************************************************************************************
    Ausgabe aller Objekte als Array
****************************************************************************************************/
app.get('/todos', (request, response) => {
    // TODO: respone muss das array als json zurück geben
})

/***************************************************************************************************
    Erstellen eines neuen Eintrags
    Übertragen wird der payload in der form
    ```
    {
        "name": "Ein neuer Eintrag"
    }
    ```
****************************************************************************************************/
app.post('/todos', function(request, response) {

    // TODO:
    //      * Payload auslesen
    //      * Neues CSV Element anlegen (id, name, done)
    //      * Element an die Liste anfügen
    //      * Liste in CSV um wandeln und speichern über `ObjectsToCsv`
    //      * neue Liste zurück geben
});

/***************************************************************************************************
    Aktualisieren eines bestehenden Eintrags
    Übertragen wird der payload in der form
    ```
    {
        "id": 1,
        "done": true
    }
    ```
****************************************************************************************************/
app.put('/todos', function(request, response) {
    // TODO:
    //      * Payload auslesen
    //      * Element in der Liste finden anhand der übertragenen ID
    //      * Element aktualisieren, passend zum `done` Status
    //      * Liste in CSV um wandeln und speichern über `ObjectsToCsv`
    //      * neue Liste zurück geben
});

/***************************************************************************************************
    Löschen eines bestehenden Eintrags
****************************************************************************************************/
app.delete('/todos/:id', function(request, response) {
    // TODO:
    //      * ID aus der URL auslesen
    //      * Element in der Liste finden anhand der übertragenen ID
    //      * Element aus der Liste löschen
    //      * Liste in CSV um wandeln und speichern über `ObjectsToCsv`
    //      * neue Liste zurück geben
});


/***************************************************************************************************
    Starten der express Anwendung
****************************************************************************************************/
app.listen(port, () => console.log(`Techstarter Todo App listening on port ${port}!`))