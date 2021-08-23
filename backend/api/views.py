from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,viewsets
from .models import Project,Row
from .serializers import RowSerializer,ProjectSerializer,UserSerializer
from django.http import Http404
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from rest_framework import exceptions
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import ensure_csrf_cookie
from .auth import generate_access_token, generate_refresh_token
from django.views.decorators.csrf import csrf_protect
import jwt
from django.conf import settings
# Create your views here.
def index(request):
	pass
@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def login_view(request):
	User=get_user_model()
	username=request.data.get('username')
	password=request.data.get('password')
	response=Response()
	if(username is None) or (password is None):
		raise exceptions.AuthenticationFailed(
            'username and password required')
	user=User.objects.filter(username=username).first()
	if(user is None):
		raise exceptions.AuthenticationFailed('user not found')
	if(not user.check_password(password)):
		raise exceptions.AuthenticationFailed('wrong password')

	serialized_user = UserSerializer(user).data
	access_token=generate_access_token(user)
	refresh_token=generate_refresh_token(user)

	response.set_cookie(key='refreshtoken',value=refresh_token,httponly=True,samesite=None)
	response.data={
	'access_token':access_token,
	'user':serialized_user,
	}
	return response

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_protect
def refresh_token_view(request):
	User=get_user_model()
	refresh_token=request.COOKIES.get('refreshtoken')
	if refresh_token is None:
		raise exceptions.AuthenticationFailed('Authentication credentials were not provided.')
		response=Response()
		response.data={
		"message":"not logged in"
		}
		return response
	try:
		payload=jwt.decode(refresh_token,settings.SECRET_KEY,algorithms=['HS256'])
	except jwt.ExpiredSignatureError:
		raise exceptions.AuthenticationFailed('Refresh token expired please login again')

	user=User.objects.filter(id=payload.get('user_id')).first()
	if user is None:
		raise exceptions.AuthenticationFailed('user not found')
	if not user.is_active:
		raise exceptions.AuthenticationFailed('user not active')

	access_token=generate_access_token(user)
	return Response({'access_token':access_token})
@api_view(['POST'])
@permission_classes([AllowAny])
def logout(request):
        if request.COOKIES.get('refreshtoken'):
        	cookie=request.COOKIES.get('refreshtoken')
        	response=Response()
        	response.delete_cookie('refreshtoken')
        	response.delete_cookie('sessionid')
        	response.delete_cookie('csrftoken')
        	response.data = {
            'message': 'Logged out'
        		}
        	return response
        else:
        	return Response('not logged in')
class ProjectList(APIView):
	def get(self,request):
		projects=Project.objects.filter(owner=request.user)
		serializer=ProjectSerializer(projects,many=True)
		return Response(serializer.data)
	def post(self,request):
		serializer=ProjectSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save(owner=request.user)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class RowView(APIView):
	def get_object(self,user,pk):
		try:
			project= Project.objects.get(pk=pk)
			if project.owner ==user.id:
				return Project.objects.get(pk=pk)
			else:
				Response('dont owner this project')
		except Project.DoesNotExist:
			raise Http404
	def post(self,request,pk):
		try:
			project= Project.objects.get(id=pk)
			print(project.owner.id==request.user.id)
			if project.owner ==request.user:
					project=Project.objects.get(pk=pk)
			else:
				return Response('dont owner this project')
		except Project.DoesNotExist:
			raise Http404
		serializer=RowSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save(project=project)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class RowDeleteGetUpdate(APIView):
	def get(self,request,pk):
		try:
			row= Row.objects.get(pk=pk)
			print(row.project.owner,request.user)
			if row.project.owner ==request.user:
					row= Row.objects.get(pk=pk)
					serializer=RowSerializer(row)
					return Response(serializer.data)
			else:
				return Response('dont owner this project')
		except Row.DoesNotExist:
			raise Http404

	def post(self,request,pk):
		try:
			row= Row.objects.get(pk=pk)
			
			if row.project.owner ==request.user:
					row= Row.objects.get(pk=pk)
					serializer=RowSerializer(row,data=request.data)
					if serializer.is_valid():
						serializer.save()
						return Response(serializer.data, status=status.HTTP_201_CREATED)
					else:
						return Response(serializer.errors)
			else:
				return Response('dont owner this project')
		except Row.DoesNotExist:
			raise Http404

	def delete(self,request,pk):
		try:
			row= Row.objects.get(pk=pk)
			
			if row.project.owner ==request.user:
					row= Row.objects.get(pk=pk)
					row.delete()
					return Response('Deleted')
			else:
				return Response('dont owner this project')
		except Row.DoesNotExist:
			raise Http404