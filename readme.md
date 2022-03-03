
# micro ok

probleme il faut que l'index soit charger après la page micro. Il faudrait que ce soit l'inverse.



TODO

au chargement de la page karaoke
=> cration d'un socket. Partage par qrcode d'une url avec l'id du socket.
=> les micro se connecte et utilise le socket id récupérer par qrcode pour accéder au bon salon de karaoke.


Pour une bonne comprehension. reprendre de zero.

Dans la vue home => emit 'I am home'
=> save socket id
Dans la vue micro => emit 'I am a micro'

Sur le serveur send à la home les micro.

A partir de la étudier la connexion webrtc pour la réaliser entre la home et les micro.


PB : l'aurisation étant réaliser sur le device micro, la connexion rtc se réalise sur celui-ci.

=> regarder si nous pouvons le faire sur la home et que le micro n'est cas rejoindre et non à créer


Quand le micro se connect pourla premiere fois il n'a pas l'offre rtc. Peut etre essayer de save l'offre sur le serveur et de l'envoyer(emit) à toute nouvelle connexion
