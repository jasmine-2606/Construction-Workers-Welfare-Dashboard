from django.db import models


class Worker(models.Model):
    reg_no = models.CharField(max_length=100, unique=True)
    reg_year = models.IntegerField()
    reg_date = models.DateField()

    worker_name = models.CharField(max_length=255)
    father_name = models.CharField(max_length=255)

    gender = models.IntegerField()
    date_of_birth = models.DateField(null=True, blank=True)
    age = models.IntegerField()

    caste = models.IntegerField()
    nature_emp = models.IntegerField()

    member_tradeunion = models.BooleanField(default=False)
    migrantworker = models.IntegerField(null=True, blank=True)

    migrant_state = models.IntegerField()
    migrantdistrict = models.IntegerField()
    migrantmandal = models.IntegerField()

    reg_status = models.IntegerField()

    valid_date = models.DateField()

    marital_status = models.IntegerField()

    distcode = models.IntegerField()

    trno = models.BigIntegerField()

    present_addr_district = models.IntegerField()
    present_addr_mandal = models.IntegerField()

    permenant_addr_district = models.IntegerField()
    permenant_addr_mandal = models.IntegerField()

    created_dt = models.DateTimeField()
    modified_dt = models.DateTimeField()

    def __str__(self):
        return f"{self.reg_no} - {self.worker_name}"


class Scheme(models.Model):
    scheme_code = models.IntegerField(unique=True)
    scheme_desc = models.CharField(
        max_length=255,
        blank=True,
        default=""
    )

    def __str__(self):
        return f"{self.scheme_code} - {self.scheme_desc}"


class Subscheme(models.Model):
    scheme = models.ForeignKey(
        Scheme,
        on_delete=models.CASCADE,
        related_name="subschemes"
    )

    subscheme_code = models.IntegerField()
    subscheme_desc = models.CharField(max_length=500)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["scheme", "subscheme_code"],
                name="unique_scheme_subscheme"
            )
        ]

    def __str__(self):
        return f"{self.scheme.scheme_code}-{self.subscheme_code} - {self.subscheme_desc}"
class SchemeApplication(models.Model):
    application_no = models.CharField(max_length=100)

    worker = models.ForeignKey(
        Worker,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="scheme_applications"
    )

    scheme = models.ForeignKey(
        Scheme,
        on_delete=models.PROTECT,
        related_name="applications"
    )

    subscheme = models.ForeignKey(
        Subscheme,
        on_delete=models.PROTECT,
        related_name="applications"
    )

    trno = models.BigIntegerField()

    claim_data_details = models.TextField(
        blank=True,
        default=""
    )

    remark = models.TextField(
        blank=True,
        default=""
    )

    dcl_remark = models.TextField(
        blank=True,
        default=""
    )

    created_dt = models.DateTimeField()

    created_by = models.CharField(
        max_length=100,
        blank=True,
        default=""
    )

    modified_dt = models.DateTimeField(
        null=True,
        blank=True
    )

    modified_by = models.CharField(
        max_length=100,
        blank=True,
        default=""
    )

    def __str__(self):
        return self.application_no