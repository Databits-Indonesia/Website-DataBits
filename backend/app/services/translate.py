from googletrans import Translator

translator = Translator()

class Translate:
    async def detect_language(self, text):
        detected = await translator.detect(text)
        return detected.lang
    
    async def translate_language(self, text, target="en"):
        result = await translator.translate(text, dest=target)
        return result.text