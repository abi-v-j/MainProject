from django.db import models

from django.utils.timezone import now

class tbl_district(models.Model):
    district_name=models.CharField(max_length=50)

class tbl_category(models.Model):
    category_name=models.CharField(max_length=50)

class tbl_admin(models.Model):
    admin_name=models.CharField(max_length=40)
    admin_email=models.CharField(max_length=60)
    admin_password=models.CharField(max_length=15)

class tbl_place(models.Model):
    place_name=models.CharField(max_length=50)
    district=models.ForeignKey(tbl_district,on_delete=models.CASCADE)

class tbl_user(models.Model):
    user_name=models.CharField(max_length=50)
    user_email=models.CharField(max_length=30)
    user_contact=models.CharField(max_length=10)
    user_headline=models.CharField(max_length=70)
    user_biography=models.CharField(max_length=900)
    user_photo=models.FileField(upload_to="Assets/user/")
    user_password=models.CharField(max_length=15)
    user_securityQuestion=models.CharField(max_length=100)
    user_securityAnswer=models.CharField(max_length=100)
    user_gender=models.CharField(max_length=20)

class tbl_subcategory(models.Model):
    subcategory_name=models.CharField(max_length=50)
    category=models.ForeignKey(tbl_category,on_delete=models.CASCADE)

class tbl_brand(models.Model):
    brand_name=models.CharField(max_length=50)

class tbl_type(models.Model):
    type_name=models.CharField(max_length=60)

class tbl_instructor(models.Model):
    instructor_name = models.CharField(max_length=40)
    instructor_email = models.CharField(max_length=90)
    instructor_password = models.CharField(max_length=10)
    instructor_contact = models.CharField(max_length=10)
    instructor_headline = models.CharField(max_length=40)
    instructor_photo = models.FileField(upload_to="Assets/user/")
    instructor_biography = models.CharField(max_length=900)
    instructor_Qualification = models.CharField(max_length=400)
    instructor_field = models.CharField(max_length=40)
    instructor_proof = models.FileField(upload_to="Assets/user/")
    instructor_securityQuestion = models.CharField(max_length=100)
    instructor_securityAnswer = models.CharField(max_length=100)
    instructor_gender = models.CharField(max_length=20)

    # 🔹 STATUS
    instructor_status = models.IntegerField(default=0)
    # 0 = Pending
    # 1 = Accepted
    # 2 = Rejected

class tbl_topic(models.Model):
    topic_name=models.CharField(max_length=40)
    subcategory=models.ForeignKey(tbl_subcategory,on_delete=models.CASCADE)


class tbl_course(models.Model):
    course_title = models.CharField(max_length=60)
    course_desc = models.CharField(max_length=100)
    course_date = models.DateField(default=now)  # ✅ AUTO DATE
    course_price = models.CharField(max_length=100)
    course_image = models.FileField(upload_to="Assets/user/")
    course_average = models.CharField(max_length=100)
    course_requerements = models.CharField(max_length=100)
    topic = models.ForeignKey(tbl_topic, on_delete=models.CASCADE)
    instructor = models.ForeignKey(tbl_instructor, on_delete=models.CASCADE)

class tbl_section(models.Model):
    section_name=models.CharField(max_length=80)
    course=models.ForeignKey(tbl_course,on_delete=models.CASCADE)

class tbl_material(models.Model):
    material_title=models.CharField(max_length=80)
    material_desc=models.CharField(max_length=100)
    material_file=models.FileField(upload_to="Assets/user/")
    section=models.ForeignKey(tbl_section,on_delete=models.CASCADE)

class tbl_purchasecourse(models.Model):
    purchase_date=models.CharField(max_length=30)
    course=models.ForeignKey(tbl_course,on_delete=models.CASCADE)
    user=models.ForeignKey(tbl_user,on_delete=models.CASCADE)

class tbl_report(models.Model):
    report_issuetype=models.CharField(max_length=100)
    report_issuedesc=models.CharField(max_length=500)
    course=models.ForeignKey(tbl_course,on_delete=models.CASCADE)
    user=models.ForeignKey(tbl_user,on_delete=models.CASCADE)

class tbl_certificate(models.Model):
    certificate_issuedate=models.CharField(max_length=30)
    user=models.ForeignKey(tbl_user,on_delete=models.CASCADE)
    course=models.ForeignKey(tbl_course,on_delete=models.CASCADE)

class tbl_chat(models.Model):
    chat_content=models.CharField(max_length=100)
    chat_date=models.CharField(max_length=30)
    course=models.ForeignKey(tbl_course,on_delete=models.CASCADE)
    user=models.ForeignKey(tbl_user,on_delete=models.CASCADE)

class tbl_comment(models.Model):
    comment_content=models.CharField(max_length=300)
    material=models.ForeignKey(tbl_material,on_delete=models.CASCADE)
    user=models.ForeignKey(tbl_user,on_delete=models.CASCADE)

class tbl_review(models.Model):
    review_title=models.CharField(max_length=100)
    review_content=models.CharField(max_length=200)
    review_date=models.CharField(max_length=30)
    review_rating=models.CharField(max_length=20)
    user=models.ForeignKey(tbl_user,on_delete=models.CASCADE)
    course=models.ForeignKey(tbl_course,on_delete=models.CASCADE)

class tbl_wishlist(models.Model):
    course=models.ForeignKey(tbl_course,on_delete=models.CASCADE)
    user=models.ForeignKey(tbl_user,on_delete=models.CASCADE)

class tbl_cart(models.Model):
    cart_status=models.CharField(max_length=90)
    course=models.ForeignKey(tbl_course,on_delete=models.CASCADE)

class tbl_progress(models.Model):
    progress_materialprogress=models.CharField(max_length=500)
    progress_materialindex=models.CharField(max_length=500)
    user=models.ForeignKey(tbl_user,on_delete=models.CASCADE)
    course=models.ForeignKey(tbl_course,on_delete=models.CASCADE)

class tbl_links(models.Model):
    facebook_link=models.CharField(max_length=100)
    twitter_link=models.CharField(max_length=100)
    instagram_link=models.CharField(max_length=100)
    linkedin_link=models.CharField(max_length=100)
    user=models.ForeignKey(tbl_user,on_delete=models.CASCADE)

class tbl_complaent(models.Model):
    complaent_title=models.CharField(max_length=300)
    complaent_content=models.CharField(max_length=300)
    complaent_date=models.CharField(max_length=70)
    complaent_reply=models.CharField(max_length=300,null=True)
    complaent_status=models.CharField(max_length=300)
    user=models.ForeignKey(tbl_user,on_delete=models.CASCADE)

class tbl_feedback(models.Model):
    feedback_content=models.CharField(max_length=300)
    feedback_date=models.CharField(max_length=300)
    user=models.ForeignKey(tbl_user,on_delete=models.CASCADE)







    

    










   







