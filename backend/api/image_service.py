import os
import uuid

from openai import OpenAI
from dotenv import load_dotenv


# تحميل المتغيرات
load_dotenv()


# OpenAI Client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


IMAGE_FOLDER = "generated_images"


os.makedirs(
    IMAGE_FOLDER,
    exist_ok=True
)



def create_post_image(
    title,
    content
):

    prompt = f"""

Create a professional social media marketing image.

Business title:
{title}


Content:
{content}


Design requirements:

- Premium advertising design.
- Modern social media post.
- Suitable for Facebook and Instagram.
- Professional marketing layout.
- High quality.
- Realistic images.
- Beautiful lighting.
- Attractive colors.
- No spelling mistakes.
- Leave clean space for text.
- Canva Pro style.
- 1080x1080 square design.

"""


    try:


        response = client.images.generate(

            model="gpt-image-1",

            prompt=prompt,

            size="1024x1024"

        )



        image_url = response.data[0].url



        import requests


        image_data = requests.get(
            image_url
        ).content



        filename = (
            f"{uuid.uuid4()}.png"
        )



        path = os.path.join(

            IMAGE_FOLDER,

            filename

        )



        with open(
            path,
            "wb"
        ) as file:

            file.write(
                image_data
            )



        return path



    except Exception as e:


        raise Exception(

            f"Image generation error: {str(e)}"

        )