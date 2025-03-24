# models.py
from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# ✅ 1. โมเดลลูกค้า
class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    Laundry_name = models.CharField(max_length=100, blank=True, null=True)
    Owner_name = models.CharField(max_length=100, blank=True, null=True)
    Registration_number = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    telephone = models.CharField(max_length=15, blank=True, null=True)
    password = models.CharField(max_length=128)
    photo = models.ImageField(upload_to='profiles/', null=True, blank=True, default='profiles/default-profile.jpg')

    def save(self, *args, **kwargs):
        """ แฮชรหัสผ่านก่อนบันทึก ถ้ามีการเปลี่ยนแปลง """
        if self.pk:
            existing = Customer.objects.get(pk=self.pk)
            if existing.password != self.password:
                self.password = make_password(self.password)
        else:
            self.password = make_password(self.password)
        super(Customer, self).save(*args, **kwargs)

    def check_password(self, raw_password):
        """ ตรวจสอบรหัสผ่าน """
        return check_password(raw_password, self.password)

    def __str__(self):
        return f'{self.Laundry_name} ({self.Owner_name})'


# ✅ 2. โมเดลเครื่องซักผ้า
class Machine(models.Model):
    machine_id = models.IntegerField(primary_key=True)  # รหัสเครื่อง
    model = models.CharField(max_length=100, blank=True, null=True)  # รุ่นของเครื่อง
    machine_type = models.CharField(max_length=50)  # ประเภท (Washer/Dryer)
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE)  # เจ้าของเครื่อง
    machine_status = models.CharField(max_length=20, default="Active")  # สถานะเครื่อง
    machine_capacity = models.CharField(max_length=50, blank=True, null=True)  # ความจุ (เช่น 7kg)
    price_per_use = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # ราคาต่อครั้ง

    def __str__(self):
        return f"{self.machine_type} - {self.model} ({self.machine_id})"


# ✅ 3. โมเดลการใช้งาน
class Usage(models.Model):
    usage_id = models.AutoField(primary_key=True)
    wash_machine = models.ForeignKey(Machine, on_delete=models.SET_NULL, null=True, blank=True, related_name="wash_usages")
    dry_machine = models.ForeignKey(Machine, on_delete=models.SET_NULL, null=True, blank=True, related_name="dry_usages")
    usage_date = models.DateField()
    usage_time = models.TimeField()
    wash_count = models.IntegerField()
    dry_count = models.IntegerField()
    usage_fee = models.IntegerField()

    def __str__(self):
        return f"Usage on {self.usage_date} - Fee: {self.usage_fee}"


# ✅ 4. โมเดลการซ่อมบำรุง
class Maintenance(models.Model):
    maintenance_id = models.AutoField(primary_key=True)
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE)
    maintenance_date = models.DateField()
    maintenance_fee = models.IntegerField()
    maintenance_note = models.TextField()

    def __str__(self):
        return f"Maintenance {self.maintenance_id} for Machine {self.machine.machine_id}"


# ✅ 5. โมเดลค่าใช้จ่าย
class Expense(models.Model):
    expense_id = models.AutoField(primary_key=True)
    expense_type = models.CharField(max_length=100)
    expense_date = models.DateField()
    amount = models.IntegerField()
    description = models.TextField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.expense_type} - {self.amount}"