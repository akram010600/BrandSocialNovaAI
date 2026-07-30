import os
import random

from datetime import datetime

from fastapi import (
    FastAPI,
    Depends,
    HTTPException
)

from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from pydantic import BaseModel

from sqlalchemy.orm import Session
from sqlalchemy import func


# ==========================================
# DATABASE
# ==========================================

from database import (
    init_db,
    get_db,
    Post,
    Campaign,
    PromptHistory,
    ContentPlan
)


# ==========================================
# AI SERVICES
# ==========================================

from ai_service import (
    generate_content as ai_generate_content
)


from business_ai import (
    analyze_business
)


from prompt_service import (
    generate_image_prompt
)


from ai_image_service import (
    generate_ai_image
)



# ==========================================
# APPLICATION
# ==========================================

app = FastAPI(

    title="BrandSocialNovaAI",

    version="2.3"

)



# ==========================================
# IMAGE STORAGE
# ==========================================

IMAGE_FOLDER = "generated_images"


os.makedirs(
    IMAGE_FOLDER,
    exist_ok=True
)


app.mount(

    "/images",

    StaticFiles(
        directory=IMAGE_FOLDER
    ),

    name="images"

)



# ==========================================
# CORS
# ==========================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)



# ==========================================
# DATABASE START
# ==========================================

@app.on_event("startup")
def startup():

    init_db()



# ==========================================
# SCHEMAS
# ==========================================


class ImageGenerateRequest(BaseModel):

    title: str

    prompt: str




class GenerateRequest(BaseModel):

    business: str

    category: str = ""

    goal: str

    post_type: str

    platform: str = "facebook"





class GenerateResponse(BaseModel):

    title: str

    content: str

    image: str





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
        # ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/api/health")
def health():

    return {

        "status": "online",

        "service": "BrandSocialNovaAI",

        "version": "2.3"

    }




# ==========================================
# AI IMAGE GENERATOR
# ==========================================

@app.post("/api/generate-ai-image")
def generate_ai_image_api(

    payload: ImageGenerateRequest

):

    try:

        image_url = generate_ai_image(

            payload.prompt

        )


        return {

            "image": image_url

        }


    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )





# ==========================================
# AI CONTENT GENERATION
# ==========================================


@app.post(
    "/api/generate",
    response_model=GenerateResponse
)
def generate_post(

    payload: GenerateRequest

):

    try:


        business_info = analyze_business(

            business=payload.business,

            category=payload.category,

            goal=payload.goal

        )



        prompt = f"""

أنت خبير تسويق رقمي لمنصة BrandSocialNovaAI.


أنشئ منشور سوشيال ميديا احترافي.


اسم النشاط:

{payload.business}


المجال:

{business_info.get("industry","عام")}


نوع النشاط:

{business_info.get("business_type","")}


الجمهور:

{business_info.get("target_audience","")}


أسلوب العلامة:

{business_info.get("marketing_style","")}


الاستراتيجية:

{business_info.get("content_strategy","")}


الهدف:

{payload.goal}


نوع المنشور:

{payload.post_type}


المنصة:

{payload.platform}



التعليمات:

- استخدم اسم النشاط الحقيقي.
- لا تغير مجال النشاط.
- اجعل النص جاهز للنشر.
- أضف CTA.
- أضف هاشتاجات مناسبة.


"""


        result = ai_generate_content(

            prompt

        )


        return GenerateResponse(

            title=result.get(

                "title",

                "منشور جديد"

            ),


            content=result.get(

                "content",

                ""

            ),


            image=""

        )



    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )





# ==========================================
# POSTS MANAGEMENT
# ==========================================


@app.get(
    "/api/posts",
    response_model=list[PostOut]
)
def get_posts(

    db: Session = Depends(get_db)

):

    return (

        db.query(Post)

        .order_by(

            Post.created_at.desc()

        )

        .all()

    )





@app.post(
    "/api/posts",
    response_model=PostOut
)
def save_post(

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

        else 0

    )


    db.add(post)

    db.commit()

    db.refresh(post)


    return post
    # ==========================================
# DELETE POST
# ==========================================

@app.delete("/api/posts/{post_id}")
def delete_post(

    post_id: int,

    db: Session = Depends(get_db)

):


    post = (

        db.query(Post)

        .filter(

            Post.id == post_id

        )

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





# ==========================================
# ANALYTICS
# ==========================================


@app.get("/api/analytics")
def analytics(

    db: Session = Depends(get_db)

):


    return {


        "total_posts":

        db.query(

            func.count(Post.id)

        )

        .scalar() or 0,



        "published_posts":

        db.query(

            func.count(Post.id)

        )

        .filter(

            Post.status == "published"

        )

        .scalar() or 0,



        "total_likes":

        db.query(

            func.sum(Post.likes)

        )

        .scalar() or 0,



        "total_comments":

        db.query(

            func.sum(Post.comments)

        )

        .scalar() or 0,



        "total_shares":

        db.query(

            func.sum(Post.shares)

        )

        .scalar() or 0

    }





# ==========================================
# PROMPT GENERATOR
# ==========================================


class PromptRequest(BaseModel):

    business: str

    category: str = ""

    goal: str

    style: str





@app.post("/api/generate-prompt")
def generate_prompt(

    payload: PromptRequest

):


    try:


        business_info = analyze_business(

            business=payload.business,

            category=payload.category,

            goal=payload.goal

        )


        result = generate_image_prompt(

            payload.business,

            business_info.get(

                "industry",

                payload.category

            ),

            payload.goal,

            payload.style

        )


        return result



    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )





# ==========================================
# SAVE PROMPT HISTORY
# ==========================================


class SavePromptRequest(BaseModel):

    business: str

    category: str

    goal: str

    style: str

    arabic_prompt: str

    english_prompt: str





@app.post("/api/save-prompt")
def save_prompt(

    payload: SavePromptRequest,

    db: Session = Depends(get_db)

):


    item = PromptHistory(

        business=payload.business,

        category=payload.category,

        goal=payload.goal,

        style=payload.style,

        arabic_prompt=payload.arabic_prompt,

        english_prompt=payload.english_prompt

    )


    db.add(item)

    db.commit()

    db.refresh(item)


    return {

        "message": "Prompt saved",

        "id": item.id

    }





@app.get("/api/prompts")
def get_prompts(

    db: Session = Depends(get_db)

):


    return (

        db.query(PromptHistory)

        .order_by(

            PromptHistory.created_at.desc()

        )

        .all()

    )
    # ==========================================
# DELETE POST
# ==========================================

@app.delete("/api/posts/{post_id}")
def delete_post(

    post_id: int,

    db: Session = Depends(get_db)

):


    post = (

        db.query(Post)

        .filter(

            Post.id == post_id

        )

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





# ==========================================
# ANALYTICS
# ==========================================


@app.get("/api/analytics")
def analytics(

    db: Session = Depends(get_db)

):


    return {


        "total_posts":

        db.query(

            func.count(Post.id)

        )

        .scalar() or 0,



        "published_posts":

        db.query(

            func.count(Post.id)

        )

        .filter(

            Post.status == "published"

        )

        .scalar() or 0,



        "total_likes":

        db.query(

            func.sum(Post.likes)

        )

        .scalar() or 0,



        "total_comments":

        db.query(

            func.sum(Post.comments)

        )

        .scalar() or 0,



        "total_shares":

        db.query(

            func.sum(Post.shares)

        )

        .scalar() or 0

    }





# ==========================================
# PROMPT GENERATOR
# ==========================================


class PromptRequest(BaseModel):

    business: str

    category: str = ""

    goal: str

    style: str





@app.post("/api/generate-prompt")
def generate_prompt(

    payload: PromptRequest

):


    try:


        business_info = analyze_business(

            business=payload.business,

            category=payload.category,

            goal=payload.goal

        )


        result = generate_image_prompt(

            payload.business,

            business_info.get(

                "industry",

                payload.category

            ),

            payload.goal,

            payload.style

        )


        return result



    except Exception as e:


        raise HTTPException(

            status_code=500,

            detail=str(e)

        )





# ==========================================
# SAVE PROMPT HISTORY
# ==========================================


class SavePromptRequest(BaseModel):

    business: str

    category: str

    goal: str

    style: str

    arabic_prompt: str

    english_prompt: str





@app.post("/api/save-prompt")
def save_prompt(

    payload: SavePromptRequest,

    db: Session = Depends(get_db)

):


    item = PromptHistory(

        business=payload.business,

        category=payload.category,

        goal=payload.goal,

        style=payload.style,

        arabic_prompt=payload.arabic_prompt,

        english_prompt=payload.english_prompt

    )


    db.add(item)

    db.commit()

    db.refresh(item)


    return {

        "message": "Prompt saved",

        "id": item.id

    }





@app.get("/api/prompts")
def get_prompts(

    db: Session = Depends(get_db)

):


    return (

        db.query(PromptHistory)

        .order_by(

            PromptHistory.created_at.desc()

        )

        .all()

    )