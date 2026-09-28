import "./RecentApplications.css";

const applications = [
  {
    applicationNo: "ALOTEST/2017/00002",
    worker: "RAJESH",
    scheme: "Accidental Death & Funeral Expenses",
    status: "Received",
  },
  {
    applicationNo: "ALOTEST/2017/00003",
    worker: "Worker Record",
    scheme: "Natural Death & Funeral Expenses",
    status: "Received",
  },
  {
    applicationNo: "ALOTEST/2017/00004",
    worker: "Worker Record",
    scheme: "Maternity Benefit",
    status: "Received",
  },
];

function RecentApplications() {
  return (
    <section className="dashboard-section">
      <div className="dashboard-section__header">
        <h2 className="dashboard-section__title">
          Recent Welfare Applications
        </h2>

        <p className="dashboard-section__subtitle">
          Latest applications received under welfare schemes
        </p>
      </div>

      <div className="dashboard-card">
        <div className="applications-table-wrapper">
          <table className="applications-table">
            <thead>
              <tr>
                <th>Application No.</th>
                <th>Worker</th>
                <th>Welfare Scheme</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {applications.map((application) => (
                <tr key={application.applicationNo}>
                  <td>{application.applicationNo}</td>
                  <td>{application.worker}</td>
                  <td>{application.scheme}</td>
                  <td>
                    <span className="application-status">
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default RecentApplications;