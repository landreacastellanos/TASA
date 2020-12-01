from project.services.product_service import ProductServices

def get_product(id_land, id_stage):
    try:
        result = ProductServices().get_product(id_land, id_stage)
    except Exception as exception:
        result = exception.args[0]
        result['details'].append(result)
    return result