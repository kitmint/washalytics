import pandas as pd

EXCEL_PATH = r"C:\Users\Modmint\Desktop\washalytics\washalytics.xlsx"

def load_excel(sheet_name):
    """ โหลดข้อมูลจาก Excel ตาม sheet ที่ระบุ """
    try:
        df = pd.read_excel(EXCEL_PATH, sheet_name=sheet_name)
        # แปลง NaN เป็นค่าว่าง หรือ None
        df = df.fillna('')  # หรือใช้ df.fillna(0) ถ้าเป็นตัวเลข
        return df
    except Exception as e:
        print(f"Error loading {sheet_name}: {e}")
        return None

def save_excel(df, sheet_name):
    """ บันทึกข้อมูลกลับไปยัง Excel """
    try:
        with pd.ExcelWriter(EXCEL_PATH, mode='a', if_sheet_exists='replace') as writer:
            df.to_excel(writer, sheet_name=sheet_name, index=False)
    except Exception as e:
        print(f"Error saving {sheet_name}: {e}")



def update_excel(sheet_name, column, value):
    try:
        # โหลดไฟล์ Excel
        df = pd.read_excel(EXCEL_PATH, sheet_name=sheet_name)
        
        # อัปเดตข้อมูล (สมมติว่าอัปเดตแค่แถวแรก)
        df.at[0, column] = value

        # เซฟกลับไปที่ไฟล์
        with pd.ExcelWriter(EXCEL_PATH, mode='a', if_sheet_exists='replace') as writer:
            df.to_excel(writer, sheet_name=sheet_name, index=False)

        print(f"✅ Updated {column} in {sheet_name} with {value}")
    except Exception as e:
        print(f"❌ Error updating Excel: {e}")