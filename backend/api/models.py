from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Project(models.Model):
	project_name=models.CharField(max_length=500)
	owner=models.ForeignKey(User,on_delete=models.CASCADE)
	date_created=models.DateField(auto_now=True)
	def __str__(self):
		return self.project_name
class Row(models.Model):
	priority_choices=(
		("Low","low"),
		("Meduim","meduim"),
		("High","high")
		)
	completed_choices=(
		("Completed","completed"),
		("Inprogress","inprogress"),
		("Not Started","not_started"))
	project=models.ForeignKey(Project,on_delete=models.CASCADE,related_name='rows')
	priority=models.CharField(max_length=50,choices=priority_choices,default="Low")
	task_name=models.CharField(max_length=300)
	assigned_to=models.CharField(max_length=300)
	status=models.CharField(max_length=50,choices=completed_choices,default="Not Started")
	deadline=models.DateField(auto_now=False)
	def __str__(self):
		return self.task_name
