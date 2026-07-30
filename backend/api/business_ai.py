import json

from llm_service import ask_ai



def clean_json_response(text: str):

    """
    استخراج JSON من رد الذكاء الاصطناعي
    """

    try:

        start = text.find("{")
        end = text.rfind("}") + 1


        if start == -1 or end == 0:
            return None


        return json.loads(
            text[start:end]
        )


    except Exception as e:

        print("JSON ERROR:", e)

        return None





def analyze_business(
    business: str,
    category: str = "",
    goal: str = ""
) -> dict:


    prompt = f"""

أنت خبير تسويق عالمي وتحليل أعمال.

حلل النشاط التجاري التالي:

اسم النشاط:
{business}


المجال:
{category}


الهدف:
{goal}



اعتمد على اسم النشاط حتى لو كان المجال فارغاً.

حدد:

- المجال الحقيقي للنشاط.
- نوع النشاط.
- العملاء المستهدفين.
- أسلوب التسويق.
- نبرة المحتوى.
- استراتيجية زيادة المبيعات.
- هاشتاجات مناسبة.



أرجع JSON فقط بدون شرح:

{{
"industry":"",
"business_type":"",
"target_audience":"",
"marketing_style":"",
"content_tone":"",
"content_strategy":"",
"hashtags":[]
}}

"""


    try:

        print("🔍 Business Analysis:", business)


        response = ask_ai(prompt)


        print("🤖 Groq Response:")
        print(response)



        data = clean_json_response(response)


        if data:

            return data



    except Exception as e:

        print(
            "Business Analysis Error:",
            e
        )



    # حالة فشل الذكاء الاصطناعي

    return {

        "industry":
        category if category else "نشاط تجاري",


        "business_type":
        "متجر أو شركة",


        "target_audience":
        "العملاء المحتملون",


        "marketing_style":
        "احترافي",


        "content_tone":
        "ودي",


        "content_strategy":
        "زيادة العملاء والمبيعات",


        "hashtags":
        [
            "#BrandSocialNovaAI"
        ]

    }