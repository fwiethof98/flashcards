from django import forms
from .models import Card

from django.conf import settings

MAX_TEXT_LENGTH = settings.MAX_TEXT_LENGTH


class CardForm(forms.ModelForm):
    class Meta:
        model = Card
        fields = ['question', 'answer']

    def clean_question(self):
        question = self.cleaned_data.get("question")
        if len(question) > MAX_TEXT_LENGTH:
            raise forms.ValidationError("This text is too long.")
        return question

    def clean_answer(self):
        answer = self.cleaned_data.get("answer")
        if len(answer) > MAX_TEXT_LENGTH:
            raise forms.ValidationError("This text is too long.")
        return answer
