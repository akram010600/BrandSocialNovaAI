import os
import uuid
import base64

from openai import OpenAI
from dotenv import load_dotenv


load_dotenv()


client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


IMAGE_FOLDER = "generated_images"


def generate_ai_image(prompt):

    os.makedirs(
        IMAGE_FOLDER,
        exist_ok=True
    )


    response = client.images.generate(

        model="gpt-image-1",

        prompt=prompt,

        size="1024x1024",

        quality="high"

    )


    image_base64 = response.data[0].b64_json


    image_name = f"{uuid.uuid4()}.png"


    image_path = os.path.join(

        IMAGE_FOLDER,

        image_name

    )


    image_bytes = base64.b64decode(
        image_base64
    )


    with open(
        image_path,
        "wb"
    ) as file:

        file.write(image_bytes)


    return image_path