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
        "property_name": "Nombre",
        "business_name": "Razon Social",
        "phone": "Telefono",
        "property_address": "Dirección",
        "total_ha_property": "Total ha Finca",
        "sowing_system": "Sistema de Siembra",
        "land_name": "Nombre Lote",
        "land_ha": "Hectareas Lote",
        "property_id": "Finca ID",
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
            "Influenciador de Decisiones de Compra": "idc",
            "Encargado de Compras": "ec",
            "Encargado de Pagos": "ep",
    }
    return role[key]
