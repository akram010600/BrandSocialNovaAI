from sqlalchemy import (
    create_engine,
    Column,
    Integer,
    String,
    DateTime,
    Text
)

from sqlalchemy.orm import (
    sessionmaker,
    declarative_base
)

from datetime import datetime



# ==================================================
# DATABASE CONFIG
# ==================================================

DATABASE_URL = "sqlite:///./brandsocialnova.db"


engine = create_engine(

    DATABASE_URL,

    connect_args={
        "check_same_thread": False
    }

)


SessionLocal = sessionmaker(

    autocommit=False,

    autoflush=False,

    bind=engine

)


Base = declarative_base()



# ==================================================
# POSTS TABLE
# ==================================================

class Post(Base):

    __tablename__ = "posts"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    title = Column(
        String,
        nullable=False
    )


    content = Column(
        Text,
        nullable=False
    )


    platform = Column(
        String,
        default="facebook"
    )


    status = Column(
        String,
        default="draft"
    )


    likes = Column(
        Integer,
        default=0
    )


    comments = Column(
        Integer,
        default=0
    )


    shares = Column(
        Integer,
        default=0
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )




# ==================================================
# CAMPAIGNS TABLE
# ==================================================

class Campaign(Base):

    __tablename__ = "campaigns"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    business = Column(
        String,
        nullable=False
    )


    category = Column(
        String,
        default="خدمات"
    )


    goal = Column(
        String,
        default="زيادة العملاء"
    )


    platform = Column(
        String,
        default="facebook"
    )


    posts_count = Column(
        Integer,
        default=0
    )


    status = Column(
        String,
        default="draft"
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )




# ==================================================
# PROMPT HISTORY TABLE
# ==================================================

class PromptHistory(Base):

    __tablename__ = "prompt_history"


    id = Column(

        Integer,

        primary_key=True,

        index=True

    )


    business = Column(

        String,

        nullable=False

    )


    category = Column(

        String,

        default=""

    )


    goal = Column(

        String,

        default=""

    )


    style = Column(

        String,

        default=""

    )


    arabic_prompt = Column(

        Text,

        nullable=False

    )


    english_prompt = Column(

        Text,

        nullable=False

    )


    created_at = Column(

        DateTime,

        default=datetime.utcnow

    )




# ==================================================
# DATABASE FUNCTIONS
# ==================================================
# ================= Content Calendar =================

class ContentPlan(Base):

    __tablename__ = "content_plans"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    business = Column(
        String,
        nullable=False
    )


    day = Column(
        Integer,
        nullable=False
    )


    content_type = Column(
        String,
        default="post"
    )


    title = Column(
        String,
        nullable=False
    )


    content = Column(
        Text,
        nullable=False
    )


    status = Column(
        String,
        default="scheduled"
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

def init_db():

    Base.metadata.create_all(

        bind=engine

    )




def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()