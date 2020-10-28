from sqlalchemy import Table, Column, ForeignKey, Boolean, DateTime, Float, Integer, JSON, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class VariableCustomNameModel(Base):
    __tablename__ = "ps_variable_custom_name_vcn"
    __table_args__ = {"schema": "MS"}
