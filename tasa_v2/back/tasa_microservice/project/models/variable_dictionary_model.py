from sqlalchemy import Table, Column, ForeignKey, Boolean, DateTime, Float, Integer, JSON, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class VariableDictionaryModel(Base):
    __tablename__ = 'ps_variable_dictionary_vdi'
    __table_args__ = {"schema": "PS"}
