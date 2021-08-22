from django.urls import path
from . import views
urlpatterns = [
    path('',views.index),
     path('login/',views.login_view,name='login_view'),
      path('refresh/',views.refresh_token_view,name='refresh_token_view'),
      path('logout/',views.logout,name='logout_view'),
    path('project',views.ProjectList.as_view(),name='project_page'),
    path('project/row_add/<int:pk>',views.RowView.as_view(),name='row_add_page'),
    path('row/<int:pk>',views.RowDeleteGetUpdate.as_view(),name='row_get')
]
