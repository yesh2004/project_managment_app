from rest_framework import serializers
from .models import Project,Row
from django.contrib.auth import get_user_model
class RowSerializer(serializers.ModelSerializer):
	class Meta:
		model=Row 
		fields='__all__'
		extra_kwargs={'project':{'required':False}}
		
class ProjectSerializer(serializers.ModelSerializer):
	rows=RowSerializer(many=True,read_only=True)
	class Meta:
		model=Project
		fields=('id','project_name','owner','date_created','rows')
		extra_kwargs = {'owner': {'required': False}}

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model=get_user_model()
		fields=['id','username','email','first_name','is_active']