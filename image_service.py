from PIL import Image, ImageDraw, ImageFont
import os
import uuid


def create_post_image(title, content):

    folder = "generated_images"

    if not os.path.exists(folder):
        os.makedirs(folder)


    filename = f"{uuid.uuid4()}.png"

    path = os.path.join(folder, filename)


    img = Image.new(
        "RGB",
        (1080,1080),
        "white"
    )


    draw = ImageDraw.Draw(img)


    try:
        font_title = ImageFont.truetype(
            "arial.ttf",
            70
        )

        font_text = ImageFont.truetype(
            "arial.ttf",
            40
        )

    except:

        font_title = None
        font_text = None



    draw.text(
        (80,100),
        title,
        fill="black",
        font=font_title
    )


    draw.text(
        (80,250),
        content[:300],
        fill="black",
        font=font_text
    )


    img.save(path)


    return path