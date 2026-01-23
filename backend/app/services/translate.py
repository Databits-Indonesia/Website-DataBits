from googletrans import Translator
import asyncio

translator = Translator()

async def detect_language(text):
    detected = await translator.detect(text)
    return detected.lang

async def translate_language(text, target="en"):
    result = await translator.translate(text, dest=target)
    return result.text

async def translate(data, target_lang):
    langs = await asyncio.gather(*(detect_language(i) for i in data))
    if not all(lang == target_lang for lang in langs):
        data = await asyncio.gather(*(translate_language(i, target=target_lang) for i in data))
        return data
    else:
        return data