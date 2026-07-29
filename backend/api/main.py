import os
import random

from datetime import datetime

from fastapi import FastAPI, Depends, HTTPException

from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from pydantic import BaseModel

from sqlalchemy.orm import Session
from sqlalchemy import func


from database import (
    init_db,
    get_db,
    Post,
    Campaign,
    PromptHistory,
    ContentPlan
)


from ai_service import (
    generate_content as ai_generate_content
)


from prompt_service import (
    generate_image_prompt
)


from ai_image_service import (
    generate_ai_image as openai_generate_image
)



# ==================================================
# APP
# ==================================================

app = FastAPI(
    title="BrandSocialNovaAI API",
    version="1.0.0"
)



# ==================================================
# IMAGE CONFIG
# ==================================================

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



# ==================================================
# CORS
# ==================================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)



# ==================================================
# STARTUP
# ==================================================

@app.on_event("startup")
def startup():

    init_db()



# ==================================================
# SCHEMAS
# ==================================================

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



class GenerateRequest(BaseModel):

    business: str

    category: str

    goal: str

    post_type: str

    platform: str = "facebook"



class GenerateResponse(BaseModel):

    title: str

    content: str

    image: str



class PromptRequest(BaseModel):

    business: str

    category: str

    goal: str

    style: str



class SavePromptRequest(BaseModel):

    business: str

    category: str

    goal: str

    style: str

    arabic_prompt: str

    english_prompt: str



class ImageGenerateRequest(BaseModel):

    title: str

    prompt: str



class CampaignCreate(BaseModel):

    business: str

    category: str = "خدمات"

    goal: str = "زيادة العملاء"

    platform: str = "facebook"

    posts_count: int = 5

    status: str = "draft"



class CampaignOut(BaseModel):

    id: int

    business: str

    category: str

    goal: str

    platform: str

    posts_count: int

    status: str

    created_at: datetime


    class Config:

        from_attributes = True
# ==================================================
# HEALTH
# ==================================================

@app.get("/api/health")
def health():

    return {

        "status": "ok",

        "service": "BrandSocialNovaAI"

    }



# ==================================================
# POSTS
# ==================================================

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




@app.delete("/api/posts/{post_id}")
def delete_post(

    post_id:int,

    db:Session = Depends(get_db)

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





# ==================================================
# AI CONTENT GENERATOR
# ==================================================

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


الهدف:
{payload.goal}


نوع المنشور:
{payload.post_type}


المنصة:
{payload.platform}


اكتب منشور تسويقي احترافي للسوشيال ميديا.

"""


    try:

        result = ai_generate_content(prompt)


        return GenerateResponse(

            title=result["title"],

            content=result["content"],

            image=""

        )


    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )





# ==================================================
# PROMPT GENERATOR
# ==================================================

@app.post("/api/generate-prompt")
def generate_prompt(

    payload: PromptRequest

):

    try:

        result = generate_image_prompt(

            payload.business,

            payload.category,

            payload.goal,

            payload.style

        )


        return result


    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )





# ==================================================
# PROMPT HISTORY
# ==================================================

@app.post("/api/save-prompt")
def save_prompt(

    payload: SavePromptRequest,

    db: Session = Depends(get_db)

):

    prompt = PromptHistory(

        business=payload.business,

        category=payload.category,

        goal=payload.goal,

        style=payload.style,

        arabic_prompt=payload.arabic_prompt,

        english_prompt=payload.english_prompt

    )


    db.add(prompt)

    db.commit()

    db.refresh(prompt)


    return {

        "message":"Prompt saved successfully",

        "id":prompt.id

    }




@app.get("/api/prompts")
def get_prompts(

    db:Session = Depends(get_db)

):

    return (

        db.query(PromptHistory)

        .order_by(
            PromptHistory.created_at.desc()
        )

        .all()

    )




@app.delete("/api/prompts/{prompt_id}")
def delete_prompt(

    prompt_id:int,

    db:Session = Depends(get_db)

):

    prompt = (

        db.query(PromptHistory)

        .filter(
            PromptHistory.id == prompt_id
        )

        .first()

    )


    if not prompt:

        raise HTTPException(

            status_code=404,

            detail="Prompt not found"

        )


    db.delete(prompt)

    db.commit()


    return {

        "deleted":True

    }
# ==================================================
# AI IMAGE GENERATOR
# ==================================================

@app.post("/api/generate-ai-image")
def generate_ai_image_api(

    payload: ImageGenerateRequest

):

    try:

        image_path = openai_generate_image(

            payload.prompt

        )


        image_name = os.path.basename(

            image_path

        )


        return {

            "image": f"/images/{image_name}"

        }


    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )





# ==================================================
# CAMPAIGNS
# ==================================================

@app.get(
    "/api/campaigns",
    response_model=list[CampaignOut]
)
def get_campaigns(

    db:Session = Depends(get_db)

):

    return (

        db.query(Campaign)

        .order_by(

            Campaign.created_at.desc()

        )

        .all()

    )





@app.post(
    "/api/campaigns",
    response_model=CampaignOut
)
def create_campaign(

    payload:CampaignCreate,

    db:Session = Depends(get_db)

):

    campaign = Campaign(

        business=payload.business,

        category=payload.category,

        goal=payload.goal,

        platform=payload.platform,

        posts_count=payload.posts_count,

        status=payload.status

    )


    db.add(campaign)

    db.commit()

    db.refresh(campaign)


    return campaign





@app.post("/api/campaigns/{campaign_id}/generate")
def generate_campaign(

    campaign_id:int,

    db:Session = Depends(get_db)

):

    campaign = (

        db.query(Campaign)

        .filter(

            Campaign.id == campaign_id

        )

        .first()

    )


    if not campaign:

        raise HTTPException(

            status_code=404,

            detail="Campaign not found"

        )


    types = [

        "منشور تعريفي",

        "منشور ثقة",

        "عرض خاص",

        "منشور تفاعلي",

        "نصيحة تسويقية"

    ]


    created=[]


    for item in types:


        result = ai_generate_content(

            f"""

النشاط:
{campaign.business}


المجال:
{campaign.category}


الهدف:
{campaign.goal}


نوع المنشور:
{item}

"""

        )


        post = Post(

            title=result["title"],

            content=result["content"],

            platform=campaign.platform,

            status="draft"

        )


        db.add(post)

        db.commit()

        db.refresh(post)


        created.append({

            "id":post.id,

            "title":post.title

        })


    return {

        "campaign":campaign.business,

        "count":len(created),

        "posts":created

    }





# ==================================================
# ANALYTICS
# ==================================================

@app.get("/api/analytics")
def analytics(

    db:Session = Depends(get_db)

):

    return {

        "total_posts":

        db.query(func.count(Post.id))

        .scalar() or 0,


        "published_posts":

        db.query(func.count(Post.id))

        .filter(

            Post.status=="published"

        )

        .scalar() or 0,


        "total_likes":

        db.query(func.sum(Post.likes))

        .scalar() or 0,


        "total_comments":

        db.query(func.sum(Post.comments))

        .scalar() or 0,


        "total_shares":

        db.query(func.sum(Post.shares))

        .scalar() or 0

    }





# ==================================================
# CONTENT PLANNER
# ==================================================

class ContentPlanRequest(BaseModel):

    business:str

    category:str

    goal:str

    days:int = 30





@app.post("/api/content-plan")
def create_content_plan(

    payload:ContentPlanRequest

):

    plan=[]


    types=[

        "منشور تعريفي",

        "بناء ثقة",

        "عرض خاص",

        "تفاعلي",

        "نصيحة"

    ]


    for day in range(1,payload.days+1):

        plan.append({

            "day":day,

            "type":types[day % len(types)],

            "title":

            f"{payload.business} - منشور اليوم {day}",

            "content":

            "محتوى تسويقي جاهز للنشر"

        })


    return {

        "business":payload.business,

        "days":payload.days,

        "plan":plan

    }





class SavePlanRequest(BaseModel):

    business:str

    plan:list





@app.post("/api/content-plan/save")
def save_content_plan(

    payload:SavePlanRequest,

    db:Session=Depends(get_db)

):

    for item in payload.plan:


        content=ContentPlan(

            business=payload.business,

            day=item["day"],

            content_type=item["type"],

            title=item["title"],

            content=item["content"]

        )


        db.add(content)


    db.commit()


    return {

        "message":"Content plan saved",

        "count":len(payload.plan)

    }





# ==================================================
# CALENDAR
# ==================================================

@app.get("/api/calendar")
def get_calendar(

    db:Session=Depends(get_db)

):

    return (

        db.query(ContentPlan)

        .order_by(

            ContentPlan.day.asc()

        )

        .all()

    )





# ==================================================
# ROOT
# ==================================================

@app.get("/")
def root():

    return {

        "message":

        "BrandSocialNovaAI API Running",

        "docs":

        "/docs"

    }