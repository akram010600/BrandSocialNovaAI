import random

from content_templates import CONTENT_TEMPLATES


def detect_category(prompt: str):

    prompt = prompt.lower()

    if "مطعم" in prompt or "اكل" in prompt or "طعام" in prompt:
        return "مطاعم"

    if "حضانة" in prompt or "طفل" in prompt:
        return "حضانة"

    if "مدرسة" in prompt or "تعليم" in prompt or "طلاب" in prompt:
        return "تعليم"

    if "عقار" in prompt or "شقة" in prompt or "منزل" in prompt:
        return "عقارات"

    return "خدمات"



def generate_content(prompt: str):

    category = detect_category(prompt)

    template = CONTENT_TEMPLATES.get(
        category,
        CONTENT_TEMPLATES["خدمات"]
    )


    title = random.choice(
        template["titles"]
    )


    goal = random.choice(
        template["goals"]
    )


    style = template["style"]


    content = f"""
{title}

✨ هدفنا:
{goal}

{style}

نقدم لك تجربة مميزة تجمع بين الجودة والاهتمام بالتفاصيل.

✅ جودة عالية
✅ خدمة احترافية
✅ حلول تناسب احتياجاتك

📲 تواصل معنا الآن واحصل على أفضل تجربة.

#تسويق_رقمي
#{category}
#BrandSocialNovaAI
"""


    return {
        "title": title,
        "content": content.strip()
    }