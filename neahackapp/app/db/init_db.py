from app.db.db import SessionLocal, Base, engine, User
def init_db():
    Base.metadata.create_all(bind=engine)
