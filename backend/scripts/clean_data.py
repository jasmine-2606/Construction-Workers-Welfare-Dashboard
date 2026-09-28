import pandas as pd
from pathlib import Path


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parents[2]

INPUT_FILE = BASE_DIR / "data" / "original" / "Sample_test_data_for_interns.xlsx"
OUTPUT_DIR = BASE_DIR / "data" / "cleaned"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# ============================================================
# HELPER FUNCTIONS
# ============================================================

def clean_text_columns(df):
    """Clean text columns and preserve missing values as empty strings."""
    for col in df.columns:
        if df[col].dtype == "object":
            df[col] = df[col].apply(
                lambda x: x.strip() if isinstance(x, str) else x
            )
            df[col] = df[col].fillna("")
    return df


def clean_dates(df, date_columns):
    """Convert date columns to YYYY-MM-DD."""
    for col in date_columns:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors="coerce")
            df[col] = df[col].dt.strftime("%Y-%m-%d")
            df[col] = df[col].fillna("")
    return df


def clean_datetimes(df, datetime_columns):
    """Convert datetime columns to YYYY-MM-DD HH:MM:SS."""
    for col in datetime_columns:
        if col in df.columns:
            df[col] = pd.to_datetime(df[col], errors="coerce")
            df[col] = df[col].dt.strftime("%Y-%m-%d %H:%M:%S")
            df[col] = df[col].fillna("")
    return df


# ============================================================
# LOAD ORIGINAL EXCEL
# ============================================================

print("Loading original Excel file...")
print(INPUT_FILE)

workers_raw = pd.read_excel(
    INPUT_FILE,
    sheet_name="Workers"
)

schemes_raw = pd.read_excel(
    INPUT_FILE,
    sheet_name="Schemes",
    header=1
)

schemes_data_raw = pd.read_excel(
    INPUT_FILE,
    sheet_name="Schemes_data"
)


# ============================================================
# WORKERS
# ============================================================

worker_columns = [
    "reg_no",
    "reg_year",
    "reg_date",
    "worker_name",
    "father_name",
    "gender",
    "date_of_birth",
    "age",
    "caste",
    "nature_emp",
    "member_tradeunion",
    "migrantworker",
    "migrant_state",
    "migrantdistrict",
    "migrantmandal",
    "reg_status",
    "valid_date",
    "marital_status",
    "distcode",
    "trno",
    "present_addr_district",
    "present_addr_mandal",
    "permenant_addr_district",
    "permenant_addr_mandal",
    "created_dt",
    "modified_dt",
]

workers = workers_raw[worker_columns].copy()

workers = clean_text_columns(workers)

workers = clean_dates(
    workers,
    [
        "reg_date",
        "date_of_birth",
        "valid_date",
    ]
)

workers = clean_datetimes(
    workers,
    [
        "created_dt",
        "modified_dt",
    ]
)

workers = workers.drop_duplicates()

workers.to_csv(
    OUTPUT_DIR / "workers.csv",
    index=False,
    encoding="utf-8-sig"
)


# ============================================================
# SCHEMES
# ============================================================

schemes = schemes_raw[
    [
        "scheme_code.1",
        "subscheme_code",
        "subscheme_desc",
    ]
].copy()

schemes = schemes.rename(
    columns={
        "scheme_code.1": "scheme_code"
    }
)

# Remove completely empty rows
schemes = schemes.dropna(
    subset=["scheme_code", "subscheme_code"],
    how="any"
)

# Convert codes to integers
schemes["scheme_code"] = pd.to_numeric(
    schemes["scheme_code"],
    errors="coerce"
)

schemes["subscheme_code"] = pd.to_numeric(
    schemes["subscheme_code"],
    errors="coerce"
)

schemes = schemes.dropna(
    subset=["scheme_code", "subscheme_code"]
)

schemes["scheme_code"] = schemes["scheme_code"].astype(int)
schemes["subscheme_code"] = schemes["subscheme_code"].astype(int)

schemes = clean_text_columns(schemes)

schemes = schemes.drop_duplicates()

schemes.to_csv(
    OUTPUT_DIR / "schemes.csv",
    index=False,
    encoding="utf-8-sig"
)


# ============================================================
# SCHEMES DATA
# ============================================================

schemes_data_columns = [
    "application_no",
    "scheme_code",
    "subscheme_code",
    "claim_data_details",
    "trno",
    "remark",
    "dcl_remark",
    "created_dt",
    "created_by",
    "modified_dt",
    "modified_by",
]

schemes_data = schemes_data_raw[
    schemes_data_columns
].copy()

schemes_data = clean_text_columns(schemes_data)

schemes_data = clean_datetimes(
    schemes_data,
    [
        "created_dt",
        "modified_dt",
    ]
)

schemes_data = schemes_data.drop_duplicates()

schemes_data.to_csv(
    OUTPUT_DIR / "schemes_data.csv",
    index=False,
    encoding="utf-8-sig"
)


# ============================================================
# SUMMARY
# ============================================================

print()
print("=" * 60)
print("DATA CLEANING COMPLETED")
print("=" * 60)

print()
print("Workers:")
print(f"  Rows: {len(workers)}")
print(f"  Columns: {len(workers.columns)}")
print(f"  File: {OUTPUT_DIR / 'workers.csv'}")

print()
print("Schemes:")
print(f"  Rows: {len(schemes)}")
print(f"  Columns: {len(schemes.columns)}")
print(f"  File: {OUTPUT_DIR / 'schemes.csv'}")

print()
print("Schemes Data:")
print(f"  Rows: {len(schemes_data)}")
print(f"  Columns: {len(schemes_data.columns)}")
print(f"  File: {OUTPUT_DIR / 'schemes_data.csv'}")

print()
print("Original Excel was NOT modified.")
print("=" * 60)