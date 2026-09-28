from pathlib import Path

import pandas as pd
from django.core.management.base import BaseCommand
from django.db import transaction

from welfare.models import Worker, Scheme, Subscheme, SchemeApplication


class Command(BaseCommand):
    help = "Import cleaned CSV data into the welfare database"

    def clean_bool(self, value):
        if pd.isna(value):
            return False

        return str(value).strip().lower() in {
            "true",
            "1",
            "yes",
            "y",
        }

    @transaction.atomic
    def handle(self, *args, **options):

        # Project root:
        # Construction-Workers-Welfare-Dashboard
        BASE_DIR = Path(__file__).resolve().parents[4]

        workers_file = BASE_DIR / "data" / "cleaned" / "workers.csv"
        schemes_file = BASE_DIR / "data" / "cleaned" / "schemes.csv"
        schemes_data_file = BASE_DIR / "data" / "cleaned" / "schemes_data.csv"

        self.stdout.write("Reading cleaned CSV files...")

        workers_df = pd.read_csv(workers_file)
        schemes_df = pd.read_csv(schemes_file)
        schemes_data_df = pd.read_csv(schemes_data_file)

        self.stdout.write(
            f"Workers CSV: {len(workers_df)} rows"
        )
        self.stdout.write(
            f"Schemes CSV: {len(schemes_df)} rows"
        )
        self.stdout.write(
            f"Schemes Data CSV: {len(schemes_data_df)} rows"
        )

        # ---------------------------------------------------------
        # 1. IMPORT WORKERS
        # ---------------------------------------------------------

        self.stdout.write("\nImporting workers...")

        worker_map = {}

        for _, row in workers_df.iterrows():

            worker = Worker.objects.create(
                reg_no=str(row["reg_no"]).strip(),
                reg_year=int(row["reg_year"]),
                reg_date=pd.to_datetime(row["reg_date"]).date(),

                worker_name=str(row["worker_name"]).strip(),
                father_name=str(row["father_name"]).strip(),

                gender=int(row["gender"]),

                date_of_birth=(
                    pd.to_datetime(row["date_of_birth"]).date()
                    if pd.notna(row["date_of_birth"])
                    else None
                ),

                age=int(row["age"]),

                caste=int(row["caste"]),
                nature_emp=int(row["nature_emp"]),

                member_tradeunion=self.clean_bool(
                    row["member_tradeunion"]
                ),

                migrantworker=(
                    int(row["migrantworker"])
                    if pd.notna(row["migrantworker"])
                    else None
                ),

                migrant_state=int(row["migrant_state"]),
                migrantdistrict=int(row["migrantdistrict"]),
                migrantmandal=int(row["migrantmandal"]),

                reg_status=int(row["reg_status"]),

                valid_date=pd.to_datetime(
                    row["valid_date"]
                ).date(),

                marital_status=int(row["marital_status"]),

                distcode=int(row["distcode"]),

                trno=int(row["trno"]),

                present_addr_district=int(
                    row["present_addr_district"]
                ),

                present_addr_mandal=int(
                    row["present_addr_mandal"]
                ),

                permenant_addr_district=int(
                    row["permenant_addr_district"]
                ),

                permenant_addr_mandal=int(
                    row["permenant_addr_mandal"]
                ),

                created_dt=pd.to_datetime(
                    row["created_dt"]
                ),

                modified_dt=pd.to_datetime(
                    row["modified_dt"]
                ),
            )

            worker_map[str(row["reg_no"]).strip()] = worker

        self.stdout.write(
            self.style.SUCCESS(
                f"✓ Imported {len(worker_map)} workers"
            )
        )

        # ---------------------------------------------------------
        # 2. IMPORT SCHEMES
        # ---------------------------------------------------------

        self.stdout.write("\nImporting schemes...")

        main_scheme_descriptions = {
            1: "Accidental Death & Funeral Expenses",
            2: "Disability",
            3: "Natural Death & Funeral Expenses",
            4: "Maternity Benefit",
            9: "Marriage Gift",
            12: "Application for Claiming of Distress relief",
            13: "Sanction of Artifical Limbs",
        }

        scheme_map = {}

        unique_scheme_codes = (
            schemes_df["scheme_code"]
            .dropna()
            .astype(int)
            .unique()
        )

        for scheme_code in unique_scheme_codes:

            scheme = Scheme.objects.create(
                scheme_code=int(scheme_code),
                scheme_desc=main_scheme_descriptions.get(
                    int(scheme_code),
                    ""
                ),
            )

            scheme_map[int(scheme_code)] = scheme

        self.stdout.write(
            self.style.SUCCESS(
                f"✓ Imported {len(scheme_map)} schemes"
            )
        )

        # ---------------------------------------------------------
        # 3. IMPORT SUBSCHEMES
        # ---------------------------------------------------------

        self.stdout.write("\nImporting subschemes...")

        subscheme_map = {}

        for _, row in schemes_df.iterrows():

            scheme_code = int(row["scheme_code"])
            subscheme_code = int(row["subscheme_code"])

            scheme = scheme_map[scheme_code]

            subscheme = Subscheme.objects.create(
                scheme=scheme,
                subscheme_code=subscheme_code,
                subscheme_desc=str(
                    row["subscheme_desc"]
                ).strip(),
            )

            subscheme_map[
                (scheme_code, subscheme_code)
            ] = subscheme

        self.stdout.write(
            self.style.SUCCESS(
                f"✓ Imported {len(subscheme_map)} subschemes"
            )
        )

        # ---------------------------------------------------------
        # 4. IMPORT SCHEME APPLICATIONS
        # ---------------------------------------------------------

        self.stdout.write("\nImporting scheme applications...")

        unmatched_workers = 0
        application_count = 0

        for _, row in schemes_data_df.iterrows():

            application_no = str(
                row["application_no"]
            ).strip()

            scheme_code = int(row["scheme_code"])
            subscheme_code = int(row["subscheme_code"])

            scheme = scheme_map[scheme_code]

            subscheme = subscheme_map[
                (scheme_code, subscheme_code)
            ]

            worker = worker_map.get(application_no)

            if worker is None:
                unmatched_workers += 1

            modified_dt = (
                pd.to_datetime(row["modified_dt"])
                if pd.notna(row["modified_dt"])
                else None
            )

            SchemeApplication.objects.create(
                application_no=application_no,

                worker=worker,

                scheme=scheme,

                subscheme=subscheme,

                trno=int(row["trno"]),

                claim_data_details=str(
                    row["claim_data_details"]
                ).strip()
                if pd.notna(row["claim_data_details"])
                else "",

                remark=str(
                    row["remark"]
                ).strip()
                if pd.notna(row["remark"])
                else "",

                dcl_remark=str(
                    row["dcl_remark"]
                ).strip()
                if pd.notna(row["dcl_remark"])
                else "",

                created_dt=pd.to_datetime(
                    row["created_dt"]
                ),

                created_by=str(
                    row["created_by"]
                ).strip()
                if pd.notna(row["created_by"])
                else "",

                modified_dt=modified_dt,

                modified_by=str(
                    row["modified_by"]
                ).strip()
                if pd.notna(row["modified_by"])
                else "",
            )

            application_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"✓ Imported {application_count} scheme applications"
            )
        )

        # ---------------------------------------------------------
        # SUMMARY
        # ---------------------------------------------------------

        self.stdout.write("\n" + "=" * 50)
        self.stdout.write("IMPORT SUMMARY")
        self.stdout.write("=" * 50)

        self.stdout.write(
            f"Workers: {Worker.objects.count()}"
        )

        self.stdout.write(
            f"Schemes: {Scheme.objects.count()}"
        )

        self.stdout.write(
            f"Subschemes: {Subscheme.objects.count()}"
        )

        self.stdout.write(
            f"Scheme Applications: "
            f"{SchemeApplication.objects.count()}"
        )

        self.stdout.write(
            f"Applications without matching worker: "
            f"{unmatched_workers}"
        )

        self.stdout.write("=" * 50)

        self.stdout.write(
            self.style.SUCCESS(
                "\n✓ CSV import completed successfully!"
            )
        )