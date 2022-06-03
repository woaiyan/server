from django import forms
from .models import File


class FileUploadModelForm(forms.ModelForm):
    class Meta:
        model = File
        fields = '__all__'
        widgets = {
            'file': forms.ClearableFileInput(attrs={'class': 'form-control'}),
        }
