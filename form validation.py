# forms.py
from django import forms
from .models import Task

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'description', 'deadline', 'priority']

    def clean_title(self):
        title = self.cleaned_data.get('title')
        if not title:
            raise forms.ValidationError("Title is required.")
        return title

    def clean_priority(self):
        priority = self.cleaned_data.get('priority')
        if priority not in ['low', 'medium', 'high']:
            raise forms.ValidationError("Priority must be low, medium, or high.")
        return priority