from django.urls import path
from server import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [

    path("districts/", views.districts),
    path("districts/<int:id>/", views.district_detail),

    path("categories/", views.categories),
    path("categories/<int:id>/", views.category_detail),

    # 🔹 ADD THESE
    path("subcategories/", views.subcategories),
    path("subcategories/<int:id>/", views.subcategory_detail),

    path("users/", views.users),
    path("users/<int:id>/", views.user_detail),

    path("courses/", views.courses),
    path("courses/<int:id>/", views.course_detail),

    path("admins/", views.admins),
    path("admins/<int:id>/", views.admin_detail),

    path("topics/", views.topics),
    path("topics/<int:id>/", views.topic_detail),

    path("instructors/", views.instructors),
    path("instructors/<int:id>/", views.instructor_detail),
    path("instructors/<int:id>/edit-profile/", views.edit_instructor_profile),
    path("instructors/<int:id>/change-password/", views.change_instructor_password),


    # 🔹 VERIFY ACTIONS
    path("instructors/<int:id>/accept/", views.instructor_accept),
    path("instructors/<int:id>/reject/", views.instructor_reject),

    path("users/", views.users),
    path("users/<int:id>/", views.user_detail),
    path("users/<int:id>/change-password/", views.change_password),
    path("users/<int:id>/edit-profile/", views.edit_profile),


    path("courses/", views.courses),
    path("courses/<int:id>/", views.course_detail),

    # instructor-specific
    path("instructor/courses/", views.instructor_courses),


    path("sections/", views.sections),
    path("sections/<int:id>/", views.section_detail),


    path("materials/", views.materials),
    path("materials/<int:id>/", views.material_detail),



    path("purchase-course/", views.purchase_course),
    path("my-courses/", views.my_courses),


    path("auth/login/", views.login),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)