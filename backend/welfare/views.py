from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count
from django.db.models.functions import ExtractYear

from .models import (
    Worker,
    Scheme,
    Subscheme,
    SchemeApplication,
)

from .serializers import (
    WorkerSerializer,
    SchemeSerializer,
    SchemeApplicationSerializer,
)


class WorkerListView(generics.ListAPIView):
    queryset = Worker.objects.all().order_by("id")
    serializer_class = WorkerSerializer


class SchemeListView(generics.ListAPIView):
    queryset = Scheme.objects.all().order_by("scheme_code")
    serializer_class = SchemeSerializer


class SchemeApplicationListView(generics.ListAPIView):
    queryset = (
        SchemeApplication.objects
        .select_related("worker", "scheme", "subscheme")
        .all()
        .order_by("-created_dt")
    )
    serializer_class = SchemeApplicationSerializer


class DashboardOverviewView(APIView):
    def get(self, request):

        worker_year_data = list(
            Worker.objects
            .values("reg_year")
            .annotate(total=Count("id"))
            .order_by("-reg_year")
        )

        worker_change = None

        if len(worker_year_data) >= 2:
            latest = worker_year_data[0]
            previous = worker_year_data[1]

            if latest["reg_year"] == previous["reg_year"] + 1:
                previous_total = previous["total"]
                latest_total = latest["total"]

                if previous_total > 0:
                    worker_change = round(
                        ((latest_total - previous_total) / previous_total) * 100,
                        1
                    )

        application_year_data = list(
            SchemeApplication.objects
            .annotate(year=ExtractYear("created_dt"))
            .values("year")
            .annotate(total=Count("id"))
            .order_by("-year")
        )

        application_change = None

        if len(application_year_data) >= 2:
            latest = application_year_data[0]
            previous = application_year_data[1]

            if latest["year"] == previous["year"] + 1:
                previous_total = previous["total"]
                latest_total = latest["total"]

                if previous_total > 0:
                    application_change = round(
                        ((latest_total - previous_total) / previous_total) * 100,
                        1
                    )

        return Response({
            "total_workers": Worker.objects.count(),
            "total_schemes": Scheme.objects.count(),
            "total_subschemes": Subscheme.objects.count(),
            "total_applications": SchemeApplication.objects.count(),
            "worker_change": worker_change,
            "application_change": application_change,
        })
class DashboardDemographicsView(APIView):
    def get(self, request):

        gender_data = list(
            Worker.objects
            .values("gender")
            .annotate(total=Count("id"))
            .order_by("gender")
        )

        registration_status_data = list(
            Worker.objects
            .values("reg_status")
            .annotate(total=Count("id"))
            .order_by("reg_status")
        )

        nature_employment_data = list(
            Worker.objects
            .values("nature_emp")
            .annotate(total=Count("id"))
            .order_by("nature_emp")
        )

        age_groups = {
            "18-25": Worker.objects.filter(age__gte=18, age__lte=25).count(),
            "26-35": Worker.objects.filter(age__gte=26, age__lte=35).count(),
            "36-45": Worker.objects.filter(age__gte=36, age__lte=45).count(),
            "46-55": Worker.objects.filter(age__gte=46, age__lte=55).count(),
            "56+": Worker.objects.filter(age__gte=56).count(),
        }

        return Response({
            "gender": gender_data,
            "age_groups": age_groups,
            "registration_status": registration_status_data,
            "nature_of_employment": nature_employment_data,
        })
class DashboardSchemesView(APIView):
    def get(self, request):

        scheme_data = list(
            Scheme.objects
            .annotate(application_count=Count("applications"))
            .values(
                "scheme_code",
                "scheme_desc",
                "application_count",
            )
            .order_by("scheme_code")
        )

        subscheme_data = list(
            Subscheme.objects
            .annotate(application_count=Count("applications"))
            .values(
                "scheme__scheme_code",
                "subscheme_code",
                "subscheme_desc",
                "application_count",
            )
            .order_by(
                "scheme__scheme_code",
                "subscheme_code",
            )
        )

        return Response({
            "schemes": scheme_data,
            "subschemes": subscheme_data,
        })
class DashboardDistrictsView(APIView):
    def get(self, request):

        worker_data = list(
            Worker.objects
            .values("present_addr_district")
            .annotate(worker_count=Count("id"))
            .order_by("present_addr_district")
        )

        application_data = list(
            SchemeApplication.objects
            .filter(worker__isnull=False)
            .values("worker__present_addr_district")
            .annotate(application_count=Count("id"))
            .order_by("worker__present_addr_district")
        )

        return Response({
            "workers_by_district": worker_data,
            "applications_by_district": application_data,
        })