from project.infrastructure.repositories.common_repository\
    import CommonRepository


class CalendarService:

    def __init__(self):
        self.__repository_user = CommonRepository(
         entity_name="user")
        self.__repository_calendar = CommonRepository(
         entity_name="calendar")
        self.__repository_properties = CommonRepository(
         entity_name="properties")
        self.__repository_land = CommonRepository(
         entity_name="land")
        self.__repository_stage = CommonRepository(
         entity_name="stage")
    
    def set_calendar_planning_date(self, land_id, user_id, planning_date):
        # land = self.__repository_land.select_one(land_id)
        # property_field = self.__repository_properties.select_one(land[0]['property_id'])
        # sowing_system = property_field[0]['sowing_system']

        # stage = self.__repository_stage.select(entity_name="stage", options={"filters":
        #                 [['typePlanning', "equals", sowing_system],
        #                 "and",
        #                 ['stageNumber', "equals", 1]]
        #                 })

        # calendar_activity = {
        #     "land_id": land_id,
        #     "user_id": user_id,

        # }
        # self.__repository_calendar.insert(calendar_activity)
        return 1

    def set_calendar_real_date(self, land_id, user_id, real_date):
        return 1