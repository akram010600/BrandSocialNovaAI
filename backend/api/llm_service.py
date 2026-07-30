import os
import requests

from dotenv import load_dotenv


load_dotenv()


GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY"
)


GROQ_URL = (
    "https://api.groq.com/openai/v1/chat/completions"
)



def ask_ai(prompt: str):

    """
    الاتصال بـ Groq AI
    """

    if not GROQ_API_KEY:

        raise Exception(
            "GROQ_API_KEY missing"
        )



    headers = {

        "Authorization":
        f"Bearer {GROQ_API_KEY}",

        "Content-Type":
        "application/json"

    }



    payload = {

        "model":
        "llama-3.1-8b-instant",

        "messages":

        [

            {

                "role":
                "system",

                "content":
                "أنت خبير تسويق رقمي متخصص في صناعة محتوى السوشيال ميديا."

            },


            {

                "role":
                "user",

                "content":
                prompt

            }

        ],


        "temperature":
        0.7,


        "max_tokens":
        1000

    }



    try:


        response = requests.post(

            GROQ_URL,

            headers=headers,

            json=payload,

            timeout=30

        )



        if response.status_code != 200:

            raise Exception(

                f"Groq Error: {response.text}"

            )



        data = response.json()



        return (

            data
            .get("choices")[0]
            .get("message")
            .get("content")

        )



    except requests.exceptions.Timeout:


        raise Exception(
            "Groq timeout after 30 seconds"
        )



    except requests.exceptions.ConnectionError:


        raise Exception(
            "Cannot connect to Groq server"
        )



    except Exception as e:


        raise Exception(
            str(e)
        )