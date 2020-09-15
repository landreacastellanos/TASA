# TODO: New usage i18n = [ "en":{...}, "es": {...} ]
# Usage i18n["en"][".."]
def i18n(key):
    i18n = {
        "id": "ID",
        "name": "Nombre",
        "property_name": "Nombre Propiedad",
        "last_name": "Apellido",
        "age": "Edad",
        "profesion": "Profesión",
        "email": "Correo Electronico",
        "phone": "Telefono",
        "business_name": "Razon Social",
        "phone": "Telefono",
        "address": "Dirección",
        "property_address": "Dirección de la Finca",
        "total_ha_property": "Total Hectáreas Finca",
        "sowing_system": "Sistema de Siembra",
        "land_name": "Nombre Lote",
        "land_ha": "Hectareas Lote",
        "property_id": "Finca ID",
        "role": "Rol",
        "web_site": "Sitio Web",
        "property_ep": "Encargado de Pagos",
        "property_ca": "Capataz",
        "property_rdc": "Resp. Decisiones de Compra",
        "property_df": "Dueño de la finca",
        "property_sa": "Socio Adicional",
        "property_v": "Vendedor TASA",
        "property_idc": "Influenciador de Decisiones de Compra",
        "property_ec": "Encargado de Compras",
        "property_admin": "Administrador",
        "created_date": "Fecha de Creación",
        "lands": "Lotes",
        "phone_ca": "Telefono Contacto",
        "phone_df": "Telefono Contacto",
        "property_ca_contact": "Contacto",
        "property_df_contact": "Contacto",
    }
    return i18n[key]


def role(key):
    role = {
            "Administrador": "admin",
            "Capataz": "ca",
            "Resp. Decisiones de Compra": "rdc",
            "Dueño de la finca": "df",
            "Socio Adicional": "sa",
            "Vendedor TASA": "v",
            "Influenciador de Decisiones de Compra": "idc",
            "Encargado de Compras": "ec",
            "Encargado de Pagos": "ep",
    }
    return role[key]


def sowing_system(sowing_system):
    if sowing_system == "1":
        return "Arroz Secano"
    elif sowing_system == "2":
        return "Arroz de Riego"
    elif sowing_system == "Arroz Secano":
        return "1"
    elif sowing_system == "Arroz de Riego":
        return "2"
