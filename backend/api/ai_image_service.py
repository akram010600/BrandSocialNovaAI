import os
import uuid


def generate_ai_image(prompt: str):

    """
    مولد صور تجريبي مجاني
    """

    folder = "generated_images"

    os.makedirs(
        folder,
        exist_ok=True
    )


    file_name = f"{uuid.uuid4()}.txt"


    file_path = os.path.join(
        folder,
        file_name
    )


    with open(
        file_path,
        "w",
        encoding="utf-8"
    ) as f:

        f.write(
            "IMAGE PROMPT:\n" + prompt
        )


    return "/images/" + file_name