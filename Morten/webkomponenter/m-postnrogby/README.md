# UNDER UDVIKLING



# Webkomponent: m-tid
HTML inline element som viser aktuelle klient dato og klokkeslet.

# Attributter

### format
Med format attributten angives om datoen skal vises i lang eller kort format. Værdier:

- kort (default)
- lang 

# Eksempler
Langt format
```sh
<m-tid format="lang"></m-tid>
mandag 7. december 2020 02:56:14
```
Kort format
```sh
<m-tid format="kort"></m-tid>
7.12.2020 02:57:52
```

# CSS Styling
Styling sker direkte på elementet via CSS klassen "m-tid" i CSS dokumentet "m-tid.css".