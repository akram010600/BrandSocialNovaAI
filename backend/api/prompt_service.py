def generate_image_prompt(
    business,
    category,
    goal,
    style
):

    arabic_prompt = f"""
صمم منشور سوشيال ميديا احترافي لنشاط:

{business}

المجال:
{category}

الهدف التسويقي:
{goal}

أسلوب التصميم:
{style}


المطلوب:

- تصميم إعلاني احترافي مناسب للسوشيال ميديا.
- استخدام ألوان متناسقة مع المجال.
- إضافة عناصر بصرية مرتبطة بالنشاط.
- عنوان واضح وجذاب.
- ترتيب احترافي للنصوص.
- تصميم مناسب للفيسبوك والانستغرام.
- جودة عالية.
- مظهر عصري مثل تصاميم Canva Pro.
- إضاءة احترافية وتفاصيل واضحة.
"""


    english_prompt = f"""
Create a professional social media post design for:

Business:
{business}

Category:
{category}

Marketing goal:
{goal}

Design style:
{style}


Requirements:

- Professional advertising design.
- Modern social media layout.
- Use colors suitable for the industry.
- Add relevant visual elements.
- Clear attractive headline.
- Premium marketing style.
- Suitable for Facebook and Instagram.
- High quality.
- Professional lighting.
- Clean typography.
- Canva Pro style design.
"""


    return {

        "arabic_prompt": arabic_prompt.strip(),

        "english_prompt": english_prompt.strip()

    }