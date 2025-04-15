from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship, sessionmaker, declarative_base
from sqlalchemy.orm import Mapped, mapped_column

from fastapi import FastAPI
from pydantic import BaseModel
from sqlalchemy.orm import DeclarativeBase


DATABASE_URL = "sqlite:///./test.db"

class Base(DeclarativeBase):
    pass

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False}) 
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class User(Base):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, nullable=False)
    email: Mapped[str] = mapped_column(unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    model_path: Mapped[str] = mapped_column(nullable=True, unique=True)
    clothes: Mapped[list["Cloth"]] = relationship(back_populates="user")
    user_clothes: Mapped[list["UserCloth"]] = relationship(back_populates="user") 


class Cloth(Base):
    __tablename__ = "clothes"
    
    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True, nullable=False)
    name: Mapped[str] = mapped_column(nullable=False)
    description: Mapped[str] = mapped_column(nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    
    user: Mapped["User"] = relationship(back_populates="clothes")
    user_clothes: Mapped[list["UserCloth"]] = relationship(back_populates="cloth")  

class UserCloth(Base):
    __tablename__ = "user_clothes"
    
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False, primary_key=True)
    cloth_id: Mapped[int] = mapped_column(ForeignKey("clothes.id"), nullable=False, primary_key=True)
    
    user: Mapped["User"] = relationship(back_populates="user_clothes") 
    cloth: Mapped["Cloth"] = relationship(back_populates="user_clothes")  
