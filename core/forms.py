from django import forms
from .models import Memorial

class MemorialForm(forms.ModelForm):
    class Meta:
        model = Memorial
        fields = ['name',  'card_type', 'birth_date', 'death_date', 'photo']
        widgets = {
            'birth_date': forms.DateInput(attrs={'type': 'date'}),
            'death_date': forms.DateInput(attrs={'type': 'date'}),
        }
