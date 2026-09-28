from django.urls import path

from .views import (
    WorkerListView,
    SchemeListView,
    SchemeApplicationListView,
    DashboardOverviewView,
    DashboardDemographicsView,
    DashboardSchemesView,
    DashboardDistrictsView,
)


urlpatterns = [
    path("workers/", WorkerListView.as_view(), name="workers"),
    path("schemes/", SchemeListView.as_view(), name="schemes"),
    path(
        "applications/",
        SchemeApplicationListView.as_view(),
        name="applications",
    ),
    path(
        "dashboard/overview/",
        DashboardOverviewView.as_view(),
        name="dashboard-overview",
    ),
    path(
        "dashboard/demographics/",
        DashboardDemographicsView.as_view(),
        name="dashboard-demographics",
    ),
    path(
        "dashboard/schemes/",
        DashboardSchemesView.as_view(),
        name="dashboard-schemes",
    ),
    path(
        "dashboard/districts/",
        DashboardDistrictsView.as_view(),
        name="dashboard-districts",
    ),
]