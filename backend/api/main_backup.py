import random
from datetime import datetime

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import init_db, get_db, Post
from ai_service import generate_content as ai_generate_content


app = FastAPI(title="BrandSocialNovaAI API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


class PostCreate(BaseModel):
    title: str
    content: str
    platform: str = "instagram"
    status: str = "draft"


class PostOut(BaseModel):
    id: int
    title: str
    content: str
    platform: str
    status: str
    likes: int
    comments: int
    shares: int
    created_at: datetime

    class Config:
        from_attributes = True


class GenerateRequest(BaseModel):
    topic: str
    tone: str = "friendly"
    platform: str = "instagram"


class GenerateResponse(BaseModel):
    title: str
    content: str



@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "BrandSocialNovaAI"
    }



@app.get("/api/posts", response_model=list[PostOut])
def list_posts(db: Session = Depends(get_db)):
    return (
        db.query(Post)
        .order_by(Post.created_at.desc())
        .all()
    )



@app.post("/api/posts", response_model=PostOut)
def create_post(
    payload: PostCreate,
    db: Session = Depends(get_db)
):

    post = Post(
        title=payload.title,
        content=payload.content,
        platform=payload.platform,
        status=payload.status,
        likes=random.randint(0,50)
        if payload.status == "published"
        else 0,
        comments=random.randint(0,20)
        if payload.status == "published"
        else 0,
        shares=random.randint(0,10)
        if payload.status == "published"
        else 0,
    )

    db.add(post)
    db.commit()
    db.refresh(post)

    return post



@app.delete("/api/posts/{post_id}")
def delete_post(
    post_id:int,
    db:Session=Depends(get_db)
):

    post = (
        db.query(Post)
        .filter(Post.id == post_id)
        .first()
    )

    if not post:
        raise HTTPException(
            status_code=404,
            detail="Post not found"
        )

    db.delete(post)
    db.commit()

    return {
        "deleted": True
    }



@app.post("/api/generate", response_model=GenerateResponse)
def generate_post(payload: GenerateRequest):

    prompt = f"""
أنت خبير تسويق رقمي.

أنشئ منشور سوشيال ميديا احترافي باللغة العربية.

الموضوع:
{payload.topic}

المنصة:
{payload.platform}

الأسلوب:
{payload.tone}

اكتب:
عنوان جذاب
محتوى تسويقي
دعوة لاتخاذ إجراء
هاشتاجات
"""


    try:
        content = ai_generate_content(prompt)

    except Exception as e:
        content = f"خطأ: {str(e)}"


    return GenerateResponse(
        title=f"منشور عن {payload.topic}",
        content=content
    )



@app.get("/api/analytics")
def analytics(
    db:Session=Depends(get_db)
):

    total_posts = (
        db.query(func.count(Post.id))
        .scalar()
        or 0
    )


    published = (
        db.query(func.count(Post.id))
        .filter(Post.status=="published")
        .scalar()
        or 0
    )


    return {
        "total_posts": total_posts,
        "published_posts": published
    }