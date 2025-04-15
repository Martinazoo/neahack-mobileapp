from app.db.db import SessionLocal, Base, engine, User

Base.metadata.create_all(bind=engine)