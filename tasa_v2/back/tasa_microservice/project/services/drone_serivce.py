from project.infrastructure.repositories.common_repository import CommonRepository


class DroneService:
    
    
    def __init__(self):
        self.__repository_drones = CommonRepository(
         entity_name="drone")
    
    def get_drone(self, id):
        drone = self.__repository_drones.select_one(int(id), entity_name="drone")
        return drone[0]

    def get_drones(self):
        return self.__repository_drones.select_all()

    def put_drone(self, id, drone):
        results = {
            "data": [],
            "details": []
        }
        drone_data={
            "name":str(drone['name']),
            "state":bool(drone['state']),
            "reason":str(drone['reason'])
        }
        
        self.__repository_drones.update(id,drone_data)
        results['data'].append("Dron actualizado correctamente")
        return drone
    
    def post_drone(self, drone):
        results = {
            "data": [],
            "details": []
        }
        drone_data={
            "name":str(drone['name']),
            "state":bool(drone['state'])
        }
        
        if("reason" in drone):
            drone_data['reason']=drone['reason']
        propery = self.__repository_drones.insert(drone_data)
        results['data'].append("Dron creado correctamente")
        return results
    
    def delete_drone(self, id):
        self.__repository_drones.delete(id)