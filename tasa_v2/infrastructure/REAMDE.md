# Infrastructure

La infr estructura del proyecto esta creada en GCP con el `project-id=tasa-atech, actualmente los usuarios que tienen permisos para editar esté proyecto son:

- atechitconsult@gmail.com(Propietario)
- Diegol.bustamantep@gmail.com (Propietario)
- juanse.cloud@gmail.com (Propietario)

El cliente puede desactivar el accesos de dichos usuarios cuando el lo crea pertinente

## Configuración de ambiente

Cada ambiente está construido por la siguiente configuración

### IP estática

Una IP para ser usada en una VM, se debe reservar para que la IP no cambie en el tiempo

### Registro DNS (fuera de GCP)

La IP debé estar registrada como un nuevo subdominio de la empresa, entonces debe existir un registro parecido a : “A 104.154.201.42 app.tasa.co”

### Disco duro

Se crea un disco duro estándar de 300 para ser agregado a la VM, se crea como disco aparte pr si TASA necesita cambiarlo y poner uno más grande

### VM

Se crea una VM con el ultimo imagen disponible de Ubuntu Server, se configura con el disco y la IP, adicionalmente se le dan accesos para acceder HTTP y HTTPS además que cumpla con los requrimientos mencionados

#### Requerimiento óptimo

    CPU:2
    RAM:4
    DISCO: 300GB
