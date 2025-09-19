from django import forms
from .models import Memorial

class MemorialForm(forms.ModelForm):
    class Meta:
        model = Memorial
        fields = ['name', 'birth_date', 'death_date', 'photo', 'memory_text', 'card_type']
        widgets = {
            'birth_date': forms.DateInput(attrs={'type': 'date'}),
            'death_date': forms.DateInput(attrs={'type': 'date'}),
        }
