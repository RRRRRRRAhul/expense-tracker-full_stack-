from django.urls import path
from expense.views import *

urlpatterns = [
    path('expenses/', ExpenseData.as_view()),
    path('expenses/<int:pk>/', ExpeneseDetails.as_view()),

    path('categories/', CategoryData.as_view()),
    path('categories/<int:pk>/', CategoryDetails.as_view()),
]

    
