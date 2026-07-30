import json

from llm_service import ask_ai
from business_ai import analyze_business



def clean_json(text):

    """
    استخراج JSON من رد الذكاء الاصطناعي
    """

    try:

        start = text.find("{")
        end = text.rfind("}") + 1

        return json.loads(
            text[start:end]
        )

    except:

        return {}





def generate_content(prompt: str):

    """
    إنشاء محتوى تسويقي ذكي لأي نشاط
    """

    try:


        # تحليل النشاط
        business_analysis = analyze_business(
            business=prompt
        )


        industry = business_analysis.get(
            "industry",
            "عام"
        )


        audience = business_analysis.get(
            "target_audience",
            "العملاء المحتملون"
        )


        style = business_analysis.get(
            "marketing_style",
            "احترافي"
        )


        strategy = business_analysis.get(
            "content_strategy",
            "زيادة العملاء والمبيعات"
        )


        ai_prompt=f"""

أنت خبير تسويق رقمي عالمي.

قم بإنشاء منشور إعلاني للسوشيال ميديا.

بيانات النشاط:

المجال:
{industry}

الجمهور المستهدف:
{audience}

أسلوب العلامة:
{style}

الهدف:
{strategy}


القواعد:

- لا تكتب كلام عام.
- اجعل المحتوى خاص بالنشاط.
- استخدم لغة عربية تسويقية.
- أضف عنوان قوي.
- أضف Call To Action.
- أضف هاشتاجات مناسبة.


أرجع JSON فقط:

{{
"title":"",
"content":""
}}

"""


        response = ask_ai(
            ai_prompt
        )


        data = clean_json(
            response
        )


        return {

            "title":
            data.get(
                "title",
                f"اكتشف أفضل ما تقدمه {industry}"
            ),


            "content":
            data.get(
                "content",
                "محتوى تسويقي جاهز للنشر"
            )

        }



    except Exception as e:


        print(
            "AI ERROR:",
            e
        )


        return {

            "title":
            "منشور جديد",


            "content":
            "نقدم لكم خدمات مميزة بجودة عالية وثقة مستمرة."

        }