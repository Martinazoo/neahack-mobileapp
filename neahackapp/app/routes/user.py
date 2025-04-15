from app.db.db import SessionLocal, User
from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.responses import JSONResponse, StreamingResponse
import shutil
from passlib.context import CryptContext
from app.schemas.user import UserCreate
from sqlalchemy import select, update
from sqlalchemy.orm import Session
from bcrypt import hashpw, gensalt
import os

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

users_router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@users_router.post("/register")
async def create_user(user: UserCreate,  db: Session = Depends(get_db)):
    result = db.execute(select(User).where(User.email == user.email)).first()
    if result:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hashpw(user.password.encode('utf-8'), gensalt())
    new_user = User(email=user.email, password=hashed_password)  
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@users_router.post("/login")
async def login_user(user: UserCreate, db: Session = Depends(get_db)):
    result = db.execute(select(User).where(User.email == user.email)).first()
    if not result:
        raise HTTPException(status_code=400, detail="Email not registered")
    db_user = result[0]
    if not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    return db_user.email


@users_router.post("/upload/{email}")
async def upload_image(email: str, photo: UploadFile = File(...), db: Session = Depends(get_db)):
    result = db.execute(select(User).where(User.email == email)).first()
    if not result:
        raise HTTPException(status_code=400, detail="Email not registered")
    db_user = result[0]
    file_path = os.path.join(UPLOAD_DIR, photo.filename)
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(photo.file, buffer)
        
        db_user.model_path = file_path
        db.commit()
        db.refresh(db_user)

        return JSONResponse(
            content={"filename": photo.filename, "message": "Imagen subida correctamente"},
            status_code=200
        )
        
        
    except Exception as e:
        return JSONResponse(
            content={"error": str(e)},
            status_code=500
        )
    
@users_router.get("/get_model_path/{email}")
async def get_model_path(email: str, db: Session = Depends(get_db)):
    result = db.execute(select(User).where(User.email == email)).first()
    
    if not result:
        raise HTTPException(status_code=400, detail="Email not registered")
    
    db_user = result[0]

    if not db_user.model_path:
        raise HTTPException(status_code=400, detail="No model path found")
    
    model_path = db_user.model_path

    if not os.path.exists(model_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    import mimetypes
    mime_type, _ = mimetypes.guess_type(model_path)
    mime_type = mime_type or 'application/octet-stream' 
    return StreamingResponse(open(model_path, "rb"), media_type=mime_type)