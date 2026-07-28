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



# ================= Schemas =================


class PostCreate(BaseModel):

    title: str
    content: str
    platform: str = "facebook"
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



# طلب إنشاء المحتوى الجديد

class GenerateRequest(BaseModel):

    business: str
    category: str
    goal: str
    post_type: str
    platform: str = "facebook"



class GenerateResponse(BaseModel):

    title: str
    content: str



# ================= Health =================


@app.get("/api/health")
def health():

    return {
        "status": "ok",
        "service": "BrandSocialNovaAI"
    }



# ================= Posts =================


@app.get("/api/posts", response_model=list[PostOut])
def list_posts(
    db: Session = Depends(get_db)
):

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
    db:Session = Depends(get_db)
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




# ================= AI Generator V2 =================


@app.post(
    "/api/generate",
    response_model=GenerateResponse
)
def generate_post(
    payload: GenerateRequest
):


    prompt = f"""

اسم النشاط:
{payload.business}


المجال:
{payload.category}


الهدف التسويقي:
{payload.goal}


نوع المنشور:
{payload.post_type}


المنصة:
{payload.platform}


"""


    try:

        result = ai_generate_content(prompt)


        return GenerateResponse(

            title=result["title"],

            content=result["content"]

        )


    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )




# ================= Analytics =================


@app.get("/api/analytics")
def analytics(
    db: Session = Depends(get_db)
):


    total_posts = (

        db.query(func.count(Post.id))
        .scalar()

        or 0
    )


    published = (

        db.query(func.count(Post.id))

        .filter(Post.status == "published")

        .scalar()

        or 0
    )


    total_likes = (

        db.query(func.sum(Post.likes))

        .scalar()

        or 0
    )


    total_comments = (

        db.query(func.sum(Post.comments))

        .scalar()

        or 0
    )


    total_shares = (

        db.query(func.sum(Post.shares))

        .scalar()

        or 0
    )



    return {

        "total_posts": total_posts,

        "published_posts": published,

        "total_likes": total_likes,

        "total_comments": total_comments,

        "total_shares": total_shares

    }