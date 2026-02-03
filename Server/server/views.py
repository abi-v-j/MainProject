import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from server.models import *

def body(request):
    try:
        return json.loads(request.body)
    except:
        return {}

def not_found():
    return JsonResponse({"error": "Not found"}, status=404)

# ---------------- District ----------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def districts(request):
    if request.method == "GET":
        return JsonResponse(list(tbl_district.objects.values()), safe=False)

    tbl_district.objects.create(district_name=body(request)["district_name"])
    return JsonResponse({"message": "District created"}, status=201)

@csrf_exempt
@require_http_methods(["PUT", "DELETE"])
def district_detail(request, id):
    try:
        obj = tbl_district.objects.get(id=id)
    except:
        return not_found()

    if request.method == "PUT":
        obj.district_name = body(request)["district_name"]
        obj.save()
        return JsonResponse({"message": "Updated"})

    obj.delete()
    return JsonResponse({"message": "Deleted"})

# ---------------- Category ----------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def categories(request):
    if request.method == "GET":
        return JsonResponse(list(tbl_category.objects.values()), safe=False)

    tbl_category.objects.create(category_name=body(request)["category_name"])
    return JsonResponse({"message": "Category created"}, status=201)

@csrf_exempt
@require_http_methods(["PUT", "DELETE"])
def category_detail(request, id):
    try:
        obj = tbl_category.objects.get(id=id)
    except:
        return not_found()

    if request.method == "PUT":
        obj.category_name = body(request)["category_name"]
        obj.save()
        return JsonResponse({"message": "Updated"})

    obj.delete()
    return JsonResponse({"message": "Deleted"})

# ---------------- User ----------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def users(request):
    if request.method == "GET":
        return JsonResponse(list(tbl_user.objects.values()), safe=False)

    tbl_user.objects.create(
        user_name=request.POST["name"],
        user_email=request.POST["email"],
        user_password=request.POST["password"],
        user_contact=request.POST["contact"],
        user_headline=request.POST["headline"],
        user_biography=request.POST["biography"],
        user_photo=request.FILES["photo"],
        user_securityQuestion=request.POST["question"],
        user_securityAnswer=request.POST["answer"],
        user_gender=request.POST["gender"]
    )
    return JsonResponse({"message": "User created"}, status=201)

@csrf_exempt
@require_http_methods(["PUT", "DELETE"])
def user_detail(request, id):
    try:
        obj = tbl_user.objects.get(id=id)
    except:
        return not_found()

    if request.method == "PUT":
        for k, v in body(request).items():
            setattr(obj, k, v)
        obj.save()
        return JsonResponse({"message": "Updated"})

    obj.delete()
    return JsonResponse({"message": "Deleted"})

# ---------------- Course ----------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def courses(request):
    if request.method == "GET":
        return JsonResponse(list(tbl_course.objects.values()), safe=False)

    tbl_course.objects.create(
        course_title=request.POST["title"],
        course_desc=request.POST["desc"],
        course_date=request.POST["date"],
        course_price=request.POST["price"],
        course_image=request.FILES["image"],
        course_average=request.POST["average"],
        course_requerements=request.POST["requirements"],
        topic_id=request.POST["topic_id"],
        instructor_id=request.POST["instructor_id"]
    )
    return JsonResponse({"message": "Course created"}, status=201)

@csrf_exempt
@require_http_methods(["PUT", "DELETE"])
def course_detail(request, id):
    try:
        obj = tbl_course.objects.get(id=id)
    except:
        return not_found()

    if request.method == "PUT":
        for k, v in body(request).items():
            setattr(obj, k, v)
        obj.save()
        return JsonResponse({"message": "Updated"})

    obj.delete()
    return JsonResponse({"message": "Deleted"})


# ---------------- SubCategory ----------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def subcategories(request):
    # LIST
    if request.method == "GET":
        return JsonResponse(
            list(tbl_subcategory.objects.values()),
            safe=False
        )

    # CREATE
    data = body(request)
    tbl_subcategory.objects.create(
        subcategory_name=data["subcategory_name"],
        category_id=data["category_id"]
    )
    return JsonResponse({"message": "Subcategory created"}, status=201)


@csrf_exempt
@require_http_methods(["PUT", "DELETE"])
def subcategory_detail(request, id):
    try:
        obj = tbl_subcategory.objects.get(id=id)
    except tbl_subcategory.DoesNotExist:
        return not_found()

    # UPDATE
    if request.method == "PUT":
        data = body(request)
        obj.subcategory_name = data["subcategory_name"]
        obj.category_id = data["category_id"]
        obj.save()
        return JsonResponse({"message": "Subcategory updated"})

    # DELETE
    obj.delete()
    return JsonResponse({"message": "Subcategory deleted"})






# ---------------- Admin ----------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def admins(request):
    if request.method == "GET":
        return JsonResponse(
            list(tbl_admin.objects.values()),
            safe=False
        )

    data = body(request)
    tbl_admin.objects.create(
        admin_name=data["admin_name"],
        admin_email=data["admin_email"],
        admin_password=data["admin_password"]
    )
    return JsonResponse({"message": "Admin created"}, status=201)


@csrf_exempt
@require_http_methods(["PUT", "DELETE"])
def admin_detail(request, id):
    try:
        admin = tbl_admin.objects.get(id=id)
    except tbl_admin.DoesNotExist:
        return not_found()

    if request.method == "PUT":
        data = body(request)
        admin.admin_name = data["admin_name"]
        admin.admin_email = data["admin_email"]
        admin.admin_password = data["admin_password"]
        admin.save()
        return JsonResponse({"message": "Admin updated"})

    admin.delete()
    return JsonResponse({"message": "Admin deleted"})





# ---------------- Topic ----------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def topics(request):
    # LIST
    if request.method == "GET":
        return JsonResponse(
            list(tbl_topic.objects.values()),
            safe=False
        )

    # CREATE
    data = body(request)
    tbl_topic.objects.create(
        topic_name=data["topic_name"],
        subcategory_id=data["subcategory_id"]
    )
    return JsonResponse({"message": "Topic created"}, status=201)


@csrf_exempt
@require_http_methods(["PUT", "DELETE"])
def topic_detail(request, id):
    try:
        obj = tbl_topic.objects.get(id=id)
    except tbl_topic.DoesNotExist:
        return not_found()

    # UPDATE
    if request.method == "PUT":
        data = body(request)
        obj.topic_name = data["topic_name"]
        obj.subcategory_id = data["subcategory_id"]
        obj.save()
        return JsonResponse({"message": "Topic updated"})

    # DELETE
    obj.delete()
    return JsonResponse({"message": "Topic deleted"})






# ---------------- Instructor ----------------
@csrf_exempt
@require_http_methods(["GET", "POST"])
def instructors(request):
    if request.method == "GET":
        return JsonResponse(
            list(tbl_instructor.objects.values()),
            safe=False
        )

    tbl_instructor.objects.create(
        instructor_name=request.POST["instructor_name"],
        instructor_email=request.POST["instructor_email"],
        instructor_password=request.POST["instructor_password"],
        instructor_contact=request.POST["instructor_contact"],
        instructor_headline=request.POST["instructor_headline"],
        instructor_photo=request.FILES["instructor_photo"],
        instructor_biography=request.POST["instructor_biography"],
        instructor_Qualification=request.POST["instructor_Qualification"],
        instructor_field=request.POST["instructor_field"],
        instructor_proof=request.FILES["instructor_proof"],
        instructor_securityQuestion=request.POST["instructor_Question"],
        instructor_securityAnswer=request.POST["instructor_securityAnswer"],
        instructor_gender=request.POST["instructor_gender"],
        instructor_status=0   # 🔹 PENDING
    )
    return JsonResponse({"message": "Instructor registered"}, status=201)


@csrf_exempt
@require_http_methods(["PUT"])
def instructor_accept(request, id):
    try:
        inst = tbl_instructor.objects.get(id=id)
    except tbl_instructor.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)

    inst.instructor_status = 1
    inst.save()
    return JsonResponse({"message": "Instructor accepted"})


@csrf_exempt
@require_http_methods(["PUT"])
def instructor_reject(request, id):
    try:
        inst = tbl_instructor.objects.get(id=id)
    except tbl_instructor.DoesNotExist:
        return JsonResponse({"error": "Not found"}, status=404)

    inst.instructor_status = 2
    inst.save()
    return JsonResponse({"message": "Instructor rejected"})

@csrf_exempt
@require_http_methods(["GET"])
def instructor_detail(request, id):
    try:
        i = tbl_instructor.objects.get(id=id)
    except tbl_instructor.DoesNotExist:
        return JsonResponse({"message": "Instructor not found"}, status=404)

    return JsonResponse({
        "id": i.id,
        "instructor_name": i.instructor_name,
        "instructor_email": i.instructor_email,
        "instructor_contact": i.instructor_contact,
        "instructor_headline": i.instructor_headline,
        "instructor_biography": i.instructor_biography,
        "instructor_Qualification": i.instructor_Qualification,
        "instructor_field": i.instructor_field,
        "instructor_securityQuestion": i.instructor_securityQuestion,
        "instructor_securityAnswer": i.instructor_securityAnswer,
        "instructor_gender": i.instructor_gender,
        "instructor_photo": i.instructor_photo.url if i.instructor_photo else ""
    })

@csrf_exempt
@require_http_methods(["POST"])
def edit_instructor_profile(request, id):
    try:
        i = tbl_instructor.objects.get(id=id)
    except tbl_instructor.DoesNotExist:
        return JsonResponse({"message": "Instructor not found"}, status=404)

    i.instructor_name = request.POST.get("name", i.instructor_name)
    i.instructor_email = request.POST.get("email", i.instructor_email)
    i.instructor_contact = request.POST.get("contact", i.instructor_contact)
    i.instructor_headline = request.POST.get("headline", i.instructor_headline)
    i.instructor_biography = request.POST.get("biography", i.instructor_biography)
    i.instructor_Qualification = request.POST.get(
        "qualification", i.instructor_Qualification
    )
    i.instructor_field = request.POST.get("field", i.instructor_field)
    i.instructor_securityQuestion = request.POST.get(
        "securityquestion", i.instructor_securityQuestion
    )
    i.instructor_securityAnswer = request.POST.get(
        "securityanswer", i.instructor_securityAnswer
    )
    i.instructor_gender = request.POST.get("gender", i.instructor_gender)

    if "photo" in request.FILES:
        i.instructor_photo = request.FILES["photo"]

    i.save()
    return JsonResponse({"message": "Profile updated successfully"})



@csrf_exempt
@require_http_methods(["PUT"])
def change_instructor_password(request, id):
    try:
        i = tbl_instructor.objects.get(id=id)
    except tbl_instructor.DoesNotExist:
        return JsonResponse({"message": "Instructor not found"}, status=404)

    data = body(request)

    if i.instructor_password != data.get("old_password"):
        return JsonResponse({"message": "Old password incorrect"}, status=401)

    i.instructor_password = data.get("new_password")
    i.save()

    return JsonResponse({"message": "Password changed successfully"})





# ---------------- User ----------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def users(request):
    # LIST
    if request.method == "GET":
        return JsonResponse(
            list(tbl_user.objects.values()),
            safe=False
        )

    # CREATE (multipart/form-data)
    tbl_user.objects.create(
        user_name=request.POST["name"],
        user_email=request.POST["email"],
        user_password=request.POST["password"],
        user_contact=request.POST["contact"],
        user_headline=request.POST["headline"],
        user_biography=request.POST["biography"],
        user_photo=request.FILES["photo"],
        user_securityQuestion=request.POST["securityquestion"],
        user_securityAnswer=request.POST["securityanswer"],
        user_gender=request.POST["gender"],
    )

    return JsonResponse(
        {"message": "Registration successful"},
        status=201
    )




@csrf_exempt
@require_http_methods(["GET", "DELETE"])
def user_detail(request, id):
    try:
        user = tbl_user.objects.get(id=id)
    except tbl_user.DoesNotExist:
        return not_found()

    if request.method == "GET":
        return JsonResponse({
            "id": user.id,
            "user_name": user.user_name,
            "user_email": user.user_email,
            "user_contact": user.user_contact,
            "user_headline": user.user_headline,
            "user_biography": user.user_biography,
            "user_photo": user.user_photo.url if user.user_photo else "",
            "user_securityQuestion": user.user_securityQuestion,
            "user_securityAnswer": user.user_securityAnswer,
            "user_gender": user.user_gender,
        })

    # DELETE
    user.delete()
    return JsonResponse({"message": "User deleted"})



@csrf_exempt
@require_http_methods(["PUT"])
def change_password(request, id):
    try:
        user = tbl_user.objects.get(id=id)
    except tbl_user.DoesNotExist:
        return JsonResponse({"message": "User not found"}, status=404)

    data = body(request)

    old_password = data.get("old_password")
    new_password = data.get("new_password")

    if not old_password or not new_password:
        return JsonResponse(
            {"message": "Old and new password required"},
            status=400
        )

    # ❌ plain-text check (learning mode only)
    if user.user_password != old_password:
        return JsonResponse(
            {"message": "Old password incorrect"},
            status=401
        )

    user.user_password = new_password
    user.save()

    return JsonResponse({"message": "Password changed successfully"})



@csrf_exempt
@require_http_methods(["POST"])
def edit_profile(request, id):
    try:
        user = tbl_user.objects.get(id=id)
    except tbl_user.DoesNotExist:
        return JsonResponse({"message": "User not found"}, status=404)

    # TEXT FIELDS
    user.user_name = request.POST.get("name", user.user_name)
    user.user_email = request.POST.get("email", user.user_email)
    user.user_contact = request.POST.get("contact", user.user_contact)
    user.user_headline = request.POST.get("headline", user.user_headline)
    user.user_biography = request.POST.get("biography", user.user_biography)
    user.user_securityQuestion = request.POST.get(
        "securityquestion", user.user_securityQuestion
    )
    user.user_securityAnswer = request.POST.get(
        "securityanswer", user.user_securityAnswer
    )
    user.user_gender = request.POST.get("gender", user.user_gender)

    # PHOTO
    if "photo" in request.FILES:
        user.user_photo = request.FILES["photo"]

    user.save()

    return JsonResponse({"message": "Profile updated successfully"})





# ---------------- Course ----------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def courses(request):
    # LIST ALL COURSES (admin / public)
    if request.method == "GET":
        return JsonResponse(
            list(tbl_course.objects.values()),
            safe=False
        )

    # CREATE COURSE (multipart/form-data)
    tbl_course.objects.create(
        course_title=request.POST["course_title"],
        course_desc=request.POST["course_desc"],
        course_price=request.POST["course_price"],
        course_image=request.FILES["course_image"],
        course_average=request.POST.get("course_average", ""),
        course_requerements=request.POST["course_requerements"],
        topic_id=request.POST["topic_id"],
        instructor_id=request.POST["instructor_id"],
    )

    return JsonResponse({"message": "Course created"}, status=201)


@csrf_exempt
@require_http_methods(["GET"])
def instructor_courses(request):
    instructor_id = request.GET.get("instructor_id")

    if not instructor_id:
        return JsonResponse(
            {"error": "instructor_id required"},
            status=400
        )

    return JsonResponse(
        list(
            tbl_course.objects.filter(
                instructor_id=instructor_id
            ).values()
        ),
        safe=False
    )


@csrf_exempt
@require_http_methods(["DELETE"])
def course_detail(request, id):
    try:
        course = tbl_course.objects.get(id=id)
    except tbl_course.DoesNotExist:
        return not_found()

    course.delete()
    return JsonResponse({"message": "Course deleted"})




# ---------------- Section ----------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def sections(request):
    # LIST by course
    if request.method == "GET":
        course_id = request.GET.get("course_id")
        if not course_id:
            return JsonResponse(
                {"error": "course_id required"},
                status=400
            )

        return JsonResponse(
            list(
                tbl_section.objects.filter(course_id=course_id)
                .values()
            ),
            safe=False
        )

    # CREATE
    data = body(request)
    tbl_section.objects.create(
        section_name=data["section_name"],
        course_id=data["course_id"]
    )
    return JsonResponse({"message": "Section created"}, status=201)


@csrf_exempt
@require_http_methods(["DELETE"])
def section_detail(request, id):
    try:
        section = tbl_section.objects.get(id=id)
    except tbl_section.DoesNotExist:
        return not_found()

    section.delete()
    return JsonResponse({"message": "Section deleted"})








# ---------------- Material ----------------

@csrf_exempt
@require_http_methods(["GET", "POST"])
def materials(request):
    # LIST by section
    if request.method == "GET":
        section_id = request.GET.get("section_id")
        if not section_id:
            return JsonResponse(
                {"error": "section_id required"},
                status=400
            )

        return JsonResponse(
            list(
                tbl_material.objects.filter(section_id=section_id)
                .values()
            ),
            safe=False
        )

    # CREATE (multipart/form-data)
    tbl_material.objects.create(
        material_title=request.POST["material_title"],
        material_desc=request.POST["material_desc"],
        material_file=request.FILES["material_file"],
        section_id=request.POST["section_id"],
    )
    return JsonResponse({"message": "Material added"}, status=201)


@csrf_exempt
@require_http_methods(["DELETE"])
def material_detail(request, id):
    try:
        material = tbl_material.objects.get(id=id)
    except tbl_material.DoesNotExist:
        return not_found()

    material.delete()
    return JsonResponse({"message": "Material deleted"})





from datetime import date

# ---------------- Purchase Course ----------------

@csrf_exempt
@require_http_methods(["POST"])
def purchase_course(request):
    data = body(request)

    course_id = data.get("course_id")
    user_id = data.get("user_id")

    if not course_id or not user_id:
        return JsonResponse(
            {"message": "course_id and user_id required"},
            status=400
        )

    # prevent duplicate purchase
    if tbl_purchasecourse.objects.filter(
        course_id=course_id,
        user_id=user_id
    ).exists():
        return JsonResponse(
            {"message": "Course already purchased"},
            status=409
        )

    tbl_purchasecourse.objects.create(
        purchase_date=date.today(),
        course_id=course_id,
        user_id=user_id
    )

    return JsonResponse({"message": "Course purchased successfully"}, status=201)


# ---------------- My Courses ----------------

@csrf_exempt
@require_http_methods(["GET"])
def my_courses(request):
    user_id = request.GET.get("user_id")

    if not user_id:
        return JsonResponse(
            {"message": "user_id required"},
            status=400
        )

    return JsonResponse(
        list(
            tbl_purchasecourse.objects.filter(user_id=user_id)
            .values(
                "id",
                "purchase_date",
                "course_id",
                "course__course_title",
                "course__course_price",
            )
        ),
        safe=False
    )





@csrf_exempt
@require_http_methods(["POST"])
def login(request):
    data = body(request)
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return JsonResponse(
            {"message": "Email and password required"},
            status=400
        )

    # ---------------- ADMIN ----------------
    admin = tbl_admin.objects.filter(
        admin_email=email,
        admin_password=password
    ).first()

    if admin:
        return JsonResponse({
            "role": "admin",
            "id": admin.id,
            "name": admin.admin_name,
            "message": "Admin login successful"
        })

    # ---------------- INSTRUCTOR ----------------
    instructor = tbl_instructor.objects.filter(
        instructor_email=email,
        instructor_password=password
    ).first()

    if instructor:
        if instructor.instructor_status == 0:
            return JsonResponse(
                {"message": "Instructor approval pending"},
                status=403
            )

        if instructor.instructor_status == 2:
            return JsonResponse(
                {"message": "Instructor account rejected"},
                status=403
            )

        return JsonResponse({
            "role": "instructor",
            "id": instructor.id,
            "name": instructor.instructor_name,
            "message": "Instructor login successful"
        })

    # ---------------- USER ----------------
    user = tbl_user.objects.filter(
        user_email=email,
        user_password=password
    ).first()

    if user:
        return JsonResponse({
            "role": "user",
            "id": user.id,
            "name": user.user_name,
            "message": "User login successful"
        })

    # ---------------- INVALID ----------------
    return JsonResponse(
        {"message": "Invalid email or password"},
        status=401
    )
