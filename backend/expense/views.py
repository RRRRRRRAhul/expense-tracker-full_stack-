from expense.serializers import *
from expense.models import *
from rest_framework import generics, permissions
from rest_framework.filters import SearchFilter

# api view for the Expense
from rest_framework import generics, permissions
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend

class ExpenseData(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ExpenseSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    # fields for filtering
    filterset_fields = ['category', 'date']

    # fields for searching
    search_fields = ['title']

    # fields for ordering
    ordering_fields = ['amount', 'date']
    ordering = ['-date']  # default ordering

    def get_queryset(self):
        return Expense.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class ExpeneseDetails(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        # filter data by user
        return Expense.objects.filter(user = self.request.user)

# api view for the cagtegory
class CategoryData(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = CategorySerializer
    filter_backends = [SearchFilter]
    search_fields = ['name']

    def get_queryset(self):
        # find the user to get all of it created catrgory
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # find the user and create a category using the user
        serializer.save(user=self.request.user)



class CategoryDetails(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)