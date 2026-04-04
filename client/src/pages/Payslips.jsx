import { useCallback, useEffect, useState } from "react";
import { dummyPayslipData, dummyEmployeeData } from "../assets/assets";
import Loading from "../components/Loading";

const Payslips = () => {

  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = true;

  const fetchPayslips = useCallback(async () => {
    setPayslips(dummyPayslipData);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  useEffect(() => {
    if (isAdmin) setEmployees(dummyEmployeeData);
  }, [isAdmin]);

  if (loading) return <Loading />;

  return (
    <div className="animate-fade-in">

      <div>
        <h1 className="page-title">Payslips</h1>

        <p className="page-subtitle">
          {isAdmin
            ? "Generate and manage employee payslips"
            : "Your payslip history"}
        </p>
      </div>

      {isAdmin && <p>GENERATE FORM</p>}

      <p>payslip list</p>

    </div>
  );
};

export default Payslips;