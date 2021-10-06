![logo gambitero](https://raw.githubusercontent.com/oveigam/gambitero-app/master/assets/favicon.png)
# Gambitero

Gestiona y organiza planes (*"gambiteos"*) con tus amigos!

Organizar planes por un chat de grupo puede ser una tarea costosa, la fauna típica del chat siempre incluye al que no lee el chat, el que no le apetece leer la discusión y pide que se la resuman y mi favorito, el que decide hablar del partido de fútbol mientras los demás intentan ponerse de acuerdo en un plan.

Con Gambitero puedes organizar los planes de manera individual e ir indicando los detalles que se van confirmando para que nadie tenga que preguntar por el chat a que hora se queda o cualquier tontería de la que ya se habló!

> Este es el repositorio del cliente móvil para la aplicación Gambitero. 
> Puedes ver el repositorio del backend [aquí](https://github.com/oveigam/gambitero-back).

## Features

- Crea planes (*"gambiteos"*) e invita a tus amigos
- Organiza tus planes de manera detallada:
	- Informa: indica cualquier detalle del plan (lugar, hora, etc.)
	- Votación: si algún detalle no está decidido puedes pedir votaciones de los participantes para ver que quieren hacer.
	- Confirmación: Pide a tus usuarios que confirmen algún detalle del plan, como por ejemplo quien va a asistir, quien pone coche, etc.
- Chat individual para cada gambiteo.
- Notificaciones
- **Aplicación en tiempo real**


## Tech

Lista de tecnologías (principales) usadas para desarrollar la aplicación:
-  **React Native (con expo):** Framework para desarrollar apps android/iOS
-  **Redux (con redux-toolkit):** Para gestionar el estado e información de la app
-  **UI Kitten:** Librería de componentes
-  **SockerIO:** Cliente par amostrar información en tiempo real

## Installation

"Gambitero" necesita [npm](https://nodejs.org/en/download/) para instalar las dependencias y [expo CLI](https://docs.expo.dev/workflow/expo-cli/) para ejecutar el entorno de desarrollo.

También necesitarás tener desplegado el [servidor de gambitero](https://github.com/oveigam/gambitero-back)

Una vez descargado el código instalar las dependencias con npm e iniciar el entorno de desarrollo con expo.

```sh
npm install
expo start
```

Para compilar apk de android...
```sh
expo build:android
```

Para iOS...
>  *Nota*: nunca he probado ni testeado en dispositivo iOS
```sh
expo build:ios
```

## Demo
Los datos de la demo se reinician periódicamente.

La demo tiene deshabilitada la creación de usuarios. Puedes conectarte con alguno de estos usuarios de prueba:

| username | password |
| ------ | ------ |
| ilovegambitero | gambitero |
| oveigam | gambitero |
| miro | gambitero |
| bean | gambitero |
| mantis | gambitero |
| mrajoy | gambitero |

[APK para dispositivos Android]()

>  *Nota*: Para poder ejecutarla es necesario habilitar "Fuentes desconocidas"

## Planned Features
- Gestión de cuentas completa (confirmación de mail, resetear contraseña, borrar cuenta, etc.)
- Mejora de las funcionalidades sociales
	- Poder buscar amigos sin tener que saber el username exacto
	- Creación de grupos de amigos con los que sueles realizar ciertos planes para simplificar el proceso de invitación a los gambiteos
	- Mensajería directa
- Gestionar permisos en los gambiteos para que puedan administrarlos usuarios que no sean el creador
- Soporte para más tipos de datos en los campos de info del gambitero (ubicación, imagen, etc.)
- Extensión de los campos de detalle de los gambiteros
	- Añadir sugerencias a las votaciones
	- Campo para organizar y dividir. Para usos como repartir a la gente en coches o repartir gastos del plan
- Chat mejorado 
	- Poder referenciar campos de detalle del gambitero en el propio chat. Por ejemplo, si alguien pregunta, a que hora es el plan, poder pasarle una referencia al campo del gambiteo que detalla la hora (y si fuera una votación u otro tipo de campo que pueda interactuar con el directamente)
	- Poder crear campos de detalle directamente desde el chat. Por ejemplo, si se está discutiendo por chat a que sitio se va a ir, poder crear un campo de votación directamente para votar sobre el tema
	- Cifrado end-to-end

## Status
> Actualmente el desarrollo está parado

La aplicación tiene las funcionalidades principales para funcionar como prueba de concepto. 

Sin embargo faltan bastantes cosas críticas para poder usarla en un entorno de producción, como la confirmación de mail, reseteo de mail, etc.

Tampoco a sido testeada mucho y hay varios bugs...
- El switch en un campo de asistencia no se sincroniza con los datos reales
- La caja del chat se redimensiona de manera rara si empiezas a marear con texto raros o largos
- Algunos elementos no se ajustan correctamente al dark mode
- ...

El diseño creo que deja que desear y al probarla con varios usuarios el feedback más común es que es demasiado confusa y compleja de usar. Necesitaría simplificar y aclarar la app, principalmente la creación de gambiteos.

Adicionalmente, desde que migré a la librería de componentes UI Kitten, el rendimiento es basura, no estoy seguro de si la causa es la librería (o el uso poco efectivo de ella) o alguna cosa a posteriores.