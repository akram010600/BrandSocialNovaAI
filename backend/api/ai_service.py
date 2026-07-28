import random
import re

from content_templates import CONTENT_TEMPLATES



def detect_category(text: str):

    text = text.lower()


    if any(word in text for word in [
        "مدرسة",
        "تعليم",
        "طالب",
        "طلاب",
        "دراسة",
        "أكاديمية",
        "معهد"
    ]):
        return "تعليم"



    if any(word in text for word in [
        "حضانة",
        "طفل",
        "أطفال",
        "رعاية",
        "كي جي"
    ]):
        return "حضانة"



    if any(word in text for word in [
        "مطعم",
        "مطاعم",
        "وجبة",
        "طعام",
        "سندوتش",
        "أكل"
    ]):
        return "مطاعم"



    if any(word in text for word in [
        "عقار",
        "شقة",
        "فيلا",
        "تشطيب",
        "بيع",
        "شراء"
    ]):
        return "عقارات"



    return "خدمات"





def extract_brand_name(prompt: str):


    brand = prompt



    # دعم النظام القديم
    if "الموضوع:" in brand:

        brand = brand.split("الموضوع:")[1]



    # دعم النظام الجديد V2

    if "اسم النشاط:" in brand:

        brand = brand.split("اسم النشاط:")[1]



    # حذف باقي بيانات الحملة

    for key in [
        "المجال:",
        "الهدف التسويقي:",
        "نوع المنشور:",
        "المنصة:",
        "الأسلوب:",
        "المطلوب:",
        "أنشئ",
        "أنت خبير"
    ]:


        if key in brand:

            brand = brand.split(key)[0]



    # تنظيف

    brand = brand.strip()



    # أخذ أول سطر فقط

    lines = brand.splitlines()


    if lines:

        brand = lines[0].strip()



    return brand or "علامتك التجارية"







def generate_content(prompt: str):


    category = detect_category(prompt)


    brand = extract_brand_name(prompt)



    template = CONTENT_TEMPLATES.get(
        category,
        CONTENT_TEMPLATES["خدمات"]
    )



    title = random.choice(
        template.get(
            "titles",
            ["أفضل اختيار لك"]
        )
    )



    goal = random.choice(
        template.get(
            "goals",
            ["زيادة العملاء"]
        )
    )



    style = template.get(
        "style",
        ""
    )





    content_map = {



        "تعليم": f"""
في {brand} نؤمن أن التعليم هو الاستثمار الحقيقي في المستقبل.

نوفر بيئة تعليمية متطورة تجمع بين المعرفة والمهارات،
مع متابعة مستمرة تساعد الطلاب على تحقيق أفضل النتائج.
""",




        "حضانة": f"""
في {brand} نهتم بأطفالكم ونوفر لهم بيئة آمنة ومحفزة.

رعاية مميزة، تعلم ممتع، وتنمية شاملة تساعد الطفل على النمو بثقة.
""",




        "مطاعم": f"""
استمتع بتجربة طعام مختلفة مع {brand}.

جودة عالية، مذاق مميز، وخدمة تجعل كل زيارة تجربة لا تُنسى.
""",




        "عقارات": f"""
مع {brand} نساعدك في الوصول إلى العقار المناسب.

حلول مدروسة تناسب احتياجات السكن والاستثمار.
""",




        "خدمات": f"""
مع {brand} نقدم حلولاً احترافية تساعدك على تطوير أعمالك وتحقيق أهدافك.
"""

    }




    content = f"""
{title}


{content_map.get(category)}



✨ الهدف:
{goal}


📌 أسلوب العلامة:
{style}



✅ جودة عالية
✅ خدمة احترافية
✅ حلول تناسب احتياجات العملاء



📲 تواصل معنا الآن واحصل على أفضل تجربة.


#تسويق_رقمي
#{category}
#BrandSocialNovaAI
"""



    return {

        "title": title,

        "content": content.strip()

    }