from rest_framework import serializers
from backend.api.models import Customer, Machine, Usage, Maintenance, Expense
from django.contrib.auth.hashers import make_password

from rest_framework import serializers
from .models import Machine
from .models import Customer

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'


# ✅ 1. Serializer สำหรับลูกค้า
class CustomerSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Customer
        fields = '__all__'  # ใช้ทุกฟิลด์
        extra_kwargs = {
            'password': {'write_only': True}  # ซ่อน password
        }

    def create(self, validated_data):
        """ แฮชรหัสผ่านก่อนบันทึก """
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        """ อัปเดตข้อมูลลูกค้า """
        for attr, value in validated_data.items():
            if attr == "password":  
                value = make_password(value)  # แฮชรหัสผ่านถ้ามีการเปลี่ยน
            setattr(instance, attr, value)  # อัปเดตค่าทุกฟิลด์
        instance.save()
        return instance

    def to_representation(self, instance):
        """ แปลง NaN เป็น None """
        data = super().to_representation(instance)
        for key, value in data.items():
            if value != value:  # Python: NaN != NaN เสมอ
                data[key] = None
        return data
    
    
    

# ✅ 2. Serializer สำหรับเครื่องซักผ้า
class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'  # เอาทุกฟิลด์มาใช้

        
# ✅ 3. Serializer สำหรับการใช้งานเครื่อง
class UsageSerializer(serializers.ModelSerializer):
    wash_machine = MachineSerializer(read_only=True)
    wash_machine_id = serializers.PrimaryKeyRelatedField(
        queryset=Machine.objects.all(), source='wash_machine', write_only=True, allow_null=True
    )
    dry_machine = MachineSerializer(read_only=True)
    dry_machine_id = serializers.PrimaryKeyRelatedField(
        queryset=Machine.objects.all(), source='dry_machine', write_only=True, allow_null=True
    )

    class Meta:
        model = Usage
        fields = ['usage_id', 'wash_machine', 'wash_machine_id', 'dry_machine', 'dry_machine_id', 'usage_date', 'usage_time', 'wash_count', 'dry_count', 'usage_fee']

# ✅ 4. Serializer สำหรับการซ่อมบำรุง
class MaintenanceSerializer(serializers.ModelSerializer):
    machine = MachineSerializer(read_only=True)
    machine_id = serializers.PrimaryKeyRelatedField(
        queryset=Machine.objects.all(), source='machine', write_only=True
    )

    class Meta:
        model = Maintenance
        fields = ['maintenance_id', 'machine', 'machine_id', 'maintenance_date', 'maintenance_fee', 'maintenance_note']

# ✅ 5. Serializer สำหรับค่าใช้จ่าย
class ExpenseSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.all(), source='customer', write_only=True
    )

    class Meta:
        model = Expense
        fields = ['expense_id', 'expense_type', 'expense_date', 'amount', 'description', 'customer', 'customer_id']


