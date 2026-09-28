from rest_framework import serializers

from .models import (
    Worker,
    Scheme,
    Subscheme,
    SchemeApplication,
)


class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = "__all__"


class SchemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scheme
        fields = "__all__"


class SubschemeSerializer(serializers.ModelSerializer):
    scheme_code = serializers.IntegerField(
        source="scheme.scheme_code",
        read_only=True
    )

    class Meta:
        model = Subscheme
        fields = [
            "id",
            "scheme",
            "scheme_code",
            "subscheme_code",
            "subscheme_desc",
        ]


class SchemeApplicationSerializer(serializers.ModelSerializer):
    worker_name = serializers.CharField(
        source="worker.worker_name",
        read_only=True
    )

    scheme_name = serializers.CharField(
        source="scheme.scheme_desc",
        read_only=True
    )

    subscheme_name = serializers.CharField(
        source="subscheme.subscheme_desc",
        read_only=True
    )

    class Meta:
        model = SchemeApplication
        fields = [
            "id",
            "application_no",
            "worker",
            "worker_name",
            "scheme",
            "scheme_name",
            "subscheme",
            "subscheme_name",
            "trno",
            "claim_data_details",
            "remark",
            "dcl_remark",
            "created_dt",
            "created_by",
            "modified_dt",
            "modified_by",
        ]