# Wie Sie das Electionsystem-Beispiel starten
In diesem Dokument skizzieren wir kurz, was Sie tun müssen, um das Electionsystem-Beispiel 
erfolgreich auf Ihrem Entwickluzngsrechner zu starten. 


## Schritt 1: Starten des DBMS
1. Installation von mySQL
2. Starten der mySQL (Vorgehensweise plattformabhängig, siehe 
Hersteller-Dokumentation zu mySQL).
3. Erstellen einer Datenbank mit Beispieldaten mithilfe der Datei ```/mysql/MySQL-Dump.sql```.

## Schritt 2: Starten des Backend
1. Erstellen einer Virtual Environment, siehe [Dokument 
INSTALLATION.md](INSTALLATION.md).
2. Starten der Datei ```/src/main.py```.
 
## Schritt 3: Starten des Frontend
1. Sicherstellen, dass Sie sich im Verzeichnis ```/src/static/``` befinden. Für React-spezifischen Vorbereitungen
siehe [Dokument INSTALLATION.md](INSTALLATION.md).
2. Oder im Terminal in das Verzeichnis „frontend” navigieren
3. “npm install” ausführen (dies kann einige Minuten dauern)
4. “npm start” eingeben um das Projekt anschließend zu starten

