from django.contrib import admin
from expense.models import *

# Register your models here.
@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'amount', 'date']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']