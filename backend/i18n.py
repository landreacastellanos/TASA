# TODO: New usage i18n = [ "en":{...}, "es": {...} ]
# Usage i18n["en"][".."]
def i18n(key):
    i18n = {
        "name": "Nombre",
        "last_name": "Apellido",
        "age": "Edad",
        "profesion": "Profesión",
        "email": "Correo Electronico",
        "phone": "Telefono",
    }
    return i18n[key]


def role(key):
    role = {
            "Administrador": "admin",
            "Capataz": "ca",
            "Resp. Decisiones de Compra": "rdc",
            "Dueño de la finca": "df",
            "Socio Adicional": "sa",
            "Vendedor": "v",
    }
    return role[key]
