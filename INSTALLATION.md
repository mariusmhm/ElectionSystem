# Installationsanleitung

## Client-Seite 
Der Client baut auf einem React-Frontend auf, welches mit create-react-app gebootstrapt wurde. Der Quellcode des React-Clients liegt im Verzeichnis `/frontend`.

### Was wird vorab benötigt?
1. Node.js (siehe https://nodejs.org/ oder Installation via [Homebrew](https://brew.sh) 
2. Package dependecies: 
Vor dem Start des Entwicklungsservers müssen die Dependencies installiert werden. Dies erfolgt über das Kommando `npm install` im Terminal. Folgende Abhängigkeiten werden installiert:
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Material-UI](https://material-ui.com)
- [Google firebase authentication](https://firebase.google.com/docs/web/setup)

### Wie wird der Development-Server gestartet?
Der Dev-Server wird in einem Terminal mit dem Kommando `npm start` gestartet. Nach erfolgreichem Start ist die React-App unter http://localhost:3000 verfügbar.

### Deployment auf den flask-Server
Soll die React-App für ein Deployment unter flask bereit gemacht werden, wird im Terminal mit dem Kommando `npm run build` die App produktionsreif und performanzoptimiert in dem Vereichnis `/frontend/build` zur Verfügung gestellt. 

## Server/Service-Seite
Die Server-Seite baut auf Python, Flask sowie RestX auf.

### Was wird vorab benötigt?
1. Aktuelle Python-Installation (siehe python.org)
2. Flask (darin enthalten sind auch *Werkzeug* und *Jinja*)
3. flask-restx
4. flask-cors 
5. google-auth
6. requests

Flask, flask-restx und flask-cors Installation --> hierfür kann ```pip``` verwendet werden 
ODER: PyCharm --> Virtual Environment anlegen und die Packages nacheinander installiert
 ```flask```, ```flask-restx```, ```flask-cors```, ```google-auth``` und ```requests``` 

### Wie wird der Server gestartet?
--> ```main.py``` ausführen (PyCharm Rechtsklick auf die Datei ```main.py``` und dann ```Run main``` auswaehlen  )
Voraussetzung: Ordentlich installierte Environment voraus (s.o.). Unter PyCharm genügt der Rechtsklick
