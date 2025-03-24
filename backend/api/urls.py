from django.urls import path
from backend.api.views import signup, login_view, add_machine, add_usage, get_usages, add_maintenance, get_maintenances
from .views import signup, login_view, logout_view, get_home_data, get_customer_by_id, user_info, MachineListCreateView

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("signup/", signup, name="signup"),  # ✅ สมัครสมาชิก
    path("login/", login_view, name="login"),  # ✅ ล็อกอิน
    path("logout/", logout_view, name="logout"),  # ✅ ล็อกเอาท์
    path("home/<int:customer_id>/", get_home_data, name="get_home_data"),  # ✅ ดึงข้อมูล home ตาม CustomerID
    path("customers/<int:customer_id>/", get_customer_by_id, name="get_customer_by_id"),  # ✅ ดึงข้อมูลลูกค้า
    path("user-info/<int:customer_id>/", user_info, name="user_info"),

    path('machines/', MachineListCreateView.as_view(), name='machine-list-create'),  # ✅ ดึงเครื่องซักผ้าของลูกค้าคนนั้น
    path("add_machine/", add_machine, name="add_machine"),


    # path('machines/', add_machine, name='add_machine'),
    # path('machines/list/', get_machines, name='get_machines'),
    path('usage/', add_usage, name='add_usage'),
    path('usage/list/', get_usages, name='get_usages'),
    path('maintenance/', add_maintenance, name='add_maintenance'),
    path('maintenance/list/', get_maintenances, name='get_maintenances'),



]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


